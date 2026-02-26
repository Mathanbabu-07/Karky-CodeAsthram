import React from 'react';
import './FundamentalsModeToggle.css';

export default function FundamentalsModeToggle({ isEnabled, onToggle }) {
    return (
        <button
            type="button"
            className={`fundamentals-toggle ${isEnabled ? 'active' : ''}`}
            onClick={onToggle}
            title={isEnabled ? "Fundamentals Mode: ON (showing basic blocks only)" : "Fundamentals Mode: OFF (showing all blocks)"}
            aria-label="Toggle Fundamentals Mode"
            aria-pressed={isEnabled}
        >
            <span className="toggle-text">Fundamentals Mode</span>
            <span className="toggle-state">{isEnabled ? 'ON' : 'OFF'}</span>
        </button>
    );
}
