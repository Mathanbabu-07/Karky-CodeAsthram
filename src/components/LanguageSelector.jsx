import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiCheck } from 'react-icons/fi';
import { SiPython, SiJavascript } from 'react-icons/si';
import { FaJava } from 'react-icons/fa6';
import './LanguageSelector.css';

const LANGUAGES = [
  {
    id: 'python',
    name: 'Python',
    version: '3.11',
    subtitle: 'CPython · Data Science & Logic',
    icon: SiPython,
    colorClass: 'python',
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    version: 'ES2024',
    subtitle: 'V8 Engine · Web & Async Logic',
    icon: SiJavascript,
    colorClass: 'javascript',
  },
  {
    id: 'java',
    name: 'Java',
    version: '21 LTS',
    subtitle: 'OpenJDK · OOP & Static Types',
    icon: FaJava,
    colorClass: 'java',
  },
];

export default function LanguageSelector({ currentLanguage = 'python', onLanguageChange, disabled = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const activeLang = LANGUAGES.find((l) => l.id === currentLanguage) || LANGUAGES[0];
  const ActiveIcon = activeLang.icon;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (langId) => {
    if (langId !== currentLanguage) {
      onLanguageChange(langId);
    }
    setIsOpen(false);
  };

  return (
    <div className="toolbar-lang-capsule-wrapper" ref={dropdownRef}>
      <button
        type="button"
        className={`lang-capsule-btn ${isOpen ? 'active' : ''}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="lang-capsule-content">
          {/* Icon Badge */}
          <div className={`lang-icon-badge ${activeLang.colorClass}`}>
            <ActiveIcon />
          </div>

          {/* Vertically Stacked Language Name & Version */}
          <div className="lang-text-stack">
            <span className="lang-name-text">{activeLang.name}</span>
            <span className={`lang-sub-tag ${activeLang.colorClass}`}>
              {activeLang.version}
            </span>
          </div>
        </div>

        <FiChevronDown className={`lang-capsule-chevron ${isOpen ? 'open' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="lang-capsule-dropdown"
            initial={{ opacity: 0, y: -6, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -6, x: '-50%' }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            role="listbox"
          >
            <div className="dropdown-label">Select Programming Environment</div>
            {LANGUAGES.map((lang) => {
              const Icon = lang.icon;
              const isSelected = lang.id === currentLanguage;
              return (
                <button
                  key={lang.id}
                  type="button"
                  className={`lang-menu-item ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleSelect(lang.id)}
                  role="option"
                  aria-selected={isSelected}
                >
                  <div className={`lang-item-icon-badge ${lang.colorClass}`}>
                    <Icon />
                  </div>
                  <div className="lang-item-text">
                    <div className="lang-item-top">
                      <span className="lang-item-name">{lang.name}</span>
                      <span className={`lang-item-version ${lang.colorClass}`}>{lang.version}</span>
                    </div>
                    <span className="lang-item-sub">{lang.subtitle}</span>
                  </div>
                  {isSelected && <FiCheck className="lang-item-check" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
