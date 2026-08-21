// src/components/BlocklyEditor.jsx
import React, { useEffect, useRef } from "react";
import * as Blockly from "blockly/core";

// Compatibility shims for Blockly v12 deprecations
// Plugins or older code may call the deprecated Workspace methods
// getVariable, getVariableById, and getAllVariables. Replace them with
// thin wrappers that delegate to the new getVariableMap() API so we don't
// see deprecation warnings at runtime.
try {
  const wsProto = Blockly && Blockly.Workspace && Blockly.Workspace.prototype;
  if (wsProto && wsProto.getVariableMap) {
    // Always replace with wrappers to avoid core deprecation warnings.
    wsProto.getVariable = function(name, type) {
      // getVariable(name) historically returned a Variable by name/type.
      // The new API exposes the VariableMap; delegate accordingly.
      return this.getVariableMap().getVariable(name, type);
    };

    wsProto.getVariableById = function(id) {
      return this.getVariableMap().getVariableById(id);
    };

    wsProto.getAllVariables = function() {
      return this.getVariableMap().getAllVariables();
    };
  }


} catch (e) {
  // Non-fatal: if the shape of Blockly is unexpected, don't block initialization.
  // eslint-disable-next-line no-console
  console.debug('Unable to install Blockly Workspace variable shims:', e && e.message ? e.message : e);
}
import "blockly/blocks";
import "blockly/javascript";
import '../generators/python.js';
import * as En from "blockly/msg/en";
Blockly.setLocale(En);

// Custom Theme
import { getGlassHorizonTheme } from '../themes/glassHorizonTheme.js';

import { injectCategoryIcons } from "../utils/toolboxIconInjector.js";
import iconMap from "../assets/iconMap.js";

// Plugins
import { WorkspaceSearch } from "@blockly/plugin-workspace-search";
import { ZoomToFitControl } from "@blockly/zoom-to-fit";
import { Backpack } from "@blockly/workspace-backpack";
import '@blockly/toolbox-search';
import '../plugins/custom-toolbox/CustomCollapsibleCategory.js';

function BlocklyEditor({ toolboxConfig, onCodeChange, onWorkspaceCreated }) {
  const blocklyDiv = useRef(null);
  const workspaceRef = useRef(null);
  const prevConfigRef = useRef(null);

  useEffect(() => {
    // Slim scrollbars: set thickness BEFORE inject so Blockly allocates
    // only 6px of layout space for scrollbar zones (default is 15px).
    // scrollbarThickness is a static property on the Scrollbar class, NOT
    // an inject option — this is the correct Blockly v12 API.
    if (Blockly.Scrollbar) {
      Blockly.Scrollbar.scrollbarThickness = 6;
    }

    // Build a theme snapshot from current CSS variables BEFORE injecting Blockly,
    // so initial workspace colors match the active app theme.
    const initialTheme = getGlassHorizonTheme();
    const workspace = Blockly.inject(blocklyDiv.current, {
      toolbox: toolboxConfig,
      trashcan: true,
      scrollbars: true,
      renderer: "geras",
      theme: initialTheme,
      zoom: { controls: true, wheel: true, startScale: 0.8 },
      media: '/media/',
    });
    workspaceRef.current = workspace;
    prevConfigRef.current = toolboxConfig;

    if (onWorkspaceCreated) {
      onWorkspaceCreated(workspace);
    }

    // --- Plugins ---
    const workspaceSearch = new WorkspaceSearch(workspace);
    workspaceSearch.init();
    workspaceSearch.setVisible(false);
    window._blocklySearch = workspaceSearch;

    const ztf = new ZoomToFitControl(workspace);
    ztf.init();

    const backpack = new Backpack(workspace);
    backpack.init({
      flyout_css_class: 'backpack-flyout'
    });

    // --- Icon Injection with MutationObserver & Staged Retries ---
    let iconObserver = null;
    let isInjecting = false;

    const performIconInjection = () => {
      if (isInjecting) return;
      isInjecting = true;
      try {
        injectCategoryIcons(iconMap);
      } catch (err) {
        // Non-fatal
      } finally {
        setTimeout(() => { isInjecting = false; }, 30);
      }
    };

    // Perform immediate injection and staged retries to guarantee initial load icons
    performIconInjection();
    const t0 = setTimeout(performIconInjection, 30);
    const t1 = setTimeout(performIconInjection, 100);
    const t2 = setTimeout(performIconInjection, 300);
    const t3 = setTimeout(performIconInjection, 600);

    const setupObserver = () => {
      const targetDiv = document.querySelector('.blocklyToolboxDiv') || blocklyDiv.current;
      if (targetDiv && !iconObserver) {
        performIconInjection();
        iconObserver = new MutationObserver(() => performIconInjection());
        iconObserver.observe(targetDiv, { childList: true, subtree: true });
      }
    };
    setupObserver();
    const t4 = setTimeout(setupObserver, 150);

    // --- Real-time instant code generation ---
    let codeTimer = null;
    const generateCode = (event) => {
      if (event && (
        event.type === Blockly.Events.VIEWPORT_CHANGE ||
        event.type === Blockly.Events.SELECTED ||
        event.type === Blockly.Events.BLOCK_DRAG ||
        event.isStart
      )) {
        return;
      }
      clearTimeout(codeTimer);
      codeTimer = setTimeout(() => {
        try {
          const lang = window._currentLanguage || 'python';
          let generator = globalThis.Python;
          if (lang === 'java' && globalThis.Java) {
            generator = globalThis.Java;
          } else if (lang === 'javascript' && globalThis.JavaScript) {
            generator = globalThis.JavaScript;
          }
          const code = generator ? generator.workspaceToCode(workspace) : '';
          onCodeChange?.(code);
        } catch (err) {
          console.error("Code generation error:", err);
        }
      }, 50);
    };
    workspace.addChangeListener(generateCode);
    generateCode();

    // --- Layout ---
    const onResize = () => Blockly.svgResize(workspace);
    window.addEventListener("resize", onResize);
    onResize();

    const onThemeChange = () => {
      // Regenerate theme from current CSS variables and apply
      const fresh = getGlassHorizonTheme();
      workspace.setTheme(fresh);
    };
    window.addEventListener('python-pop-theme-change', onThemeChange);

    return () => {
      // Cleanup all resources
      clearTimeout(codeTimer);
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      iconObserver?.disconnect();
      window.removeEventListener("resize", onResize);
      workspaceSearch?.dispose?.();
      ztf?.dispose?.();
      backpack?.dispose?.();
      workspace.removeChangeListener(generateCode);
      workspace.dispose();
      workspaceRef.current = null;
      window.removeEventListener('python-pop-theme-change', onThemeChange);
    };
  }, []);

  // Update toolbox dynamically ONLY when toolboxConfig reference actually changes
  useEffect(() => {
    if (workspaceRef.current && toolboxConfig && prevConfigRef.current !== toolboxConfig) {
      prevConfigRef.current = toolboxConfig;
      try {
        workspaceRef.current.updateToolbox(toolboxConfig);
        setTimeout(() => injectCategoryIcons(iconMap), 50);
      } catch (err) {
        console.error("Error updating Blockly toolbox:", err);
      }
    }
  }, [toolboxConfig]);

  return <div ref={blocklyDiv} className="blockly-container" />;
}

export default React.memo(BlocklyEditor);
