import React, { useEffect, useRef, useState } from 'react';
import Tooltip from './Tooltip';
import {
  FiUpload,
  FiFolderPlus,
  FiFilePlus,
  FiCamera,
  FiEyeOff,
  FiBookOpen,
  FiLogOut,
  FiGrid,
  FiMoon,
  FiSun,
  FiCode,
} from 'react-icons/fi';
import './Toolbar.css';
import fullLogo from '../../CodeAsthram_full_logo.png';
import shortLogo from '../../CodeAsthram_short_logo.png';
import { FEATURE_FLAGS } from '../config';
import { toggleTheme } from '../utils/theme';

export default function Toolbar({
  onSave,
  onLoad,
  onNew,
  onCapture,
  onToggleCollapse,
  isCollapsed,
  onLogout,
  onToggleTutorials,
  onToggleTemplates,
}) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const [themeName, setThemeName] = useState(() => (typeof document !== 'undefined' ? (document.documentElement.getAttribute('data-theme') || 'light') : 'light'));

  const [tooltip, setTooltip] = useState({
    visible: false,
    text: '',
    position: { top: 0, left: 0 },
  });

  const handleMouseEnter = (e, text) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({
      visible: true,
      text,
      position: {
        top: rect.bottom + 10,
        left: rect.left + rect.width / 2,
      },
    });
  };

  const handleMouseLeave = () => {
    setTooltip({ ...tooltip, visible: false });
  };
  // Keep toolbar theme toggle icon in sync with theme changes
  useEffect(() => {
    const syncTheme = () => setThemeName(document.documentElement.getAttribute('data-theme') || 'light');
    window.addEventListener('python-pop-theme-change', syncTheme);
    return () => window.removeEventListener('python-pop-theme-change', syncTheme);
  }, []);

  // Lightweight "alive" background: drifting STEM shapes with soft connections
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      const toolbarEl = canvas.parentElement;
      canvas.width = toolbarEl.clientWidth;
      canvas.height = toolbarEl.clientHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // pointer interactivity for subtle engagement
    const onPointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };
    const onPointerLeave = () => { mouseRef.current.active = false; };
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerleave', onPointerLeave);

    const styles = getComputedStyle(document.documentElement);
    const blue = styles.getPropertyValue('--primary-500').trim() || '#306998';
    const blue2 = styles.getPropertyValue('--primary-600').trim() || '#255580';
    const gold = styles.getPropertyValue('--accent-500').trim() || '#FFD43B';

    const rand = (min, max) => Math.random() * (max - min) + min;
    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const SHAPES = ['circle', 'square', 'triangle', 'hex', 'cross', 'diamond', 'ring', 'pentagon', 'star', 'capsule'];
    const N = 32; // increased presence without clutter
    const nodes = new Array(N).fill(0).map(() => ({
      x: rand(0, canvas.width),
      y: rand(0, canvas.height),
      vx: rand(-0.05, 0.05),
      vy: rand(-0.04, 0.04),
      r: rand(1.0, 3.0),
      hue: Math.random() < 0.65 ? 'blue' : 'gold',
      type: pick(SHAPES),
      a: rand(0, Math.PI * 2),
      va: rand(-0.01, 0.01),
    }));

    let last = 0;
    const draw = (t) => {
      // ~22 FPS for smoother but still light motion
      if (t - last < 45) { animationRef.current = requestAnimationFrame(draw); return; }
      last = t;
      const time = t * 0.001;

      // Adapt to theme changes
      const stylesNow = getComputedStyle(document.documentElement);
      const p500 = stylesNow.getPropertyValue('--primary-500').trim() || blue;
      const p600 = stylesNow.getPropertyValue('--primary-600').trim() || blue2;
      const a500 = stylesNow.getPropertyValue('--accent-500').trim() || gold;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update & draw connections
      const threshold = 140;
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        // gentle wandering + sinusoidal meander (smoother, freer)
        n.vx += rand(-0.0012, 0.0012);
        n.vy += rand(-0.0012, 0.0012);
        n.x += Math.sin(time * 0.6 + n.a) * 0.03;
        n.y += Math.cos(time * 0.4 + n.a) * 0.03;

        // subtle mouse repel to feel interactive
        if (mouseRef.current.active) {
          const dxm = n.x - mouseRef.current.x;
          const dym = n.y - mouseRef.current.y;
          const dm = Math.hypot(dxm, dym) || 1;
          const R = 120;
          if (dm < R) {
            const f = (1 - dm / R) * 0.035;
            n.vx += (dxm / dm) * f;
            n.vy += (dym / dm) * f;
          }
        }

        // clamp velocities
        const vmax = 0.08;
        if (n.vx > vmax) n.vx = vmax; if (n.vx < -vmax) n.vx = -vmax;
        if (n.vy > vmax) n.vy = vmax; if (n.vy < -vmax) n.vy = -vmax;
        n.x += n.vx; n.y += n.vy; n.a += n.va;
        if (n.x < -20) n.x = canvas.width + 20; if (n.x > canvas.width + 20) n.x = -20;
        if (n.y < -20) n.y = canvas.height + 20; if (n.y > canvas.height + 20) n.y = -20;
      }

      // Predominant, clean connections: connect each node to its nearest neighbors (slightly stronger)
      const degree = new Array(nodes.length).fill(0);
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const maxDeg = 4; // allow a few clear connections per node
      const baseAlpha = isDark ? 0.08 : 0.06; // very transparent and mild
      const maxAlpha = isDark ? 0.16 : 0.12;

      for (let i = 0; i < nodes.length; i++) {
        // collect candidates within threshold
        const cand = [];
        for (let j = 0; j < nodes.length; j++) {
          if (i === j) continue;
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < threshold) cand.push({ j, d });
        }
        // sort by distance and pick a few nearest
        cand.sort((c1, c2) => c1.d - c2.d);
        let links = 0;
        for (let k = 0; k < cand.length && links < maxDeg; k++) {
          const j = cand[k].j;
          if (i < j && degree[i] < maxDeg && degree[j] < maxDeg) {
            const a = nodes[i], b = nodes[j];
            const d = cand[k].d;
            const closeness = 1 - d / threshold; // 0..1

            // gradient along the edge using theme tokens
            const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
            const cStart = (a.hue === 'gold' || b.hue === 'gold') ? a500 : p500;
            const cEnd = (a.hue === 'gold' || b.hue === 'gold') ? a500 : p600;
            grad.addColorStop(0, cStart);
            grad.addColorStop(1, cEnd);

            // outer soft stroke (glow)
            ctx.strokeStyle = grad;
            ctx.lineWidth = 1.4;
            ctx.globalAlpha = baseAlpha;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();

            // core stroke stronger based on closeness
            ctx.lineWidth = 0.8;
            ctx.globalAlpha = Math.min(maxAlpha, baseAlpha + closeness * 0.18);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();

            degree[i]++;
            degree[j]++;
            links++;
          }
        }
      }
      ctx.globalAlpha = 1;

      // Nodes (varied STEM shapes)
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const fill = n.hue === 'gold' ? a500 : p500;
        const stroke = n.hue === 'gold' ? a500 : p600;
        ctx.fillStyle = fill;
        ctx.strokeStyle = stroke;

        ctx.save();
        ctx.translate(n.x, n.y);
        ctx.rotate(n.a);
        switch (n.type) {
          case 'circle': {
            ctx.beginPath();
            ctx.arc(0, 0, n.r, 0, Math.PI * 2);
            ctx.globalAlpha = 0.35; ctx.fill();
            break;
          }
          case 'square': {
            const s = n.r * 1.8;
            ctx.beginPath();
            ctx.rect(-s / 2, -s / 2, s, s);
            ctx.globalAlpha = 0.35; ctx.fill();
            break;
          }
          case 'triangle': {
            const s = n.r * 2.2;
            ctx.beginPath();
            ctx.moveTo(0, -s / 1.2);
            ctx.lineTo(s / 1.2, s / 1.2);
            ctx.lineTo(-s / 1.2, s / 1.2);
            ctx.closePath();
            ctx.globalAlpha = 0.35; ctx.fill();
            break;
          }
          case 'hex': {
            const s = n.r * 2.1;
            ctx.beginPath();
            for (let k = 0; k < 6; k++) {
              const ang = (Math.PI / 3) * k;
              const px = Math.cos(ang) * s;
              const py = Math.sin(ang) * s;
              if (k === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
            }
            ctx.closePath();
            ctx.globalAlpha = 0.35; ctx.fill();
            break;
          }
          case 'cross': {
            const s = n.r * 2.0;
            ctx.lineWidth = 1.0;
            ctx.globalAlpha = 0.24;
            ctx.beginPath();
            ctx.moveTo(-s, 0); ctx.lineTo(s, 0);
            ctx.moveTo(0, -s); ctx.lineTo(0, s);
            ctx.stroke();
            break;
          }
          case 'diamond': {
            const s = n.r * 2.0;
            ctx.beginPath();
            ctx.moveTo(0, -s);
            ctx.lineTo(s, 0);
            ctx.lineTo(0, s);
            ctx.lineTo(-s, 0);
            ctx.closePath();
            ctx.globalAlpha = 0.35; ctx.fill();
            break;
          }
          case 'ring': {
            ctx.beginPath();
            ctx.arc(0, 0, n.r * 1.6, 0, Math.PI * 2);
            ctx.lineWidth = 0.9;
            ctx.globalAlpha = 0.22;
            ctx.stroke();
            break;
          }
          case 'pentagon': {
            const s = n.r * 2.0;
            ctx.beginPath();
            for (let k = 0; k < 5; k++) {
              const ang = (Math.PI * 2 / 5) * k - Math.PI / 2;
              const px = Math.cos(ang) * s;
              const py = Math.sin(ang) * s;
              if (k === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
            }
            ctx.closePath();
            ctx.globalAlpha = 0.35; ctx.fill();
            break;
          }
          case 'star': {
            const outer = n.r * 2.2;
            const inner = outer * 0.5;
            ctx.beginPath();
            for (let k = 0; k < 10; k++) {
              const ang = (Math.PI / 5) * k - Math.PI / 2;
              const rad = (k % 2 === 0) ? outer : inner;
              const px = Math.cos(ang) * rad;
              const py = Math.sin(ang) * rad;
              if (k === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
            }
            ctx.closePath();
            ctx.globalAlpha = 0.32; ctx.fill();
            break;
          }
          case 'capsule': {
            const w = n.r * 3.2;
            const h = n.r * 1.6;
            const r = Math.min(h / 2, n.r * 1.0);
            ctx.beginPath();
            ctx.moveTo(-w / 2 + r, -h / 2);
            ctx.lineTo(w / 2 - r, -h / 2);
            ctx.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
            ctx.lineTo(w / 2, h / 2 - r);
            ctx.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
            ctx.lineTo(-w / 2 + r, h / 2);
            ctx.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
            ctx.lineTo(-w / 2, -h / 2 + r);
            ctx.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);
            ctx.closePath();
            ctx.globalAlpha = 0.35; ctx.fill();
            break;
          }
        }
        ctx.restore();

        // very subtle halo
        ctx.globalAlpha = 0.16;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + 3, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      animationRef.current = requestAnimationFrame(draw);
    };
    animationRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerleave', onPointerLeave);
    };
  }, []);


  return (
    <>
      <div className="toolbar" role="toolbar" aria-label="Editor Toolbar">
        <canvas ref={canvasRef} className="toolbar-alive-canvas" aria-hidden="true" />
        <div className="toolbar-left">
          <img src={fullLogo} alt="CodeAsthram Full Logo" className="toolbar-logo-full" />
        </div>
        <div className="toolbar-control-capsule">
          <img src={shortLogo} alt="CodeAsthram Short Logo" className="toolbar-logo-short" />
          <div className="capsule-divider"></div>
          <div className="capsule-button-group">
            <button
              type="button"
              onClick={onNew}
              onMouseEnter={(e) => handleMouseEnter(e, 'Start New Workspace')}
              onMouseLeave={handleMouseLeave}
            >
              <FiFilePlus />
            </button>
            <button
              type="button"
              onClick={onSave}
              onMouseEnter={(e) => handleMouseEnter(e, 'Save Workspace (.xml)')}
              onMouseLeave={handleMouseLeave}
            >
              <FiUpload />
            </button>
            <label
              htmlFor="load-input"
              className="load-label"
              onMouseEnter={(e) => handleMouseEnter(e, 'Load Workspace (.xml)')}
              onMouseLeave={handleMouseLeave}
            >
              <FiFolderPlus />
            </label>
            <input
              id="load-input"
              type="file"
              accept=".xml"
              style={{ display: 'none' }}
              onChange={onLoad}
            />
            <button
              type="button"
              onClick={onCapture}
              onMouseEnter={(e) => handleMouseEnter(e, 'Capture Workspace as PNG')}
              onMouseLeave={handleMouseLeave}
              aria-label="Capture Workspace as PNG"
            >
              <FiCamera />
            </button>
            <button
              type="button"
              onClick={onToggleCollapse}
              onMouseEnter={(e) => handleMouseEnter(e, isCollapsed ? 'Show Code' : 'Hide Code')}
              onMouseLeave={handleMouseLeave}
            >
              {isCollapsed ? <FiCode /> : <FiEyeOff />}
            </button>
            <button
              type="button"
              onClick={onToggleTemplates}
              onMouseEnter={(e) => handleMouseEnter(e, 'Load from Template')}
              onMouseLeave={handleMouseLeave}
              aria-label="Load from Template"
            >
              <FiGrid />
            </button>
            {FEATURE_FLAGS.feature_tutorials && (
              <button
                type="button"
                onClick={onToggleTutorials}
                onMouseEnter={(e) => handleMouseEnter(e, 'Show Tutorials')}
                onMouseLeave={handleMouseLeave}
                aria-label="Show Tutorials"
              >
                <FiBookOpen />
              </button>
            )}
            <button
              id="logout-btn"
              type="button"
              onClick={onLogout}
              onMouseEnter={(e) => handleMouseEnter(e, 'Logout')}
              onMouseLeave={handleMouseLeave}
              aria-label="Logout"
            >
              <FiLogOut />
            </button>
            <button
              type="button"
              onClick={() => { toggleTheme(); }}
              onMouseEnter={(e) => handleMouseEnter(e, 'Toggle Theme')}
              onMouseLeave={handleMouseLeave}
              aria-label="Toggle Theme"
            >
              {themeName === 'dark' ? <FiSun /> : <FiMoon />}
            </button>
          </div>
        </div>
      </div>
      <Tooltip
        text={tooltip.text}
        visible={tooltip.visible}
        position={tooltip.position}
      />
    </>
  );
}
