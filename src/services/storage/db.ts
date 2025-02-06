// IndexedDB wrapper with Firestore-like structure
export class DB {
  private static instance: IDBDatabase | null = null;
  private static DB_NAME = 'babyTrackerDB';
  private static DB_VERSION = 1;
  private static STORES = [
    'feeding_records',
    'sleep_records',
    'diaper_records',
    'reminders',
    'activity_records',
    'meds_records',
    'solid_food_records',
    'growth_records'  // Added growth_records store
  ];

  static async init(): Promise<void> {
    if (DB.instance) {
      return;
    }

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB.DB_NAME, DB.DB_VERSION);

      request.onerror = () => reject(request.error);
      
      request.onsuccess = () => {
        DB.instance = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        // Create stores for each record type if they don't exist
        DB.STORES.forEach(storeName => {
          if (!db.objectStoreNames.contains(storeName)) {
            const store = db.createObjectStore(storeName, { keyPath: 'id' });
            
            // Add indexes for timestamp-based queries
            if (storeName !== 'reminders') {
              store.createIndex('timestamp', 'timestamp', { unique: false });
            }
          }
        });
      };
    });
  }

  private static async ensureInitialized(): Promise<void> {
    if (!DB.instance) {
      await DB.init();
    }
  }

  static async add<T extends { id: string }>(storeName: string, data: T): Promise<T> {
    await DB.ensureInitialized();
    if (!DB.instance) throw new Error('Database not initialized');

    return new Promise((resolve, reject) => {
      try {
        const transaction = DB.instance.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.add(data);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }

  static async update<T extends { id: string }>(storeName: string, data: T): Promise<T> {
    await DB.ensureInitialized();
    if (!DB.instance) throw new Error('Database not initialized');

    return new Promise((resolve, reject) => {
      try {
        const transaction = DB.instance.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.put(data);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }

  static async delete(storeName: string, id: string): Promise<void> {
    await DB.ensureInitialized();
    if (!DB.instance) throw new Error('Database not initialized');

    return new Promise((resolve, reject) => {
      try {
        const transaction = DB.instance.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.delete(id);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  static async getAll<T>(storeName: string): Promise<T[]> {
    await DB.ensureInitialized();
    if (!DB.instance) throw new Error('Database not initialized');

    return new Promise((resolve, reject) => {
      try {
        const transaction = DB.instance.transaction(storeName, 'readonly');
        const store = transaction.objectStore(storeName);
        const request = store.getAll();

        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          // Convert date strings back to Date objects
          const results = request.result.map((item: any) => ({
            ...item,
            date: item.date ? new Date(item.date) : item.date,
            timestamp: item.timestamp ? new Date(item.timestamp) : item.timestamp
          }));
          resolve(results);
        };
      } catch (error) {
        reject(error);
      }
    });
  }

  static async getAllInRange<T>(
    storeName: string,
    startDate: Date,
    endDate: Date
  ): Promise<T[]> {
    const allRecords = await DB.getAll<T & { timestamp: Date }>(storeName);
    return allRecords.filter(record => {
      const timestamp = new Date(record.timestamp);
      return timestamp >= startDate && timestamp <= endDate;
    });
  }

  static async hasStore(storeName: string): Promise<boolean> {
    await DB.ensureInitialized();
    return DB.instance?.objectStoreNames.contains(storeName) || false;
  }

  static async deleteDatabase(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.deleteDatabase(DB.DB_NAME);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        DB.instance = null;
        resolve();
      };
    });
  }
}