import React, { useState, useEffect } from "react";
import BlocklyEditor from './components/BlocklyEditor';
import Toolbar from './components/Toolbar';
import BoardSelector from './components/BoardSelector';
import { BOARDS, DEFAULT_BOARD_ID } from './boards/profiles';
import { getToolboxConfig } from './toolbox/toolbox';
import { captureWorkspaceScreenshot } from "./modules/screenshot";
import { FiDownload } from 'react-icons/fi';
import SessionManager from './components/SessionManager';
import CodePanel from './components/CodePanel';
import TutorialsList from './components/tutorials/TutorialsList';
import TutorialController from './components/tutorials/TutorialController';
import { TUTORIALS } from './tutorials';
import { FEATURE_FLAGS } from './config';
import TemplatesList from './components/modals/TemplatesList';


import './styles.css';
import './styles/toolbox.css';
import './styles/custom-accordion.css';
import './components/Tooltip.css';
import './components/Toolbar.css';
import './CodePanel.css';
import './plugins/block-plus-minus';
import './generators/python.js';
import './modules/initializer.js';
import './modules/session-api.js';
import './styles/tutorials.css';
import './styles/templates.css';

export default function App() {
  const [code, setCode] = useState('');
  // Start with code panel collapsed; only open when toggled
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [mainWorkspace, setMainWorkspace] = useState(null);
  const [showTutorials, setShowTutorials] = useState(false);
  const [activeTutorial, setActiveTutorial] = useState(null);
  const [showTemplatesModal, setShowTemplatesModal] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '' });


  // Get the static, unified toolbox configuration
  const toolboxConfig = getToolboxConfig();

  const downloadFile = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'script.py';
    a.click();
  };

  const saveWorkspaceXML = () => {
    if (!mainWorkspace) return;
    const xmlDom = globalThis.Blockly.Xml.workspaceToDom(mainWorkspace);
    const xmlText = globalThis.Blockly.Xml.domToPrettyText(xmlDom);
    const blob = new Blob([xmlText], { type: 'text/xml' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'workspace.xml';
    a.click();
  };

  const loadWorkspaceXML = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const xmlText = reader.result;
        const parser = new DOMParser();
        const dom = parser.parseFromString(xmlText, 'text/xml');
        if (!mainWorkspace) return;
        globalThis.Blockly.Xml.clearWorkspaceAndLoadFromXml(dom.documentElement, mainWorkspace);
        setTimeout(() => {
          try {
            const newCode = globalThis.Python.workspaceToCode(mainWorkspace);
            setCode(newCode);
          } catch (e) {
            console.error('Code generation error after load:', e);
          }
        }, 100);
      } catch (error) {
        console.error('Invalid XML:', error);
      }
    };
    reader.readAsText(file);
  };

  const newWorkspace = () => {
    if (!mainWorkspace) return;
    const confirmed = window.confirm('Start a new workspace? All unsaved blocks will be lost.');
    if (confirmed) {
      mainWorkspace.clear();
      try {
        const freshCode = globalThis.Python.workspaceToCode(mainWorkspace);
        setCode(freshCode);
      } catch (e) {
        console.error('Code generation error after clearing:', e);
      }
    }
  };

  const handleCapture = () => {
    captureWorkspaceScreenshot(
      '.blockly-container',
      'code-asthram-workspace.png',
      ['.floating-code-panel']
    );
  };

  const handleLogout = () => {
    if (window.SessionAPI) {
      window.SessionAPI.logout();
    } else {
      alert('Session API not loaded. Performing basic logout.');
    }
  };

  useEffect(() => {
    if (window.SessionAPI) {
      window.SessionAPI.init({
        logoutButtonIds: ["logout-btn"],
        sessionCheckIntervalMs: 0, // Disable session checking
        pingIntervalMs: 0, // Disable ping
      });
    }
  }, []);

  const handleSelectTutorial = (tutorial) => {
    setActiveTutorial(tutorial);
    setShowTutorials(false); // Hide the list when a tutorial starts
  };

  const handleLoadTemplate = (template) => {
    if (!mainWorkspace) return;

    const onFinishedLoading = () => {
      try {
        const newCode = globalThis.Python.workspaceToCode(mainWorkspace);
        setCode(newCode);
      } catch (e) {
        console.error('Code generation error after load:', e);
        showToast("Code generation failed after loading template.");
      } finally {
        mainWorkspace.removeChangeListener(onFinishedLoading);
      }
    };

    mainWorkspace.addChangeListener(event => {
      if (event.type === globalThis.Blockly.Events.FINISHED_LOADING) {
        onFinishedLoading();
      }
    });

    try {
      const xml = globalThis.Blockly.utils.xml.textToDom(template.workspaceXml);
      globalThis.Blockly.Xml.clearWorkspaceAndLoadFromXml(xml, mainWorkspace);
      setShowTemplatesModal(false);
    } catch (e) {
      console.error("Error loading template XML:", e);
      showToast("Failed to load template: Invalid XML");
      mainWorkspace.removeChangeListener(onFinishedLoading); // Clean up listener on error
    }
  };

  const showToast = (message) => {
    setToast({ visible: true, message });
    setTimeout(() => setToast({ visible: false, message: '' }), 3000);
  };

  return (
    <>
      <SessionManager />
      <Toolbar
        onSave={saveWorkspaceXML}
        onLoad={loadWorkspaceXML}
        onNew={newWorkspace}
        onCapture={handleCapture}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
        isCollapsed={isCollapsed}
        onLogout={handleLogout}
        onToggleTutorials={() => setShowTutorials(!showTutorials)}
        onToggleTemplates={() => setShowTemplatesModal(true)}
      />
      <div className="main-layout toolbox-visible">
        <div className="blockly-container">
          <BlocklyEditor
            onCodeChange={setCode}
            toolboxConfig={toolboxConfig}
            onWorkspaceCreated={setMainWorkspace}
          />
          <CodePanel
            code={code}
            isCollapsed={isCollapsed}
            onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
            onDownload={downloadFile}
          />
        </div>
        {FEATURE_FLAGS.feature_tutorials && activeTutorial && (
          <TutorialController
            tutorial={activeTutorial}
            workspace={mainWorkspace}
            onClose={() => setActiveTutorial(null)}
          />
        )}
        {FEATURE_FLAGS.feature_tutorials && showTutorials && !activeTutorial && (
          <TutorialsList
            tutorials={TUTORIALS}
            onSelectTutorial={handleSelectTutorial}
          />
        )}
        {showTemplatesModal && (
          <TemplatesList
            onSelectTemplate={handleLoadTemplate}
            onClose={() => setShowTemplatesModal(false)}
          />
        )}
        {toast.visible && (
          <div className="toast-notification">
            {toast.message}
          </div>
        )}
      </div>
    </>
  );
}
