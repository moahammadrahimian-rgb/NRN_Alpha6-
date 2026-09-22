(function () {
  const SyncEngine = {
    running: false,

    async flush() {
      if (this.running || !navigator.onLine) return;

      this.running = true;

      try {
        const queue = window.ALPHA6OfflineQueue;

        for (const item of queue.all()) {
          try {
            if (item.attempts >= queue.maxAttempts()) {
              continue;
            }

            item.attempts = (item.attempts || 0) + 1;
            queue.update(item.id, { attempts: item.attempts });

            await window.ALPHA6Retry.run(async () => {
              const response = await fetch(item.url, {
                method: item.method || 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  ...(item.headers || {})
                },
                body: item.body ? JSON.stringify(item.body) : undefined
              });

              if (!response.ok) {
                throw new Error(`HTTP_${response.status}`);
              }

              return response;
            });

            queue.remove(item.id);
          } catch (error) {
            break;
          }
        }
      } finally {
        this.running = false;
      }
    },

    start() {
      window.addEventListener('online', () => this.flush());

      setTimeout(() => this.flush(), 1500);

      setInterval(() => {
        if (navigator.onLine) this.flush();
      }, 30000);
    }
  };

  window.ALPHA6Sync = SyncEngine;
  SyncEngine.start();
})();
