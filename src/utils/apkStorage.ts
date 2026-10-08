// Utility to manage APK releases, local IndexedDB file uploads, and custom external download URLs

const DB_NAME = 'EBWealth_APK_Storage';
const DB_VERSION = 1;
const STORE_NAME = 'apk_files';

export interface ApkConfig {
  sourceType: 'default' | 'custom_url' | 'uploaded_file';
  customUrl?: string;
  fileName: string;
  version: string;
  fileSizeFormatted: string;
  uploadedAt?: string;
  releaseNotes?: string;
}

const DEFAULT_CONFIG: ApkConfig = {
  sourceType: 'default',
  fileName: 'EB-Wealth-v2.4.0.apk',
  version: 'v2.4.0',
  fileSizeFormatted: '42.8 MB',
  releaseNotes: 'Official Release with UK Compliance & Sovereign Wealth Modules'
};

const CONFIG_STORAGE_KEY = 'eb_wealth_apk_config';

export function getApkConfig(): ApkConfig {
  try {
    const raw = localStorage.getItem(CONFIG_STORAGE_KEY);
    if (raw) {
      return { ...DEFAULT_CONFIG, ...JSON.parse(raw) };
    }
  } catch (e) {
    console.error('Error reading APK config from localStorage', e);
  }
  return DEFAULT_CONFIG;
}

export function saveApkConfig(config: ApkConfig): void {
  try {
    localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(config));
  } catch (e) {
    console.error('Error saving APK config to localStorage', e);
  }
}

// Open or create IndexedDB
function openApkDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// Store actual APK Blob into IndexedDB
export async function storeApkBlob(file: File): Promise<void> {
  const db = await openApkDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const putRequest = store.put(file, 'current_apk');
    putRequest.onsuccess = () => resolve();
    putRequest.onerror = () => reject(putRequest.error);
  });
}

// Retrieve actual APK Blob from IndexedDB
export async function getApkBlob(): Promise<Blob | null> {
  try {
    const db = await openApkDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const getRequest = store.get('current_apk');
      getRequest.onsuccess = () => {
        resolve(getRequest.result || null);
      };
      getRequest.onerror = () => reject(getRequest.error);
    });
  } catch (e) {
    console.error('IndexedDB error', e);
    return null;
  }
}

// Delete stored APK Blob
export async function removeApkBlob(): Promise<void> {
  try {
    const db = await openApkDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const req = store.delete('current_apk');
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (e) {
    console.error('IndexedDB remove error', e);
  }
}

// Format file size in readable MB
export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
