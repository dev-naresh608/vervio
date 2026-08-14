import { getDB } from './db';
import type { Recording } from '../types';

export async function getAllRecordings(): Promise<Recording[]> {
  try {
    const db = await getDB();
    const recordings = await db.getAll('recordings');
    return recordings.sort((a, b) => new Date(b.recordedAt).getTime() - new Date(a.recordedAt).getTime());
  } catch (err) {
    console.error('Error fetching recordings from IndexedDB:', err);
    return [];
  }
}

export async function addRecording(recording: Omit<Recording, 'id' | 'recordedAt'>): Promise<Recording> {
  const db = await getDB();
  const id = `rec-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
  const recordedAt = new Date().toISOString();

  const newRec: Recording = {
    ...recording,
    id,
    recordedAt,
  };

  await db.put('recordings', newRec);
  return newRec;
}

export async function deleteRecording(id: string): Promise<void> {
  const db = await getDB();
  await db.delete('recordings', id);
}

export async function clearAllRecordings(): Promise<void> {
  const db = await getDB();
  await db.clear('recordings');
}
