import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle, FiAlertCircle, FiInfo, FiX } from 'react-icons/fi';
import './ToastNotification.css';

export default function ToastNotification({
  visible,
  message,
  type = 'info',
  onClose,
}) {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FiCheckCircle className="toast-icon success" />;
      case 'error':
        return <FiAlertCircle className="toast-icon error" />;
      case 'info':
      default:
        return <FiInfo className="toast-icon info" />;
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={`modern-toast-card ${type}`}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.95 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          role="status"
          aria-live="polite"
        >
          <div className="toast-icon-wrap">{getIcon()}</div>
          <span className="toast-message-text">{message}</span>
          {onClose && (
            <button
              type="button"
              className="toast-close-btn"
              onClick={onClose}
              aria-label="Dismiss notification"
            >
              <FiX />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
