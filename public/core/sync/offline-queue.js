(function () {
  const KEY = 'ALPHA6_OFFLINE_QUEUE_V1';
  const MAX_ITEMS = 100;
  const MAX_ITEM_BYTES = 256 * 1024;
  const MAX_ATTEMPTS = 5;

  const Queue = {
    _read() {
      try {
        return JSON.parse(localStorage.getItem(KEY) || '[]');
      } catch {
        return [];
      }
    },

    _write(items) {
      localStorage.setItem(KEY, JSON.stringify(items));
    },

    add(operation) {
      const items = this._read();

      const item = {
        id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      operationId: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + "-" + Math.random(),
        createdAt: Date.now(),
        attempts: 0,
        ...operation
      };

      const size = new Blob([JSON.stringify(item)]).size;

      if (size > MAX_ITEM_BYTES) {
        throw new Error("QUEUE_ITEM_TOO_LARGE");
      }

      if (items.length >= MAX_ITEMS) {
        items.shift();
      }

      items.push(item);
      this._write(items);
      return item;
    },

    maxItems() {
      return MAX_ITEMS;
    },

    maxAttempts() {
      return MAX_ATTEMPTS;
    },

    maxItemBytes() {
      return MAX_ITEM_BYTES;
    },

    all() {
      return this._read();
    },

    update(id, patch) {
      const items = this._read();
      const index = items.findIndex(item => item.id === id);

      if (index === -1) return false;

      items[index] = {
        ...items[index],
        ...patch
      };

      this._write(items);
      return items[index];
    },

    remove(id) {
      this._write(this._read().filter(item => item.id !== id));
    },

    clear() {
      this._write([]);
    },

    size() {
      return this._read().length;
    }
  };

  window.ALPHA6OfflineQueue = Queue;
})();
