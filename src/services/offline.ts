const DB_NAME = 'LeyInvestDB';
const DB_VERSION = 1;
const STORES = {
  AUTH: 'auth',
  USER: 'user',
  CACHE: 'cache'
};

class OfflineStorage {
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        if (!db.objectStoreNames.contains(STORES.AUTH)) {
          db.createObjectStore(STORES.AUTH, { keyPath: 'id' });
        }
        
        if (!db.objectStoreNames.contains(STORES.USER)) {
          db.createObjectStore(STORES.USER, { keyPath: 'id' });
        }
        
        if (!db.objectStoreNames.contains(STORES.CACHE)) {
          const cacheStore = db.createObjectStore(STORES.CACHE, { keyPath: 'key' });
          cacheStore.createIndex('timestamp', 'timestamp', { unique: false });
        }
      };
    });
  }

  async set(store: string, key: string, data: any): Promise<void> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([store], 'readwrite');
      const objectStore = transaction.objectStore(store);
      const request = objectStore.put({ 
        key, 
        data, 
        timestamp: Date.now() 
      });
      
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async get(store: string, key: string): Promise<any> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([store], 'readonly');
      const objectStore = transaction.objectStore(store);
      const request = objectStore.get(key);
      
      request.onsuccess = () => {
        const result = request.result;
        resolve(result ? result.data : null);
      };
      request.onerror = () => reject(request.error);
    });
  }

  async remove(store: string, key: string): Promise<void> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([store], 'readwrite');
      const objectStore = transaction.objectStore(store);
      const request = objectStore.delete(key);
      
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async clearExpired(maxAge = 24 * 60 * 60 * 1000): Promise<void> {
    if (!this.db) await this.init();
    
    const cutoff = Date.now() - maxAge;
    const transaction = this.db.transaction([STORES.CACHE], 'readwrite');
    const store = transaction.objectStore(STORES.CACHE);
    const index = store.index('timestamp');
    const range = IDBKeyRange.upperBound(cutoff);
    
    index.openCursor(range).onsuccess = (event) => {
      const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
      if (cursor) {
        cursor.delete();
        cursor.continue();
      }
    };
  }
}

export const offlineStorage = new OfflineStorage();

export const cacheManager = {
  async cacheUserData(userId: string, userData: any): Promise<void> {
    await offlineStorage.set(STORES.USER, userId, userData);
  },

  async getCachedUserData(userId: string): Promise<any> {
    return offlineStorage.get(STORES.USER, userId);
  },

  async cacheAuthData(authData: any): Promise<void> {
    await offlineStorage.set(STORES.AUTH, 'current', authData);
  },

  async getCachedAuthData(): Promise<any> {
    return offlineStorage.get(STORES.AUTH, 'current');
  },

  async clearCache(): Promise<void> {
    await offlineStorage.clearExpired();
  }
};