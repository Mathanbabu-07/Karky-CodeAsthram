import React from 'react';
import './SessionManager.css';

const SessionManager = () => {
  return (
    <>
      {/* Toast (used by SessionAPI) */}
      <div id="logoutToast" className="hidden opacity-0" role="status" aria-live="polite">
        <span id="logoutToastIcon" className="toast-icon" aria-hidden="true"></span>
        <span id="logoutToastMessage"></span>
      </div>

      {/* Idle Timeout Modal (used by SessionAPI) */}
      <div id="timeoutModal" className="hidden" role="dialog" aria-modal="true">
        <div className="card">
          <div>You’re inactive. Logging out in <b id="countdown">300</b> seconds.</div>
          <button id="stayLoggedInBtn" style={{ marginTop: '12px' }}>Stay signed in</button>
        </div>
      </div>
    </>
  );
};

export default SessionManager;