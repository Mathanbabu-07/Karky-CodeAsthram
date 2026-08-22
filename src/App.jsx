import React, { useState, useEffect, useMemo } from "react";
import BlocklyEditor from './components/BlocklyEditor';
import Toolbar from './components/Toolbar';
import BoardSelector from './components/BoardSelector';
import { BOARDS, DEFAULT_BOARD_ID } from './boards/profiles';
import { getToolboxConfig } from './toolbox/toolbox';
import { captureWorkspaceScreenshot } from "./modules/screenshot";
import { FiDownload } from 'react-icons/fi';

import CodePanel from './components/CodePanel';
import TutorialsList from './components/tutorials/TutorialsList';
import TutorialController from './components/tutorials/TutorialController';
import { getTutorialsForLanguage } from './tutorials';
import { FEATURE_FLAGS } from './config';
import TemplatesList from './components/modals/TemplatesList';
import WorkspaceTransitionLoader from './components/common/WorkspaceTransitionLoader';
import ToastNotification from './components/common/ToastNotification';

import './styles.css';
import './styles/toolbox.css';
import './styles/custom-accordion.css';
import './components/Tooltip.css';
import './components/Toolbar.css';
import './CodePanel.css';
import './plugins/block-plus-minus';
import './generators/python.js';
// Java Code Generators - Complete Set
import './generators/java.js'; // Java base generator
import './generators/java/builtins.js'; // Blockly built-in blocks
import './generators/java/blockly_natives.js'; // Blockly native blocks (controls_if, lists_*, etc.)
import './generators/java/text.js'; // Text operations
import './generators/java/math.js'; // Math operations
import './generators/java/logic.js'; // Logic operations
import './generators/java/loops.js'; // Loops
import './generators/java/control.js'; // If/else, switch
import './generators/java/variables.js'; // Variables
import './generators/java/functions.js'; // Functions & methods
import './generators/java/lists.js'; // ArrayList operations
import './generators/java/collections.js'; // HashMap & HashSet
import './generators/java/oop.js'; // Classes, OOP, I/O, error handling
import './generators/java/sorting.js'; // Sorting operations
import './generators/javascript.js'; // JavaScript generator & block definitions
import './modules/initializer.js';

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

  // NEW: Multi-language support
  const [currentLanguage, setCurrentLanguage] = useState('python');

  // NEW: Graceful Workspace Transition Loader state
  const [transitionState, setTransitionState] = useState({
    isVisible: false,
    targetLanguage: 'python',
    customMessage: '',
  });

  // Get the toolbox configuration dynamically based on language (memoized to prevent re-render flickering)
  const toolboxConfig = useMemo(() => getToolboxConfig(currentLanguage), [currentLanguage]);


  // Helper: Generate code in selected language
  const generateCode = (workspace, language) => {
    if (!workspace) return '';
    try {
      switch (language) {
        case 'python':
          return globalThis.Python?.workspaceToCode(workspace) || '';
        case 'java':
          return globalThis.Java ? globalThis.Java.workspaceToCode(workspace) : '';
        case 'javascript':
          return globalThis.JavaScript ? globalThis.JavaScript.workspaceToCode(workspace) : '';
        default:
          return '';
      }
    } catch (error) {
      console.error('Code generation error:', error);
      return `// Error generating ${language} code: ${error.message}`;
    }
  };

  // Helper: Get file extension for current language
  const getFileExtension = (language) => {
    const extensions = { python: 'py', java: 'java', javascript: 'js' };
    return extensions[language] || 'txt';
  };

  // Helper: Get filename (Java requires Main.java)
  const getFileName = (language) => {
    return language === 'java' ? 'Main.java' : `script.${getFileExtension(language)}`;
  };

  const downloadFile = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = getFileName(currentLanguage);
    a.click();
    showToast(`Downloaded ${getFileName(currentLanguage)}`, 'success');
  };

  // Update workspace code and language state when language changes
  useEffect(() => {
    if (mainWorkspace) {
      try {
        window._currentLanguage = currentLanguage;
        const newCode = generateCode(mainWorkspace, currentLanguage);
        setCode(newCode);
      } catch (err) {
        console.error("Error generating code for language:", currentLanguage, err);
      }
    }
  }, [currentLanguage, mainWorkspace]);


  const saveWorkspaceXML = () => {
    if (!mainWorkspace) return;

    // Step 1: Get the XML DOM from workspace
    const xmlDom = globalThis.Blockly.Xml.workspaceToDom(mainWorkspace);

    // Step 2: Create a cleaning function
    const cleanXml = (element) => {
      // Remove xmlns attributes (Blockly namespace)
      if (element.getAttribute) {
        element.removeAttribute('xmlns');           // Remove main namespace
        element.removeAttribute('xmlns:blockly');   // Remove alternate namespace
      }

      // Remove block IDs and position coordinates
      if (element.tagName === 'block') {
        element.removeAttribute('id');   // Remove random IDs
        element.removeAttribute('x');    // Remove X position
        element.removeAttribute('y');    // Remove Y position
      }

      // Remove shadow block IDs
      if (element.tagName === 'shadow') {
        element.removeAttribute('id');   // Remove shadow block IDs
      }

      // Recursively clean all child elements
      Array.from(element.children || []).forEach(child => cleanXml(child));

      return element;
    };

    // Step 3: Clone the DOM (so we don't modify the workspace itself)
    const clonedDom = xmlDom.cloneNode(true);

    // Step 4: Clean the cloned DOM
    const cleanedDom = cleanXml(clonedDom);

    // Step 5: Convert to text
    let xmlText = globalThis.Blockly.Xml.domToPrettyText(cleanedDom);

    // Step 6: Additional string-level cleanup (safety net)
    // This catches any edge cases where the namespace might be re-added
    // Note: We use a simple regex to catch the standard xmlns attribute
    xmlText = xmlText.replace(/\s*xmlns="[^"]*blockly[^"]*"/gi, '');
    xmlText = xmlText.replace(/\s*xmlns="https:\/\/developers\.google\.com\/blockly\/xml"/gi, '');

    // Step 7: Download the cleaned XML
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
            const newCode = generateCode(mainWorkspace, currentLanguage);
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
        const freshCode = generateCode(mainWorkspace, currentLanguage);
        setCode(freshCode);
      } catch (e) {
        console.error('Code generation error after clearing:', e);
      }
    }
  };

  const handleCapture = async () => {
    const success = await captureWorkspaceScreenshot(
      '.blockly-container',
      `code-asthram-${currentLanguage}-workspace.png`,
      ['.code-panel', '.code-execution-modal-overlay']
    );
    if (success) {
      showToast('Workspace screenshot downloaded!', 'success');
    }
  };


  // Gracefully transition between programming environments
  const triggerTransition = (targetLanguage, customMessage, callback) => {
    setTransitionState({
      isVisible: true,
      targetLanguage,
      customMessage,
    });

    // Execute state and workspace transformations at peak of backdrop blur
    setTimeout(() => {
      try {
        callback?.();
      } catch (err) {
        console.error('Transition callback error:', err);
      }
    }, 180);

    // Gracefully dismiss loader
    setTimeout(() => {
      setTransitionState((prev) => ({ ...prev, isVisible: false }));
    }, 560);
  };

  const handleSelectTutorial = (tutorial) => {
    if (!tutorial) return;
    const targetLanguage = tutorial.language || currentLanguage;
    if (targetLanguage !== currentLanguage) {
      triggerTransition(
        targetLanguage,
        `Configuring ${targetLanguage.charAt(0).toUpperCase() + targetLanguage.slice(1)} for "${tutorial.title}"`,
        () => {
          setCurrentLanguage(targetLanguage);
          window._currentLanguage = targetLanguage;
          if (mainWorkspace) {
            try {
              const newToolboxConfig = getToolboxConfig(targetLanguage);
              mainWorkspace.updateToolbox(newToolboxConfig);
            } catch (err) {
              console.error("Error updating toolbox for tutorial language:", err);
            }
          }
          setActiveTutorial(tutorial);
          setShowTutorials(false);
        }
      );
    } else {
      setActiveTutorial(tutorial);
      setShowTutorials(false);
    }
  };

  const handleLoadTemplate = (template) => {
    if (!mainWorkspace || !template) return;

    const targetLanguage = template.language || currentLanguage;
    const isLanguageSwitch = targetLanguage !== currentLanguage;

    const performLoad = () => {
      if (isLanguageSwitch) {
        setCurrentLanguage(targetLanguage);
        window._currentLanguage = targetLanguage;
        try {
          const newToolboxConfig = getToolboxConfig(targetLanguage);
          mainWorkspace.updateToolbox(newToolboxConfig);
        } catch (err) {
          console.error("Error updating toolbox on template load:", err);
        }
      }

      const onFinishedLoading = () => {
        try {
          const newCode = generateCode(mainWorkspace, targetLanguage);
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
        mainWorkspace.removeChangeListener(onFinishedLoading);
      }
    };

    if (isLanguageSwitch) {
      triggerTransition(
        targetLanguage,
        `Loading "${template.title}" (${targetLanguage.toUpperCase()})`,
        performLoad
      );
    } else {
      performLoad();
    }
  };

  // Handler: Language change
  const handleLanguageChange = (newLanguage) => {
    if (newLanguage === currentLanguage) return;

    triggerTransition(
      newLanguage,
      `Switching to ${newLanguage.charAt(0).toUpperCase() + newLanguage.slice(1)} Environment`,
      () => {
        // Reset tutorial state to prevent cross-language mismatch
        setActiveTutorial(null);
        setShowTutorials(false);
        setShowTemplatesModal(false);

        setCurrentLanguage(newLanguage);

        if (mainWorkspace) {
          try {
            // Clear all blocks from previous language to give a fresh workspace
            mainWorkspace.clear();
            if (mainWorkspace.hideChaff) {
              mainWorkspace.hideChaff();
            }
            window._currentLanguage = newLanguage;
            const newToolboxConfig = getToolboxConfig(newLanguage);
            mainWorkspace.updateToolbox(newToolboxConfig);
            const newCode = generateCode(mainWorkspace, newLanguage);
            setCode(newCode);
          } catch (err) {
            console.error("Error changing language workspace:", err);
          }
        }
      }
    );
  };

  // Handler: Fundamentals mode toggle
  const handleToggleFundamentalsMode = () => {
    const newMode = !isFundamentalsMode;
    setIsFundamentalsMode(newMode);

    showToast(
      newMode
        ? 'Fundamentals Mode ON - Showing basic blocks only'
        : 'Fundamentals Mode OFF - All blocks available',
      'info'
    );
  };

  const showToast = (message, type = 'info') => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast({ visible: false, message: '', type: 'info' }), 3000);
  };

  return (
    <>
      <Toolbar
        onSave={saveWorkspaceXML}
        onLoad={loadWorkspaceXML}
        onNew={newWorkspace}
        onCapture={handleCapture}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
        isCollapsed={isCollapsed}
        onToggleTutorials={() => setShowTutorials(!showTutorials)}
        onToggleTemplates={() => setShowTemplatesModal(true)}
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
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
            currentLanguage={currentLanguage}
          />
        </div>
        {FEATURE_FLAGS.feature_tutorials && activeTutorial && (
          <TutorialController
            tutorial={activeTutorial}
            workspace={mainWorkspace}
            onClose={() => setActiveTutorial(null)}
            onExploreMore={() => setShowTutorials(true)}
          />
        )}
        {FEATURE_FLAGS.feature_tutorials && showTutorials && !activeTutorial && (
          <TutorialsList
            tutorials={getTutorialsForLanguage(currentLanguage)}
            onSelectTutorial={handleSelectTutorial}
            onClose={() => setShowTutorials(false)}
            currentLanguage={currentLanguage}
          />
        )}
        {showTemplatesModal && (
          <TemplatesList
            onSelectTemplate={handleLoadTemplate}
            onClose={() => setShowTemplatesModal(false)}
            currentLanguage={currentLanguage}
          />
        )}
        {/* Global Toast Notification */}
        <ToastNotification
          visible={toast.visible}
          message={toast.message}
          type={toast.type || 'info'}
          onClose={() => setToast({ visible: false, message: '', type: 'info' })}
        />
      </div>

      {/* Modern Graceful Language Transition Loader */}
      <WorkspaceTransitionLoader
        isVisible={transitionState.isVisible}
        targetLanguage={transitionState.targetLanguage}
        customMessage={transitionState.customMessage}
      />
    </>
  );
}
