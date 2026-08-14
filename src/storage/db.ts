import { openDB, type DBSchema, type IDBPDatabase } from 'idb';
import type { TopicCategory, Recording, AppSettings } from '../types';

interface VervioDB extends DBSchema {
  categories: {
    key: string;
    value: TopicCategory;
  };
  recordings: {
    key: string;
    value: Recording;
    indexes: { 'by-recordedAt': string; 'by-category': string };
  };
  settings: {
    key: string;
    value: AppSettings;
  };
  handles: {
    key: string;
    value: { id: string; handle: FileSystemDirectoryHandle };
  };
}

const DB_NAME = 'vervio-db';
const DB_VERSION = 1;

let dbPromise: Promise<IDBPDatabase<VervioDB>> | null = null;

export function getDB(): Promise<IDBPDatabase<VervioDB>> {
  if (!dbPromise) {
    dbPromise = openDB<VervioDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('categories')) {
          db.createObjectStore('categories', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('recordings')) {
          const recStore = db.createObjectStore('recordings', { keyPath: 'id' });
          recStore.createIndex('by-recordedAt', 'recordedAt');
          recStore.createIndex('by-category', 'categoryId');
        }
        if (!db.objectStoreNames.contains('settings')) {
          db.createObjectStore('settings', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('handles')) {
          db.createObjectStore('handles', { keyPath: 'id' });
        }
      },
    });
  }
  return dbPromise;
}
