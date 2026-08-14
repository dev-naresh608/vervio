import { useState, useEffect, useCallback } from 'react';
import {
  isFileSystemAccessSupported,
  getStoredDirectoryHandle,
  pickRecordingFolder,
  verifyDirectoryPermission,
  clearStoredDirectoryHandle,
} from '../storage/filesystem';
import { saveSettings } from '../storage/settingsRepository';

export function useFileSystem() {
  const isSupported = isFileSystemAccessSupported();
  const [folderName, setFolderName] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const checkStatus = useCallback(async () => {
    if (!isSupported) {
      setIsLoading(false);
      return;
    }

    try {
      const handle = await getStoredDirectoryHandle();
      if (handle) {
        setFolderName(handle.name);
        const permitted = await verifyDirectoryPermission(handle, false);
        setHasPermission(permitted);
      } else {
        setFolderName(null);
        setHasPermission(false);
      }
    } catch (err) {
      console.warn('Error checking directory status:', err);
    } finally {
      setIsLoading(false);
    }
  }, [isSupported]);

  useEffect(() => {
    checkStatus();
  }, [checkStatus]);

  const selectFolder = useCallback(async () => {
    if (!isSupported) return false;
    try {
      const result = await pickRecordingFolder();
      if (result) {
        setFolderName(result.name);
        setHasPermission(true);
        await saveSettings({ hasCustomDirectory: true, directoryName: result.name });
        return true;
      }
    } catch (err) {
      console.error('Directory selection failed:', err);
    }
    return false;
  }, [isSupported]);

  const resetFolder = useCallback(async () => {
    await clearStoredDirectoryHandle();
    setFolderName(null);
    setHasPermission(false);
    await saveSettings({ hasCustomDirectory: false, directoryName: undefined });
  }, []);

  return {
    isSupported,
    folderName,
    hasPermission,
    isLoading,
    selectFolder,
    resetFolder,
    refreshStatus: checkStatus,
  };
}
