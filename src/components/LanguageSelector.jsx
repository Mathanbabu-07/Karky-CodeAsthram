import React from 'react';
import './LanguageSelector.css';

export default function LanguageSelector({ currentLanguage, onLanguageChange, disabled = false }) {
    return (
        <div className="language-selector-wrapper">
            <label htmlFor="language-select" className="language-label">Language:</label>
            <select
                id="language-select"
                value={currentLanguage}
                onChange={(e) => onLanguageChange(e.target.value)}
                disabled={disabled}
                className="language-select"
                aria-label="Select Programming Language"
            >
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="javascript">JavaScript</option>
            </select>
        </div>
    );
}
