(function (global) {
  const DEFAULTS = {
    sessionCheckUrl: "/api/session-check",
    logoutUrl: "/logout",
    logoutOnCloseUrl: "/api/logout-on-close",
    pingUrl: "/ping",
    sessionCheckIntervalMs: 10_000,     // 10s
    pingIntervalMs: 20 * 60 * 1000,     // 20m
    idleWarnAfterMs: 1 * 60 * 15000,     // 15m
    idleCountdownSeconds: 300,          // 5m
    logoutButtonIds: ["btn_logout","logout-btn"],
    toastIds: { container: "logoutToast", message: "logoutToastMessage", icon: "logoutToastIcon" },
    modalIds: { container: "timeoutModal", countdown: "countdown", stayBtn: "stayLoggedInBtn" },
    userEmail: undefined,
    sessionId: undefined
  };

  const S = {
    opts: null,
    idleTimer: null,
    warningTimer: null,
    countdown: 0,
    sessionCheckTimer: null,
    pingTimer: null,
    lastActivityPing: 0,
    inited: false
  };

  const byId = id => document.getElementById(id);

  function getCsrfToken() {
    const meta = document.querySelector('meta[name="csrf-token"]');
    if (meta && meta.content) return meta.content;
    const m = document.cookie.match(/(?:^|;\s*)csrf_token=([^;]+)/);
    return m ? decodeURIComponent(m[1]) : "";
  }

  function renderIcon(el, iconName) {
    if (!el) return;
    try {
      const L = global.lucide;
      if (L?.icons?.[iconName]) {
        el.innerHTML = L.icons[iconName].toSvg({ width: 18, height: 18, focusable: "false", "aria-hidden": "true" });
      } else if (L?.icon) {
        el.innerHTML = L.icon(iconName).toSvg({ width: 18, height: 18, focusable: "false", "aria-hidden": "true" });
      } else {
        el.innerHTML = "";
      }
    } catch { el.innerHTML = ""; }
  }

  function showToast(message, iconName = "info") {
    const c = byId(S.opts.toastIds.container), m = byId(S.opts.toastIds.message);
    const i = byId(S.opts.toastIds.icon);
    if (!c || !m) return;
    m.textContent = message || "";
    renderIcon(i, iconName);
    c.classList.remove("hidden","opacity-0");
    c.classList.add("opacity-100");
    setTimeout(() => {
      c.classList.remove("opacity-100");
      c.classList.add("opacity-0");
      setTimeout(() => c.classList.add("hidden"), 500);
    }, 4000);
  }

  function checkToastFromUrl() {
    const p = new URLSearchParams(window.location.search);
    if (p.get("timeout") === "true")      showToast("You were logged out due to inactivity.", "alert-triangle");
    else if (p.get("force_logout") === "true") showToast("You were logged out because your session expired or you logged in elsewhere.", "log-out");
    else if (p.get("manual") === "true")  showToast("You have been logged out successfully.", "check-circle-2");
    if ([...p.keys()].length) window.history.replaceState({}, document.title, window.location.pathname);
  }

  const safeFetch = (url, init) =>
    fetch(url, init).catch(err => { console.error("Fetch failed:", url, err); return new Response(null, { status: 0 }); });

  function pingServer(){ 
    if (S.opts.pingIntervalMs > 0) {
      safeFetch(S.opts.pingUrl, { credentials: "include" }); 
    }
  }

  async function checkSession(){
    const res = await safeFetch(S.opts.sessionCheckUrl, { credentials: "include" });
    if (res.status === 401) {
      alert("Your session has expired or was terminated. Please log in again.");
      window.location.href = "/?force_logout=true";
    }
  }

  // CHANGED: use GET /logout to match your backend, no CSRF header needed
  async function performLogout(reason="manual"){
    try {
      try { localStorage.clear(); } catch {}
      try { sessionStorage.clear(); } catch {}

      await safeFetch(S.opts.logoutUrl, {
        method: "GET",               // <-- backend only allows GET /logout
        credentials: "include",
        cache: "no-store"
      });
    } finally {
      window.location.href = `/?${encodeURIComponent(reason)}=true`;
    }
  }

  function attachLogoutButtons(){
    S.opts.logoutButtonIds.forEach(id => {
      const el = byId(id);
      if (el && !el._bound) {
        el.addEventListener("click", () => performLogout("manual"));
        el._bound = true;
      }
    });
  }

  // CHANGED: send JSON payload so your backend can read email/session_id
  function sendLogoutBeacon(){
    const url = S.opts.logoutOnCloseUrl;
    if (!navigator.sendBeacon || !url) return;

    const payload = JSON.stringify({
      email: S.opts.userEmail || null,
      session_id: S.opts.sessionId || null
    });
    const blob = new Blob([payload], { type: "application/json" });
    navigator.sendBeacon(url, blob);
  }

  function showWarningModal(){
    const { container, countdown, stayBtn } = S.opts.modalIds;
    const modal = byId(container), cd = byId(countdown), stay = byId(stayBtn);
    if (!modal || !cd) return;

    modal.classList.remove("hidden");
    const deadline = Date.now() + S.opts.idleCountdownSeconds * 1000;

    if (stay) stay.onclick = () => { hideWarningModal(); pingServer(); startIdleTimer(); };

    clearInterval(S.warningTimer);
    S.warningTimer = setInterval(() => {
      const remaining = Math.ceil((deadline - Date.now()) / 1000);
      cd.innerText = String(Math.max(0, remaining));
      if (remaining <= 0) {
        clearInterval(S.warningTimer);
        performLogout("timeout");
      }
    }, 1000);
  }

  function hideWarningModal(){
    const modal = byId(S.opts.modalIds.container);
    if (modal) modal.classList.add("hidden");
    clearInterval(S.warningTimer); S.warningTimer = null;
  }

  function startIdleTimer(){
    clearTimeout(S.idleTimer);
    clearInterval(S.warningTimer);
    S.idleTimer = setTimeout(showWarningModal, S.opts.idleWarnAfterMs);
  }

  function onUserActivity(){
    const now = Date.now();
    if (now - S.lastActivityPing > 60_000) { pingServer(); S.lastActivityPing = now; }
    startIdleTimer();
  }

  function bindUserActivity(){
    ["mousemove","keydown","scroll","click","touchstart","touchmove"].forEach(evt =>
      document.addEventListener(evt, onUserActivity, { passive:true })
    );
  }

  function handlePageshow(e){ if (e.persisted) window.location.reload(); }

  const API = {
    init(options = {}) {
      if (S.inited) return;
      S.inited = true;
      S.opts = Object.assign({}, DEFAULTS, options);

      clearInterval(S.sessionCheckTimer); 
      if (S.opts.sessionCheckIntervalMs > 0) {
        S.sessionCheckTimer = setInterval(checkSession, S.opts.sessionCheckIntervalMs);
      }
      clearInterval(S.pingTimer);         
      if (S.opts.pingIntervalMs > 0) {
        S.pingTimer = setInterval(pingServer, S.opts.pingIntervalMs);
      }

      window.addEventListener("pagehide", sendLogoutBeacon);
      window.addEventListener("beforeunload", sendLogoutBeacon);
      window.addEventListener("pageshow", handlePageshow);

      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => { attachLogoutButtons(); checkToastFromUrl(); });
      } else {
        attachLogoutButtons(); checkToastFromUrl();
      }

      bindUserActivity();
      startIdleTimer();

      if (S.opts.pingIntervalMs > 0) {
        pingServer();
      }
      if (S.opts.sessionCheckIntervalMs > 0) {
        checkSession();
      }
    },
    logout: performLogout
  };

  global.SessionAPI = API;
})(window);