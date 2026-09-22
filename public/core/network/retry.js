(function () {
  const Retry = {
    async run(task, options = {}) {
      const maxAttempts = options.maxAttempts ?? 5;
      const baseDelay = options.baseDelay ?? 1000;
      const maxDelay = options.maxDelay ?? 30000;

      let lastError;

      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
          return await task(attempt);
        } catch (error) {
          lastError = error;

          if (attempt === maxAttempts) {
            break;
          }

          const delay = Math.min(
            baseDelay * Math.pow(2, attempt - 1),
            maxDelay
          );

          const jitter = Math.floor(Math.random() * 500);
          await new Promise(resolve =>
            setTimeout(resolve, delay + jitter)
          );
        }
      }

      throw lastError;
    }
  };

  window.ALPHA6Retry = Retry;
})();
