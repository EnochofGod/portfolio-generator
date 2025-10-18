import { useEffect } from 'react';

const GlobalScriptsAndStyles = () => {
  useEffect(() => {
    const injectElement = (id, element) => {
      if (!document.getElementById(id)) {
        element.id = id;
        document.head.appendChild(element);
      }
    };

    // Add Tailwind CSS CDN
    const script = document.createElement('script');
    script.src = 'https://cdn.tailwindcss.com';
    injectElement('tailwind-cdn', script);

    // Add Tailwind Config
    const configScript = document.createElement('script');
    configScript.textContent = `
      tailwind.config = {
        theme: {
          extend: {
            fontFamily: {
              sans: ['Inter', 'sans-serif'],
            },
            animation: {
              'gradient': 'gradient 8s linear infinite',
              'shine': 'shine 1.5s infinite',
              'pulse-slow': 'pulse 3s infinite',
            },
            keyframes: {
              gradient: {
                '0%, 100%': {
                  'background-size': '200% 200%',
                  'background-position': 'left center'
                },
                '50%': {
                  'background-size': '200% 200%',
                  'background-position': 'right center'
                }
              },
              shine: {
                '0%': { 'background-position': '-200% center' },
                '100%': { 'background-position': '200% center' }
              }
            },
            colors: {
              modern: {
                primary: '#0891b2',
                secondary: '#164e63',
                accent: '#06b6d4'
              },
              minimal: {
                primary: '#2563eb',
                secondary: '#1e40af',
                accent: '#3b82f6'
              }
            }
          },
        },
      }
    `;
    injectElement('tailwind-config', configScript);

    // Add Google Fonts
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
    injectElement('google-fonts', link);

    // Add base styles
    const style = document.createElement('style');
    style.textContent = `
      body {
        margin: 0;
        font-family: 'Inter', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
    `;
    injectElement('base-styles', style);
  }, []);

  return null;
};

export default GlobalScriptsAndStyles;
