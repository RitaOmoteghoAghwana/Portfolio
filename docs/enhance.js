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
