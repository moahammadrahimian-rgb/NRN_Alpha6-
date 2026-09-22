(function () {
  const KEY = 'ALPHA6_OFFLINE_QUEUE_V1';

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

      items.push({
        id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
        createdAt: Date.now(),
        attempts: 0,
        ...operation
      });

      this._write(items);
      return items;
    },

    all() {
      return this._read();
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
