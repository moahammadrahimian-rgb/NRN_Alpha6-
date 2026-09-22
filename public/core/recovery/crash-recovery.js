(function () {
  const KEY = "ALPHA6_CRASH_RECOVERY_V1";

  const Recovery = {
    start() {
      const previous = this.read();

      localStorage.setItem(KEY, JSON.stringify({
        active: true,
        startedAt: Date.now(),
        previousCrash: !!previous?.active
      }));

      if (previous?.active) {
        window.dispatchEvent(new CustomEvent("alpha6:crash-recovered", {
          detail: previous
        }));
      }

      window.addEventListener("beforeunload", () => {
        localStorage.setItem(KEY, JSON.stringify({
          active: false,
          cleanExit: true,
          closedAt: Date.now()
        }));
      });
    },

    read() {
      try {
        return JSON.parse(localStorage.getItem(KEY) || "null");
      } catch {
        return null;
      }
    }
  };

  window.ALPHA6CrashRecovery = Recovery;
  Recovery.start();
})();
