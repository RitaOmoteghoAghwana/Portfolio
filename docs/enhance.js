// === SEO HELPER ===
// Adds JSON-LD Person schema once (shared across all pages)
(function injectSchema() {
  if (document.getElementById('rita-schema')) return;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Rita Omotegho Aghwana",
    "url": "https://omotegho.com",
    "image": "https://omotegho.com/assets/rita-portrait.jpg",
    "jobTitle": "WordPress Designer & Visual Content Creator",
    "description": "Rita Omotegho Aghwana — WordPress web designer, AI music video creator, and UGC content specialist with 5+ years of experience.",
    "email": "mailto:Ritaomoteghoo@gmail.com",
    "sameAs": [
      "https://www.linkedin.com/in/rita-omotegho-aghwana-9193bb386/",
      "https://Fiverr.com/Omotegho",
      "https://www.instagram.com/omotegho",
      "https://www.tiktok.com/@omotegho",
      "https://x.com/DesignzPixel"
    ],
    "knowsAbout": ["WordPress", "Web Design", "Elementor", "WooCommerce", "AI Music Video", "UGC Content", "Content Creation"],
    "address": { "@type": "PostalAddress", "addressLocality": "Lagos", "addressCountry": "NG" }
  };
  const s = document.createElement('script');
  s.type = 'application/ld+json';
  s.id = 'rita-schema';
  s.textContent = JSON.stringify(schema);
  document.head.appendChild(s);
})();

// === PROFESSIONAL MICRO-ANIMATIONS ===
(function animations() {
  // 1. Custom cursor dot — subtle, follows links/buttons with magnetism
  if (window.matchMedia('(pointer: fine)').matches) {
    const dot = document.createElement('div');
    dot.id = 'cursor-dot';
    dot.style.cssText = `
      position: fixed; top: 0; left: 0;
      width: 8px; height: 8px;
      background: var(--accent);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      mix-blend-mode: multiply;
      transition: transform .25s cubic-bezier(.16,1,.3,1), width .25s, height .25s, opacity .25s;
      transform: translate(-50%, -50%);
      opacity: 0;
    `;
    document.body.appendChild(dot);

    let tx = 0, ty = 0, cx = 0, cy = 0;
    document.addEventListener('mousemove', (e) => {
      tx = e.clientX; ty = e.clientY;
      dot.style.opacity = '1';
    });
    document.addEventListener('mouseleave', () => { dot.style.opacity = '0'; });

    function raf() {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      dot.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      requestAnimationFrame(raf);
    }
    raf();

    // Grow on interactive elements
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest('a, button, .work-card, .svc, .pkg, .testi-card, .principle, .tool, .deliverable, summary, .chip, .slot, .swatch, .budget-opt')) {
        dot.style.width = '36px';
        dot.style.height = '36px';
        dot.style.background = 'var(--ink)';
        dot.style.opacity = '0.15';
      }
    });
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest('a, button, .work-card, .svc, .pkg, .testi-card, .principle, .tool, .deliverable, summary, .chip, .slot, .swatch, .budget-opt')) {
        dot.style.width = '8px';
        dot.style.height = '8px';
        dot.style.background = 'var(--accent)';
        dot.style.opacity = '1';
      }
    });
  }

  // 2. Smooth page-enter fade — quick, triggered on DOMContentLoaded (not load)
  // Skip if page is already interactive
  if (document.readyState === 'loading') {
    document.documentElement.style.opacity = '0';
    document.documentElement.style.transition = 'opacity .35s cubic-bezier(.16,1,.3,1)';
    document.addEventListener('DOMContentLoaded', () => {
      requestAnimationFrame(() => { document.documentElement.style.opacity = '1'; });
    });
    // hard safety
    setTimeout(() => { document.documentElement.style.opacity = '1'; }, 600);
  }

  // 3. Nav micro-hide on scroll down, reveal on scroll up
  const nav = document.querySelector('.nav');
  if (nav) {
    let lastY = window.scrollY;
    let ticking = false;
    nav.style.transition = 'transform .35s cubic-bezier(.16,1,.3,1)';
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y > 200 && y > lastY) {
          nav.style.transform = 'translateY(-100%)';
        } else {
          nav.style.transform = '';
        }
        lastY = y;
        ticking = false;
      });
    });
  }

  // 4. Magnetic effect on primary CTA buttons (subtle)
  document.querySelectorAll('.btn-primary, .btn-accent, .nav-cta').forEach(btn => {
    btn.style.willChange = 'transform';
    btn.addEventListener('mousemove', (e) => {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.15;
      const y = (e.clientY - r.top - r.height / 2) * 0.25;
      btn.style.transform = `translate(${x}px, ${y}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
})();

// === CONTACT PLATFORM PICKER ===
(function platformPicker() {
  const PLATFORMS = [
    {
      label: 'LinkedIn',
      note: 'Send a connection request or message',
      href: 'https://www.linkedin.com/in/rita-omotegho-aghwana-9193bb386/',
      color: '#0077b5',
      icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
      external: true
    },
    {
      label: 'X (Twitter)',
      note: 'DM me on X',
      href: 'https://x.com/DesignzPixel',
      color: '#111',
      icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.741l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
      external: true
    },
    {
      label: 'Fiverr',
      note: 'Order directly on Fiverr',
      href: 'https://www.fiverr.com/s/e6ZDz7E',
      color: '#1dbf73',
      icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16.25 16.25v-7.5A2.752 2.752 0 0 0 13.5 6H10v1.5h3.5a1.25 1.25 0 0 1 1.25 1.25v7.5h-2.5V12H10.75v4.25H9.25V9.5H7.75v6.75A2 2 0 0 0 9.75 18.25h6.5A2 2 0 0 0 18.25 16.25v-1.5h-2v1.5zM6.5 8.25a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5z"/></svg>',
      external: true
    },
    {
      label: 'Email',
      note: 'Send a direct email',
      href: 'mailto:Ritaomoteghoo@gmail.com',
      color: '#c4632a',
      icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
      external: false
    }
  ];

  const overlay = document.createElement('div');
  overlay.id = 'cp-overlay';
  overlay.innerHTML = `<style>
    #cp-overlay{position:fixed;inset:0;z-index:9998;background:rgba(10,17,40,.5);backdrop-filter:blur(5px);display:flex;align-items:center;justify-content:center;padding:20px;opacity:0;pointer-events:none;transition:opacity .25s}
    #cp-overlay.cp-open{opacity:1;pointer-events:all}
    .cp-box{background:var(--bg);border:1px solid var(--line);border-radius:18px;padding:28px;max-width:400px;width:100%;box-shadow:0 28px 60px rgba(0,0,0,.18);transform:translateY(16px) scale(.97);transition:transform .3s cubic-bezier(.16,1,.3,1)}
    #cp-overlay.cp-open .cp-box{transform:none}
    .cp-head{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:6px}
    .cp-title{font-family:var(--font-display);font-size:21px;font-weight:700;color:var(--ink);line-height:1.15}
    .cp-sub{font-size:13px;color:var(--ink-3);margin-bottom:20px;margin-top:4px}
    .cp-close{width:28px;height:28px;border-radius:50%;border:1px solid var(--line);background:transparent;cursor:pointer;display:grid;place-items:center;font-size:16px;color:var(--ink-2);transition:background .2s;flex-shrink:0;line-height:1}
    .cp-close:hover{background:var(--bg-2)}
    .cp-options{display:flex;flex-direction:column;gap:9px}
    .cp-opt{display:flex;align-items:center;gap:13px;padding:13px 16px;border:1px solid var(--line);border-radius:10px;text-decoration:none;color:var(--ink);background:var(--bg);transition:background .2s,border-color .2s,transform .2s;cursor:pointer}
    .cp-opt:hover{background:var(--bg-2);border-color:var(--accent);transform:translateX(5px)}
    .cp-icon{width:38px;height:38px;border-radius:8px;display:grid;place-items:center;flex-shrink:0;color:#fff}
    .cp-text{flex:1}
    .cp-name{font-weight:600;font-size:15px;line-height:1.2;color:var(--ink)}
    .cp-note{font-size:12px;color:var(--ink-3);margin-top:2px}
    .cp-arr{font-size:16px;color:var(--ink-3);transition:transform .2s,color .2s}
    .cp-opt:hover .cp-arr{transform:translateX(4px);color:var(--accent)}
  </style>
  <div class="cp-box">
    <div class="cp-head">
      <div class="cp-title">How would you like<br>to reach me?</div>
      <button class="cp-close" id="cpClose">×</button>
    </div>
    <p class="cp-sub">Pick the platform that works best for you.</p>
    <div class="cp-options">
      ${PLATFORMS.map(p => `<a href="${p.href}" class="cp-opt"${p.external ? ' target="_blank" rel="noopener"' : ''}>
        <div class="cp-icon" style="background:${p.color}">${p.icon}</div>
        <div class="cp-text"><div class="cp-name">${p.label}</div><div class="cp-note">${p.note}</div></div>
        <span class="cp-arr">→</span>
      </a>`).join('')}
    </div>
  </div>`;

  document.body.appendChild(overlay);

  const open = () => overlay.classList.add('cp-open');
  const close = () => overlay.classList.remove('cp-open');

  document.getElementById('cpClose').addEventListener('click', close);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

  // Intercept "Book this / Book now" buttons in page body (not nav/footer)
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('a.btn').forEach(function (btn) {
      if ((btn.getAttribute('href') || '') === 'contact.html' && !btn.closest('.nav') && !btn.closest('.mobile-nav') && !btn.closest('.footer')) {
        btn.addEventListener('click', function (e) {
          e.preventDefault();
          open();
        });
      }
    });
  });
})();
