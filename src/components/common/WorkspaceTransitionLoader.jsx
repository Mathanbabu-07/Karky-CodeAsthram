import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SiPython, SiJavascript } from 'react-icons/si';
import { FaJava } from 'react-icons/fa6';
import './WorkspaceTransitionLoader.css';

const LANGUAGE_CONFIGS = {
  python: {
    name: 'Python',
    icon: SiPython,
    color: '#38bdf8',
    secondaryColor: '#facc15',
    headline: 'Switching to Python',
    details: 'Configuring Python blocks & compiler...',
  },
  javascript: {
    name: 'JavaScript',
    icon: SiJavascript,
    color: '#facc15',
    secondaryColor: '#f59e0b',
    headline: 'Switching to JavaScript',
    details: 'Configuring JavaScript blocks & runtime...',
  },
  java: {
    name: 'Java',
    icon: FaJava,
    color: '#f87171',
    secondaryColor: '#ea580c',
    headline: 'Switching to Java',
    details: 'Configuring Java blocks & classpath...',
  },
};

export default function WorkspaceTransitionLoader({
  isVisible,
  targetLanguage = 'python',
  customMessage = '',
}) {
  const [progress, setProgress] = useState(20);
  const config = LANGUAGE_CONFIGS[targetLanguage] || LANGUAGE_CONFIGS.python;
  const IconComponent = config.icon;

  useEffect(() => {
    if (!isVisible) {
      setProgress(20);
      return;
    }

    const t1 = setTimeout(() => setProgress(65), 100);
    const t2 = setTimeout(() => setProgress(100), 280);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [isVisible, targetLanguage]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="workspace-transition-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: 'easeInOut' }}
        >
          <motion.div
            className="workspace-transition-card"
            initial={{ scale: 0.96, opacity: 0, y: 8 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 8 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            style={{
              '--lang-primary': config.color,
              '--lang-secondary': config.secondaryColor,
            }}
          >
            {/* Animated Vector Icon Orb */}
            <div className="transition-icon-orb">
              <div className="transition-orb-ring" />
              <IconComponent className="transition-vector-icon" />
            </div>

            {/* Language Title */}
            <div className="transition-text-group">
              <h3 className="transition-headline">
                {customMessage || config.headline}
              </h3>
              <p className="transition-details">{config.details}</p>
            </div>

            {/* Progress Bar */}
            <div className="transition-progress-container">
              <div className="transition-progress-bar">
                <motion.div
                  className="transition-progress-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
