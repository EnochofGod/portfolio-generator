import { useEffect } from 'react';

const GlobalScriptsAndStyles = () => {
  useEffect(() => {
    const injectElement = (id, element) => {
      const existing = document.getElementById(id);
      if (existing) existing.remove();
      element.id = id;
      document.head.appendChild(element);
    };

    // 1) Google Inter font
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
    fontLink.rel = 'stylesheet';
    injectElement('inter-font', fontLink);

    // 2) Tailwind config (inject BEFORE the CDN so the CDN picks it up on load)
    const config = {
      theme: {
        extend: {
          fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
          animation: { 
            gradient: 'gradient 8s linear infinite', 
            shine: 'shine 1.5s infinite', 
            'pulse-slow': 'pulse 3s infinite'
          },
          keyframes: {
            gradient: { 
              '0%, 100%': { 'background-size': '200% 200%', 'background-position': 'left center' }, 
              '50%': { 'background-size': '200% 200%', 'background-position': 'right center' } 
            },
            shine: { 
              '0%': { 'background-position': '-200% center' }, 
              '100%': { 'background-position': '200% center' } 
            },
          },
          colors: { 
            modern: { primary: '#0891b2', secondary: '#164e63', accent: '#06b6d4' }, 
            minimal: { primary: '#2563eb', secondary: '#1e40af', accent: '#3b82f6' } 
          }
        },
      },
    };

    const cfgScript = document.createElement('script');
    cfgScript.textContent = 'window.tailwind = window.tailwind || {}; window.tailwind.config = ' + JSON.stringify(config) + ';';
    injectElement('tailwind-config', cfgScript);

    // 3) Tailwind CDN script
    const tailwindScript = document.createElement('script');
    tailwindScript.src = 'https://cdn.tailwindcss.com';
    injectElement('tailwind-cdn', tailwindScript);

    // 4) Print-focused CSS
    const printStyles = document.createElement('style');
    printStyles.textContent = `
      @media print {
        @page { margin: 1.5cm; }
        body { print-color-adjust: exact; -webkit-print-color-adjust: exact; margin: 0 !important; }
        nav, button, header, footer { display: none !important; }
        main { padding: 0 !important; }
        section, article, div { page-break-inside: avoid; }
      }
    `;
    injectElement('print-styles', printStyles);

    // 5) Minimal base styles (improved)
    const baseStyles = document.createElement('style');
    baseStyles.textContent = `
      :root {
        --bg-00: #0f172a;
        --bg-10: #0b1220;
        --card: rgba(255,255,255,0.04);
        --muted: #9ca3af;
        --accent: #06b6d4;
        --accent-2: #0891b2;
      }
      html, body { overflow-x: hidden; }
      body { margin: 0; font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; -webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale; }
      .app-container { min-height: 100vh; -webkit-font-smoothing:antialiased; }
      /* small utility for smoother shadows used by components */
      .soft-shadow { box-shadow: 0 6px 24px rgba(2,6,23,0.08); }
    `;
    injectElement('base-styles', baseStyles);

    // Cleanup
    return () => {
      ['inter-font', 'tailwind-cdn', 'tailwind-config', 'print-styles', 'base-styles'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.remove();
      });
    };
  }, []);

  return null;
};

export default GlobalScriptsAndStyles;
