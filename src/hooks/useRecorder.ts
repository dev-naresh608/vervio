import { useState, useEffect, useRef, useCallback } from 'react';
import { usePracticeContext } from '../context/PracticeContext';

export type PermissionState = 'prompt' | 'granted' | 'denied' | 'unsupported';

interface UseRecorderOptions {
  onRecordingStop?: (blob: Blob, mimeType: string, durationSeconds: number) => void;
}

export function getSupportedMimeType(): string {
  if (typeof MediaRecorder === 'undefined') return '';

  const types = [
    'video/webm;codecs=vp9,opus',
    'video/webm;codecs=vp8,opus',
    'video/webm',
    'video/mp4',
  ];

  for (const type of types) {
    if (MediaRecorder.isTypeSupported(type)) {
      return type;
    }
  }

  return '';
}

export function useRecorder({ onRecordingStop }: UseRecorderOptions = {}) {
  const { activeStream, setActiveStream } = usePracticeContext();
  const [permissionState, setPermissionState] = useState<PermissionState>('prompt');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [stream, setLocalStream] = useState<MediaStream | null>(activeStream);
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [recordingBlob, setRecordingBlob] = useState<Blob | null>(null);
  const [recordingBlobUrl, setRecordingBlobUrl] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const startTimeRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const onRecordingStopRef = useRef(onRecordingStop);
  const shouldSaveRef = useRef(false);

  useEffect(() => {
    onRecordingStopRef.current = onRecordingStop;
  }, [onRecordingStop]);

  // Sync stream to context & local state
  const setStream = useCallback(
    (s: MediaStream | null) => {
      setLocalStream(s);
      setActiveStream(s);
    },
    [setActiveStream]
  );

  // Clean up stream tracks
  const stopStream = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => {
        track.stop();
      });
    }
    if (activeStream) {
      activeStream.getTracks().forEach((track) => {
        track.stop();
      });
    }
    setLocalStream(null);
    setActiveStream(null);

    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    setAudioLevel(0);
  }, [stream, activeStream, setActiveStream]);

  // Setup AudioContext volume meter
  const setupAudioMeter = useCallback((mediaStream: MediaStream) => {
    try {
      const audioTrack = mediaStream.getAudioTracks()[0];
      if (!audioTrack) return;

      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      audioContextRef.current = ctx;
      const source = ctx.createMediaStreamSource(mediaStream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const updateMeter = () => {
        analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i];
        }
        const average = sum / bufferLength;
        const normalized = Math.min(100, Math.round((average / 128) * 100));
        setAudioLevel(normalized);
        animFrameRef.current = requestAnimationFrame(updateMeter);
      };

      updateMeter();
    } catch (err) {
      console.warn('Audio meter initialization error:', err);
    }
  }, []);

  // Request camera and microphone access
  const requestMedia = useCallback(async (): Promise<MediaStream | null> => {
    setErrorMessage(null);

    // Reuse existing active stream if tracks are live
    if (activeStream && activeStream.active && activeStream.getVideoTracks().some((t) => t.readyState === 'live')) {
      setLocalStream(activeStream);
      setPermissionState('granted');
      setupAudioMeter(activeStream);
      return activeStream;
    }

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setPermissionState('unsupported');
      setErrorMessage('Your browser does not support media device recording.');
      return null;
    }

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: 'user' },
        audio: { echoCancellation: true, noiseSuppression: true },
      });

      setStream(mediaStream);
      setPermissionState('granted');
      setupAudioMeter(mediaStream);
      return mediaStream;
    } catch (err: unknown) {
      console.error('Error acquiring user media:', err);
      setPermissionState('denied');
      const errObj = err as Error;
      if (errObj.name === 'NotAllowedError' || errObj.name === 'PermissionDeniedError') {
        setErrorMessage('Camera and microphone permission was denied. Please allow access in browser settings.');
      } else if (errObj.name === 'NotFoundError' || errObj.name === 'DevicesNotFoundError') {
        setErrorMessage('No camera or microphone device found.');
      } else {
        setErrorMessage(errObj.message || 'Unable to access camera or microphone.');
      }
      return null;
    }
  }, [activeStream, setStream, setupAudioMeter]);

  // Start recording session
  const startRecording = useCallback(async () => {
    shouldSaveRef.current = false;
    let targetStream = stream || activeStream;

    if (!targetStream || !targetStream.active || !targetStream.getVideoTracks().some((t) => t.readyState === 'live')) {
      targetStream = await requestMedia();
    }

    if (!targetStream) {
      throw new Error('Cannot start recording: camera/microphone unavailable.');
    }

    const mimeType = getSupportedMimeType();
    if (!mimeType) {
      setErrorMessage('No supported video MIME type found in browser.');
      throw new Error('MediaRecorder MIME type unsupported.');
    }

    chunksRef.current = [];
    setRecordingBlob(null);
    if (recordingBlobUrl) {
      URL.revokeObjectURL(recordingBlobUrl);
      setRecordingBlobUrl(null);
    }

    const recorder = new MediaRecorder(targetStream, { mimeType });
    mediaRecorderRef.current = recorder;

    recorder.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) {
        chunksRef.current.push(event.data);
      }
    };

    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: mimeType });
      setIsRecording(false);
      setIsPaused(false);

      const durationSec = startTimeRef.current
        ? Math.max(1, Math.round((Date.now() - startTimeRef.current) / 1000))
        : 0;

      if (shouldSaveRef.current && blob.size > 1000 && durationSec >= 1) {
        const url = URL.createObjectURL(blob);
        setRecordingBlob(blob);
        setRecordingBlobUrl(url);

        if (onRecordingStopRef.current) {
          onRecordingStopRef.current(blob, mimeType, durationSec);
        }
      }
      shouldSaveRef.current = false;
    };

    startTimeRef.current = Date.now();
    recorder.start(200);
    setIsRecording(true);
    setIsPaused(false);
  }, [stream, activeStream, requestMedia, recordingBlobUrl]);

  // Explicitly Stop recording session (with save)
  const stopRecording = useCallback(() => {
    shouldSaveRef.current = true;
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    stopStream();
  }, [stopStream]);

  return {
    stream: stream || activeStream,
    permissionState,
    errorMessage,
    isRecording,
    isPaused,
    audioLevel,
    recordingBlob,
    recordingBlobUrl,
    requestMedia,
    startRecording,
    stopRecording,
    stopStream,
  };
}
