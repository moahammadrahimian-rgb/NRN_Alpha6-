(function () {
  const NetworkState = {
    online: navigator.onLine,

    isOnline() {
      return this.online;
    },

    update() {
      this.online = navigator.onLine;
      window.dispatchEvent(new CustomEvent('alpha6:network', {
        detail: { online: this.online }
      }));
      return this.online;
    },

    start() {
      window.addEventListener('online', () => this.update());
      window.addEventListener('offline', () => this.update());
      this.update();
    }
  };

  window.ALPHA6Network = NetworkState;
  NetworkState.start();
})();
