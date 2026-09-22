(function () {
  const DB_NAME = 'ALPHA6_STORAGE';
  const DB_VERSION = 1;
  const STORE = 'data';

  const Storage = {
    db: null,

    async open() {
      if (this.db) return this.db;

      this.db = await new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = () => {
          const db = request.result;

          if (!db.objectStoreNames.contains(STORE)) {
            db.createObjectStore(STORE, { keyPath: 'key' });
          }
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });

      return this.db;
    },

    async set(key, value) {
      const db = await this.open();

      return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE, 'readwrite');
        tx.objectStore(STORE).put({ key, value });

        tx.oncomplete = resolve;
        tx.onerror = () => reject(tx.error);
      });
    },

    async get(key) {
      const db = await this.open();

      return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE, 'readonly');
        const request = tx.objectStore(STORE).get(key);

        request.onsuccess = () =>
          resolve(request.result ? request.result.value : null);

        request.onerror = () => reject(request.error);
      });
    },

    async remove(key) {
      const db = await this.open();

      return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE, 'readwrite');
        tx.objectStore(STORE).delete(key);

        tx.oncomplete = resolve;
        tx.onerror = () => reject(tx.error);
      });
    }
  };

  window.ALPHA6Storage = Storage;
})();
