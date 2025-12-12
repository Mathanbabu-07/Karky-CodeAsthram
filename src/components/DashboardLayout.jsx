// src/components/DashboardLayout.jsx
import React, { useState } from 'react';
import BlocklyEditor from './BlocklyEditor';
import { generateToolboxXml } from '../toolbox/toolbox';
import '../styles.css';

export default function DashboardLayout() {
  const [code, setCode] = useState('');
  const [tab, setTab] = useState('blockly');

  return (
    <div className="dashboard">
      <header className="header-bar">
        <h2 className="app-title">Code Asthram</h2>
        <div className="tab-controls">
          <button onClick={() => setTab('blockly')} className={tab === 'blockly' ? 'active' : ''}>
            Blockly
          </button>
          <button onClick={() => setTab('code')} className={tab === 'code' ? 'active' : ''}>
            Code
          </button>
        </div>
        <div className="user-info">
          <span className="user-icon">👤</span>
          <span className="user-name">John Doe</span>
          <button className="logout-btn" title="Sign Out">
            ⏻
          </button>
        </div>
      </header>

      <main className="dashboard-body">
        {tab === 'blockly' && (
          <div id="blocklyDiv">
            <BlocklyEditor onCodeChange={setCode} toolboxConfig={generateToolboxXml()} />
          </div>
        )}

        {tab === 'code' && (
          <div className="code-view code-tab">
            <h3>Generated Arduino Code</h3>
            <pre>{code}</pre>
          </div>
        )}
      </main>
    </div>
  );
}
