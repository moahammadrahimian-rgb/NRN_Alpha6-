async function api(url, options = {}) {
  const token = localStorage.getItem("alpha6_token");

  options = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    }
  };

  if (token) {
    options.headers.Authorization = "Bearer " + token;
  }

  const method = (options.method || "GET").toUpperCase();
  const canQueue = ["POST", "PUT", "PATCH", "DELETE"].includes(method);

  if (!navigator.onLine) {
    if (canQueue && window.ALPHA6OfflineQueue) {
      window.ALPHA6OfflineQueue.add({
        url,
        method,
        headers: options.headers,
        body: options.body ? JSON.parse(options.body) : undefined
      });

      return {
        status: 0,
        offline: true,
        queued: true,
        data: { message: "Operation queued while offline" }
      };
    }

    return {
      status: 0,
      offline: true,
      data: { message: "Network unavailable" }
    };
  }

  try {
    const execute = async () => {
      const r = await fetch(url, options);
      const text = await r.text();

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        data = text;
      }

      if (!r.ok) {
        throw Object.assign(
          new Error("HTTP_" + r.status),
          { status: r.status, data }
        );
      }

      return {
        status: r.status,
        data
      };
    };

    if (window.ALPHA6Retry) {
      return await window.ALPHA6Retry.run(execute);
    }

    return await execute();

  } catch (error) {
    if (canQueue && window.ALPHA6OfflineQueue) {
      window.ALPHA6OfflineQueue.add({
        url,
        method,
        headers: options.headers,
        body: options.body ? JSON.parse(options.body) : undefined
      });

      return {
        status: 0,
        queued: true,
        data: { message: "Operation queued for retry" }
      };
    }

    return {
      status: error.status || 0,
      error: true,
      data: error.data || { message: error.message }
    };
  }
}
async function health(){
  const x=await api("/api/health");
  const el=document.getElementById("output");
  if(el) el.textContent=JSON.stringify(x,null,2);
}
