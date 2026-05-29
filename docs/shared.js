// Shared utilities: scroll reveal, nav active state, tweaks
(function () {
  // Highlight active nav link
  const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href').toLowerCase();
    if (href === path || (path === '' && href === 'index.html')) a.classList.add('active');
  });

  // Reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => io.observe(el));

  // Tweaks
  const TWEAKS = /*EDITMODE-BEGIN*/{
    "accent": "#c4632a",
    "displayFont": "Instrument Serif",
    "darkMode": false
  }/*EDITMODE-END*/;

  const applyTweaks = (t) => {
    document.documentElement.style.setProperty('--accent', t.accent);
    document.documentElement.style.setProperty('--font-display', `"${t.displayFont}", Georgia, serif`);
    if (t.darkMode) {
      document.documentElement.style.setProperty('--bg', '#1a1816');
      document.documentElement.style.setProperty('--bg-2', '#252320');
      document.documentElement.style.setProperty('--bg-3', '#2f2c28');
      document.documentElement.style.setProperty('--ink', '#f0ebe0');
      document.documentElement.style.setProperty('--ink-2', '#cfc8b8');
      document.documentElement.style.setProperty('--ink-3', '#9a9286');
      document.documentElement.style.setProperty('--line', '#3a3631');
    } else {
      document.documentElement.style.removeProperty('--bg');
      document.documentElement.style.removeProperty('--bg-2');
      document.documentElement.style.removeProperty('--bg-3');
      document.documentElement.style.removeProperty('--ink');
      document.documentElement.style.removeProperty('--ink-2');
      document.documentElement.style.removeProperty('--ink-3');
      document.documentElement.style.removeProperty('--line');
    }
  };

  // Read from localStorage first (cross-page sync)
  let current = { ...TWEAKS };
  try {
    const saved = JSON.parse(localStorage.getItem('rita-tweaks') || 'null');
    if (saved) current = { ...current, ...saved };
  } catch (e) {}
  applyTweaks(current);

  // Tweaks panel (built inline)
  let panelOpen = false;
  let panel = null;

  function buildPanel() {
    panel = document.createElement('div');
    panel.id = 'tweaks-panel';
    panel.innerHTML = `
      <style>
        #tweaks-panel {
          position: fixed; bottom: 20px; right: 20px; z-index: 1000;
          width: 280px;
          background: var(--bg);
          border: 1px solid var(--line);
          border-radius: 8px;
          padding: 16px;
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--ink);
          box-shadow: 0 20px 50px -10px rgba(0,0,0,.18);
          display: none;
        }
        #tweaks-panel.open { display: block; }
        #tweaks-panel h5 {
          font-family: var(--font-mono);
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: var(--ink-3);
          margin-bottom: 12px;
          font-weight: 500;
          display: flex; justify-content: space-between; align-items: center;
        }
        #tweaks-panel .close-x {
          width: 22px; height: 22px; border-radius: 50%;
          border: 1px solid var(--line);
          background: transparent; cursor: pointer;
          display: grid; place-items: center;
          font-size: 14px; color: var(--ink-2);
        }
        #tweaks-panel .close-x:hover { background: var(--ink); color: var(--bg); }
        #tweaks-panel .group { margin-bottom: 18px; }
        #tweaks-panel .label {
          font-size: 10px; text-transform: uppercase; letter-spacing: 0.14em;
          color: var(--ink-3); margin-bottom: 8px;
        }
        #tweaks-panel .swatches { display: flex; gap: 8px; }
        #tweaks-panel .swatch {
          width: 28px; height: 28px; border-radius: 50%;
          border: 2px solid transparent; cursor: pointer;
          transition: transform .15s;
        }
        #tweaks-panel .swatch:hover { transform: scale(1.1); }
        #tweaks-panel .swatch.active { border-color: var(--ink); }
        #tweaks-panel .fonts { display: flex; flex-direction: column; gap: 6px; }
        #tweaks-panel .font-opt {
          padding: 8px 10px; border: 1px solid var(--line); border-radius: 4px;
          cursor: pointer; font-size: 13px; background: transparent;
          color: var(--ink); text-align: left;
        }
        #tweaks-panel .font-opt.active { background: var(--ink); color: var(--bg); border-color: var(--ink); }
        #tweaks-panel .toggle {
          display: flex; justify-content: space-between; align-items: center;
          padding: 8px 10px; border: 1px solid var(--line); border-radius: 4px;
          cursor: pointer; user-select: none;
        }
        #tweaks-panel .toggle .track {
          width: 32px; height: 18px; background: var(--line); border-radius: 99px;
          position: relative; transition: background .2s;
        }
        #tweaks-panel .toggle .track::after {
          content: ""; position: absolute; top: 2px; left: 2px;
          width: 14px; height: 14px; border-radius: 50%; background: var(--bg);
          transition: transform .2s;
        }
        #tweaks-panel .toggle.on .track { background: var(--accent); }
        #tweaks-panel .toggle.on .track::after { transform: translateX(14px); }
      </style>
      <h5>
        <span>Tweaks</span>
        <button class="close-x" data-close>×</button>
      </h5>
      <div class="group">
        <div class="label">Accent color</div>
        <div class="swatches" data-swatches>
          <div class="swatch" data-color="#c4632a" style="background:#c4632a"></div>
          <div class="swatch" data-color="#2a6fdb" style="background:#2a6fdb"></div>
          <div class="swatch" data-color="#1f8a5b" style="background:#1f8a5b"></div>
          <div class="swatch" data-color="#7c5cff" style="background:#7c5cff"></div>
          <div class="swatch" data-color="#b08a3e" style="background:#b08a3e"></div>
        </div>
      </div>
      <div class="group">
        <div class="label">Display font</div>
        <div class="fonts" data-fonts>
          <button class="font-opt" data-font="Instrument Serif" style="font-family:'Instrument Serif',serif;font-style:italic">Instrument Serif</button>
          <button class="font-opt" data-font="DM Serif Display" style="font-family:'DM Serif Display',serif">DM Serif Display</button>
          <button class="font-opt" data-font="Cormorant Garamond" style="font-family:'Cormorant Garamond',serif;font-style:italic">Cormorant Garamond</button>
          <button class="font-opt" data-font="Playfair Display" style="font-family:'Playfair Display',serif">Playfair Display</button>
        </div>
      </div>
      <div class="group">
        <div class="label">Theme</div>
        <div class="toggle" data-toggle><span>Dark mode</span><span class="track"></span></div>
      </div>
    `;
    document.body.appendChild(panel);

    panel.querySelector('[data-close]').addEventListener('click', () => {
      panel.classList.remove('open');
      panelOpen = false;
      try { window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*'); } catch (e) {}
    });

    panel.querySelectorAll('[data-swatches] .swatch').forEach(sw => {
      sw.addEventListener('click', () => setTweak('accent', sw.dataset.color));
    });

    panel.querySelectorAll('[data-fonts] .font-opt').forEach(f => {
      f.addEventListener('click', () => setTweak('displayFont', f.dataset.font));
    });

    panel.querySelector('[data-toggle]').addEventListener('click', () => {
      setTweak('darkMode', !current.darkMode);
    });

    refreshPanelState();
  }

  function refreshPanelState() {
    if (!panel) return;
    panel.querySelectorAll('[data-swatches] .swatch').forEach(s => {
      s.classList.toggle('active', s.dataset.color === current.accent);
    });
    panel.querySelectorAll('[data-fonts] .font-opt').forEach(f => {
      f.classList.toggle('active', f.dataset.font === current.displayFont);
    });
    panel.querySelector('[data-toggle]').classList.toggle('on', !!current.darkMode);
  }

  function setTweak(key, value) {
    current = { ...current, [key]: value };
    applyTweaks(current);
    refreshPanelState();
    try { localStorage.setItem('rita-tweaks', JSON.stringify(current)); } catch (e) {}
    try { window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [key]: value } }, '*'); } catch (e) {}
  }

  window.addEventListener('message', (e) => {
    if (!e.data || typeof e.data !== 'object') return;
    if (e.data.type === '__activate_edit_mode') {
      if (!panel) buildPanel();
      panel.classList.add('open');
      panelOpen = true;
    } else if (e.data.type === '__deactivate_edit_mode') {
      if (panel) panel.classList.remove('open');
      panelOpen = false;
    }
  });

  try { window.parent.postMessage({ type: '__edit_mode_available' }, '*'); } catch (e) {}
})();
