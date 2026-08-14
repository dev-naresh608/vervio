import { getDB } from './db';

const DIRECTORY_HANDLE_KEY = 'recordings_directory';

/* Custom File System Access API Interfaces for TS */
interface FileSystemPermissionDescriptor {
  mode?: 'read' | 'readwrite';
}

interface CustomDirectoryHandle {
  name: string;
  queryPermission(descriptor?: FileSystemPermissionDescriptor): Promise<'granted' | 'denied' | 'prompt'>;
  requestPermission(descriptor?: FileSystemPermissionDescriptor): Promise<'granted' | 'denied' | 'prompt'>;
  getFileHandle(name: string, options?: { create?: boolean }): Promise<{
    createWritable(): Promise<{
      write(data: Blob): Promise<void>;
      close(): Promise<void>;
    }>;
  }>;
}

export function isFileSystemAccessSupported(): boolean {
  return typeof window !== 'undefined' && 'showDirectoryPicker' in window;
}

export async function storeDirectoryHandle(handle: FileSystemDirectoryHandle): Promise<void> {
  const db = await getDB();
  await db.put('handles', { id: DIRECTORY_HANDLE_KEY, handle });
}

export async function getStoredDirectoryHandle(): Promise<FileSystemDirectoryHandle | null> {
  if (!isFileSystemAccessSupported()) return null;
  try {
    const db = await getDB();
    const entry = await db.get('handles', DIRECTORY_HANDLE_KEY);
    return entry ? entry.handle : null;
  } catch (err) {
    console.warn('Error reading directory handle from IndexedDB:', err);
    return null;
  }
}

export async function clearStoredDirectoryHandle(): Promise<void> {
  try {
    const db = await getDB();
    await db.delete('handles', DIRECTORY_HANDLE_KEY);
  } catch (err) {
    console.warn('Error clearing directory handle:', err);
  }
}

export async function verifyDirectoryPermission(
  handle: FileSystemDirectoryHandle,
  readWrite = true
): Promise<boolean> {
  const customHandle = handle as unknown as CustomDirectoryHandle;
  const options: FileSystemPermissionDescriptor = {
    mode: readWrite ? 'readwrite' : 'read',
  };

  try {
    if ((await customHandle.queryPermission(options)) === 'granted') {
      return true;
    }
    if ((await customHandle.requestPermission(options)) === 'granted') {
      return true;
    }
  } catch (err) {
    console.warn('Permission query/request error:', err);
  }
  return false;
}

export async function pickRecordingFolder(): Promise<{ handle: FileSystemDirectoryHandle; name: string } | null> {
  if (!isFileSystemAccessSupported()) {
    throw new Error('File System Access API is not supported in this browser.');
  }

  try {
    const showDirectoryPicker = (window as unknown as { showDirectoryPicker: (opts?: unknown) => Promise<FileSystemDirectoryHandle> }).showDirectoryPicker;
    const handle = await showDirectoryPicker({
      mode: 'readwrite',
      id: 'vervio-recordings',
    });
    await storeDirectoryHandle(handle);
    return { handle, name: handle.name };
  } catch (err: unknown) {
    if ((err as Error).name === 'AbortError') {
      return null;
    }
    throw err;
  }
}

export function sanitizeFileName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function generateRecordingFileName(topicTitle: string): string {
  const cleanTitle = sanitizeFileName(topicTitle) || 'interview-practice';
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10);
  const timeStr = `${String(now.getHours()).padStart(2, '0')}-${String(now.getMinutes()).padStart(2, '0')}`;
  return `${cleanTitle}-${dateStr}-${timeStr}.webm`;
}

export function triggerFileDownload(blob: Blob, fileName: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}

export async function saveRecordingFile(
  blob: Blob,
  fileName: string
): Promise<{ storageType: 'filesystem' | 'download'; pathOrName: string }> {
  if (isFileSystemAccessSupported()) {
    const handle = await getStoredDirectoryHandle();
    if (handle) {
      const hasPermission = await verifyDirectoryPermission(handle, true);
      if (hasPermission) {
        try {
          const customHandle = handle as unknown as CustomDirectoryHandle;
          const fileHandle = await customHandle.getFileHandle(fileName, { create: true });
          const writable = await fileHandle.createWritable();
          await writable.write(blob);
          await writable.close();
          return { storageType: 'filesystem', pathOrName: `${handle.name}/${fileName}` };
        } catch (err) {
          console.warn('Failed writing to directory handle, falling back to download:', err);
        }
      }
    }
  }

  // Fallback to browser file download
  triggerFileDownload(blob, fileName);
  return { storageType: 'download', pathOrName: fileName };
}
