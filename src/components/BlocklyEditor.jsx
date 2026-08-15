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

  // --- Smooth 0.8s Disappearance Transition for Flyout Blocks across All Modules/Languages ---
  if (Blockly && Blockly.Flyout && Blockly.Flyout.prototype) {
    const flyoutProto = Blockly.Flyout.prototype;
    if (!flyoutProto._smoothHideInstalled) {
      flyoutProto._smoothHideInstalled = true;
      const origShow = flyoutProto.show;
      const origHide = flyoutProto.hide;

      flyoutProto.show = function(...args) {
        if (this._smoothHideTimeout) {
          clearTimeout(this._smoothHideTimeout);
          this._smoothHideTimeout = null;
        }
        const svgGroup = this.getSvgRoot ? this.getSvgRoot() : (this.svgGroup_ || this.container_);
        if (svgGroup) {
          svgGroup.classList.remove('flyout-smooth-hiding');
          svgGroup.style.opacity = '1';
          svgGroup.style.transform = 'none';
          svgGroup.style.pointerEvents = 'auto';
        }
        return origShow.apply(this, args);
      };

      flyoutProto.hide = function() {
        const svgGroup = this.getSvgRoot ? this.getSvgRoot() : (this.svgGroup_ || this.container_);
        if (!svgGroup || !this.isVisible()) {
          return origHide.call(this);
        }

        if (this._smoothHideTimeout) {
          clearTimeout(this._smoothHideTimeout);
        }

        svgGroup.classList.add('flyout-smooth-hiding');

        this._smoothHideTimeout = setTimeout(() => {
          try {
            origHide.call(this);
          } catch (e) {
            // Non-fatal
          }
          if (svgGroup) {
            svgGroup.classList.remove('flyout-smooth-hiding');
            svgGroup.style.opacity = '';
            svgGroup.style.transform = '';
            svgGroup.style.pointerEvents = '';
          }
          this._smoothHideTimeout = null;
        }, 800);
      };
    }
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

export default function BlocklyEditor({ toolboxConfig, onCodeChange, onWorkspaceCreated }) {
  const blocklyDiv = useRef(null);
  const workspaceRef = useRef(null);

  useEffect(() => {
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

    // --- Icon Injection with MutationObserver ---
    let iconObserver = null;
    const setupIconInjection = () => {
      const toolboxDiv = document.querySelector('.blocklyToolboxDiv');
      if (toolboxDiv) {
        injectCategoryIcons(iconMap); // Initial injection
        // Re-inject icons if the toolbox is re-rendered by Blockly
        iconObserver = new MutationObserver(() => injectCategoryIcons(iconMap));
        iconObserver.observe(toolboxDiv, { childList: true, subtree: true });
      }
    };
    // A short delay to ensure the toolbox DOM is fully rendered before injecting
    const injectionTimeout = setTimeout(setupIconInjection, 100);

    // --- Real-time instant code generation ---
    let codeTimer = null;
    const generateCode = (event) => {
      if (event && (event.type === Blockly.Events.VIEWPORT_CHANGE || event.type === Blockly.Events.SELECTED)) {
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
      clearTimeout(injectionTimeout);
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

  // Update toolbox dynamically when toolboxConfig changes (e.g. language change)
  useEffect(() => {
    if (workspaceRef.current && toolboxConfig) {
      try {
        workspaceRef.current.updateToolbox(toolboxConfig);
        setTimeout(() => injectCategoryIcons(iconMap), 50);
      } catch (err) {
        console.error("Error updating Blockly toolbox:", err);
      }
    }
  }, [toolboxConfig]); // Empty dependency array ensures this runs only once on mount

  return <div ref={blocklyDiv} className="blockly-container" />;
}
