export const getInitialsLogo = (fullName) => {
  const parts = (fullName || '').trim().split(' ').filter(Boolean);
  if (parts.length === 0) return '';
  const firstInitial = parts[0][0] || '';
  const lastInitial = parts.length > 1 ? parts[parts.length - 1][0] : '';
  return `${firstInitial}${lastInitial}`.toUpperCase();
};

const generateStaticHtml = (data) => {
  const { personal = {}, experience = [], projects = [], template, skills = { technical: [], soft: [], certifications: [] } } = data || {};
  
  // Ensure template is explicitly set and valid
  if (!template || (template !== 'modern' && template !== 'classic')) {
    throw new Error('Template must be explicitly set to either "modern" or "classic"');
  }
  
  // Define shared constants
  const MAX_EMBED_BYTES = 300 * 1024; // 300 KB - don't embed data URLs larger than this

  let cvButtonHtml = '';
  if (personal.cvFile) {
    // If CV data is a data URL and is very large, don't embed it directly into generated HTML to avoid huge file sizes
    if (personal.cvFileSize && personal.cvFileSize > MAX_EMBED_BYTES) {
      cvButtonHtml = `<p class="text-sm">CV omitted from export (file too large).</p>`;
    } else {
      cvButtonHtml = `<a href="${personal.cvFile}" download="${personal.cvFileName || 'resume.pdf'}" class="cv-button">Download Full CV</a>`;
    }
  }

  const renderModernTemplate = () => `
    <div class="modern-template transition-colors duration-300" data-theme="dark">
      <style>
        .modern-template[data-theme="dark"] {
          background-color: #111827;
          color: #e5e7eb;
        }
        .modern-template[data-theme="light"] {
          background-color: #f3f4f6;
          color: #1f2937;
        }
        .modern-template {
          min-height: 100vh;
          padding: 1rem;
          font-family: 'Inter', sans-serif;
          overflow-x: hidden;
        }
        @media (min-width: 640px) {
          .modern-template {
            padding: 1.5rem;
          }
        }
        @media (min-width: 768px) {
          .modern-template {
            padding: 2rem;
          }
        }
        .modern-template .container {
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
          padding: 0 1rem;
        }
        @media (min-width: 640px) {
          .modern-template .container {
            padding: 0 1.5rem;
          }
        }
        .modern-template header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 0;
          position: relative;
          flex-wrap: wrap;
          gap: 1rem;
        }
        @media (min-width: 768px) {
          .modern-template header {
            padding: 2rem 0;
            flex-wrap: nowrap;
          }
        }
        .modern-template .hero-section {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          padding: 2rem 0;
        }
        @media (min-width: 768px) {
          .modern-template .hero-section {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 1rem;
            padding: 3rem 0;
            min-height: 50vh;
          }
          .modern-template .profile-image-container img { width:300px !important;height:300px!important; }
          .modern-template .profile-image-container h1 { font-size:3rem !important; }
          .modern-template .profile-image-container .title-desktop { font-size:1.5rem !important; }
          .modern-template .profile-image-container .tagline-desktop { font-size:1rem !important; }
        }
        .modern-template .profile-image-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.2rem !important;
          text-align: center;
          margin: 1rem auto; /* requested margin */
        }
        /* Keep centered alignment at all sizes */
        @media (min-width: 768px) {
          .modern-template .profile-image-container {
            align-items: center;
          }
        }
        .modern-template .skills-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        @media (min-width: 640px) {
          .modern-template .skills-grid {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
          }
        }
        .modern-template .skill-category {
          padding: 1.25rem;
          border-radius: 1rem;
        }
        @media (min-width: 640px) {
          .modern-template .skill-category {
            padding: 1.5rem;
          }
        }
        .modern-template[data-theme="dark"] .skill-category {
          background: #1f2937;
        }
        .modern-template[data-theme="light"] .skill-category {
          background: #fff;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .modern-template .skill-tag {
          display: inline-block;
          padding: 0.35rem 0.75rem;
          border-radius: 0.5rem;
          margin: 0.25rem;
          font-size: 1rem;
        }
        .modern-template[data-theme="dark"] .skill-tag {
          background: #374151;
          color: #9ca3af;
        }
        .modern-template[data-theme="light"] .skill-tag {
          background: #e5e7eb;
          color: #4b5563;
        }
        .modern-template .cv-button {
          display: inline-block;
          padding: 0.5rem 1.2rem;
          border-radius: 0.5rem;
          text-decoration: none;
          font-weight: 400;
          transition: all 0.2s;
        }
        .modern-template[data-theme="dark"] .cv-button {
          background: #22d3ee;
          color: #111827;
        }
        .modern-template[data-theme="light"] .cv-button {
          background: #0ea5e9;
          color: #fff;
        }
        /* Theme toggle - circular bottom-right button for better reachability */
        .theme-toggle {
          position: fixed;
          bottom: 1rem;
          right: 1rem;
          top: auto;
          width: 48px;
          height: 48px;
          padding: 0;
          border-radius: 50%;
          cursor: pointer;
          z-index: 120;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 18px rgba(2,6,23,0.12);
          border: none;
          transition: transform 180ms ease, background 180ms ease;
        }
        .theme-toggle:active { transform: translateY(1px); }
        .modern-template[data-theme="dark"] .theme-toggle {
          background: linear-gradient(180deg,#1f2937,#111827);
          color: #e5e7eb;
        }
        .modern-template[data-theme="light"] .theme-toggle {
          background: linear-gradient(180deg,#ffffff,#f8fafc);
          color: #111827;
        }
        .modern-template img, .modern-template svg { max-width: 100%; height: auto; display: block; }

        /* Navigation responsive tweaks */
        .portfolio-nav {
          display:flex;
          align-items:center;
          justify-content: space-between;
          gap:1.25rem; /* add a bit more space between brand and nav */
          position: sticky;
          top: 0;
          z-index: 100;
          backdrop-filter: blur(10px);
          background: rgba(14, 23, 42, 0.8);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding: 1rem 2rem;
          margin: -1rem -2rem 1rem -2rem;
        }
        .portfolio-nav .brand { display:flex; align-items:center; gap:0.75rem; }
        .portfolio-nav .links { display:flex; gap:1.5rem; }
        @media (max-width: 1024px) {
          .portfolio-nav { gap:1rem; }
        }
        @media (max-width: 768px) {
          .portfolio-nav .links { display: none; }
          .portfolio-nav .mobile-toggle { display: inline-flex; margin-left:auto; }
          .portfolio-nav {
            padding: 0.75rem 1rem;
            margin: -1rem -0.75rem 1rem -0.75rem;
            gap: 0.75rem;
          }
        }

        /* Charming mobile improvements for modern template */
        @media (max-width: 640px) {
          .modern-template {
            padding: 1rem;
            background: linear-gradient(180deg,#071027 0%, #07121a 100%);
            animation: fadeIn 0.8s ease-out;
          }
          .modern-template .container { padding: 0 0.75rem; }
          .modern-template header { padding: 1rem 0; }
          .modern-template .hero-section {
            padding: 1.5rem;
            gap: 1.5rem;
            border-radius: 20px;
            background: linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01));
            box-shadow: 0 20px 40px rgba(2,6,23,0.3);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.1);
            animation: slideUp 0.6s ease-out 0.2s both;
          }
          .modern-template .profile-image-container img,
          .modern-template .profile-image img {
            width: 250px;
            height: 250px;
            border-radius: 50%;
            border: 3px solid rgba(255,255,255,0.2);
            box-shadow: 0 10px 30px rgba(2,6,23,0.4);
            animation: bounceIn 0.8s ease-out 0.4s both;
          }
          .modern-template .skill-category {
            border-radius: 16px;
            padding: 1.25rem;
            box-shadow: 0 12px 32px rgba(2,6,23,0.2);
            background: linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02));
            border: 1px solid rgba(255,255,255,0.08);
            animation: fadeInUp 0.6s ease-out 0.6s both;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .modern-template .skill-category:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 40px rgba(2,6,23,0.3);
          }
          .modern-template .skill-tag {
            padding: 0.5rem 1rem;
            font-size: 0.9rem;
            border-radius: 20px;
            animation: scaleIn 0.4s ease-out both;
            animation-delay: calc(var(--i, 0) * 0.1s);
          }
          .modern-template .cv-button {
            width:100%;
            display:block;
            text-align:center;
            border-radius: 16px;
            padding: 1rem;
            font-weight:600;
            background: linear-gradient(135deg, #22d3ee, #0ea5e9);
            box-shadow: 0 8px 20px rgba(34, 211, 238, 0.3);
            animation: pulse 2s infinite;
          }
          .modern-template .theme-toggle {
            width:48px;
            height:48px;
            background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.2);
            animation: float 3s ease-in-out infinite;
          }
        }

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes bounceIn { from { opacity: 0; transform: scale(0.3); } to { opacity: 1; transform: scale(1); } animation-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55); }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }
        @keyframes pulse { 0%, 100% { box-shadow: 0 8px 20px rgba(34, 211, 238, 0.3); } 50% { box-shadow: 0 8px 30px rgba(34, 211, 238, 0.5); } }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
      </style>
      <!-- Theme toggle button (bottom-right) -->
      <button id="themeToggleBtn" class="theme-toggle" aria-label="Toggle theme" style="bottom:1rem; right:1rem; top:auto;">
        <!-- default: moon icon for dark -->
        <svg id="themeIconMoon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path></svg>
        <svg id="themeIconSun" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"></path></svg>
      </button>
      <script>
        (function(){
          const root = document.querySelector('.modern-template');
          const btn = document.getElementById('themeToggleBtn');
          const iconSun = document.getElementById('themeIconSun');
          const iconMoon = document.getElementById('themeIconMoon');
          function updateIcons() {
            const isDark = root && root.dataset.theme === 'dark';
            if (iconSun && iconMoon) {
              iconSun.style.display = isDark ? 'none' : 'inline';
              iconMoon.style.display = isDark ? 'inline' : 'none';
            }
          }
          btn && btn.addEventListener('click', function(){
            if (!root) return;
            root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
            updateIcons();
          });
          // initialize
          updateIcons();
        })();
      </script>
      <script>
        // Sidebar toggle for classic template (toggle container-level state)
        (function(){
          try {
            const container = document.querySelector('.container');
            if (!container) return;
            const toggle = document.createElement('button');
            toggle.className = 'classic-sidebar-toggle';
            toggle.setAttribute('aria-label', 'Toggle sidebar');
            toggle.innerText = '☰';
            toggle.addEventListener('click', function(){
              container.classList.toggle('sidebar-collapsed');
            });
            document.body.appendChild(toggle);
          } catch(e) {
            // ignore
          }
        })();

        // Mobile menu wiring for modern template
        (function(){
          try {
            document.querySelectorAll('.burger-menu').forEach(function(b){
              b.addEventListener('click', function(){
                const nav = document.querySelector('.mobile-nav');
                if (nav) nav.classList.toggle('active');
              });
            });
          } catch(e){}
        })();

        // Prevent horizontal overflow
        (function(){ document.documentElement.style.overflowX = 'hidden'; document.body.style.overflowX = 'hidden'; })();
      </script>
      <style>
        /* Mobile Navigation Styles */
        .burger-menu {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          padding: 12px;
          background: transparent;
          border: none;
          z-index: 50;
          position: relative;
        }

        .burger-line {
          width: 24px;
          height: 2px;
          background-color: currentColor;
          transition: all 0.3s ease;
          border-radius: 2px;
        }

        .burger-menu.active .burger-line:nth-child(1) {
          transform: rotate(45deg) translate(6px, 6px);
        }

        .burger-menu.active .burger-line:nth-child(2) {
          opacity: 0;
        }

        .burger-menu.active .burger-line:nth-child(3) {
          transform: rotate(-45deg) translate(6px, -6px);
        }

       
        .mobile-nav {
          display: none;
          position: fixed;
          top: 0;
          right: -100%;
          width: 100%;
          height: 100vh;
          background-color: rgba(17, 24, 39, 0.98);
          padding: 2rem;
          transition: all 0.3s ease;
          z-index: 40;
          backdrop-filter: blur(8px);
        }

        .mobile-nav.active {
          right: 0;
          box-shadow: -5px 0 25px rgba(0, 0, 0, 0.3);
        }

        .mobile-nav .contact-links {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-top: 3rem;
          padding: 0 1rem;
        }

        .mobile-nav a {
          color: #e5e7eb;
          text-decoration: none;
          font-size: 1.25rem;
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          transition: all 0.2s;
          position: relative;
          overflow: hidden;
        }

        .mobile-nav a:hover {
          color: #60a5fa;
          background: rgba(96, 165, 250, 0.1);
        }
        @media (min-width: 768px){
         .profile-image h1{
             display: none !important;
         }
        }
        @media (max-width: 768px) {
         
          .burger-menu {
            display: flex;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 12px;
            padding: 0.75rem;
          }
          .portfolio-nav .links {
            display: none !important;
          }
          .portfolio-nav{
           margin:0 !important;
          }
          .hero-section{
           margin-top: 3rem !important;
          }
          .profile-image{
            display: flex !important;
            gap: 1rem !important;
            flex-direction:column !important;
            margin-bottom: 2rem !important;
            text-align: center !important;
          }
          .profile-image h1{
            font-size: 1.8rem !important;
            margin: 0 !important;
            color: #60a5fa !important;
          }
          .profile-image img{
            width: 120px !important;
            height: 120px !important;
            border-radius: 50% !important;
            border: 3px solid rgba(255, 255, 255, 0.2) !important;
            box-shadow: 0 8px 24px rgba(2, 6, 23, 0.3) !important;
          }
          .mobile-nav {
            display: block;
            margin: 0;
            
          }
        }
      </style>
  
      <nav class="portfolio-nav">
        <div class="brand pro" style="display:flex;gap:0.75rem; align-items:center;">
          <h1 style="font-size:2rem; font-weight:bold; color: #60a5fa; ">${personal.fullName}</h1>
        </div>
        <div class="links">
          <a href="#hero">Home</a>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
          ${cvButtonHtml}
        </div>
        <button class="mobile-toggle burger-menu" onclick="this.classList.toggle('active'); document.querySelector('.mobile-nav').classList.toggle('active')">
          <span class="burger-line"></span>
          <span class="burger-line"></span>
          <span class="burger-line"></span>
        </button>
      </nav>
      <div class="container">
        <!-- ...existing code... -->

          <!-- Mobile Navigation -->
          <nav class="mobile-nav">
            <div class="flex justify-end mb-8">
              <button class="text-gray-400 hover:text-white" onclick="this.closest('.mobile-nav').classList.remove('active'); document.querySelector('.burger-menu').classList.remove('active')">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div class="mobile-section-links" style="display:flex; flex-direction:column;gap:1rem;">
              <a href="#hero" onclick="this.closest('.mobile-nav').classList.remove('active'); document.querySelector('.burger-menu').classList.remove('active')">Home</a>
              <a href="#about" onclick="this.closest('.mobile-nav').classList.remove('active'); document.querySelector('.burger-menu').classList.remove('active')">About</a>
              <a href="#skills" onclick="this.closest('.mobile-nav').classList.remove('active'); document.querySelector('.burger-menu').classList.remove('active')">Skills</a>
              <a href="#experience" onclick="this.closest('.mobile-nav').classList.remove('active'); document.querySelector('.burger-menu').classList.remove('active')">Experience</a>
              <a href="#projects" onclick="this.closest('.mobile-nav').classList.remove('active'); document.querySelector('.burger-menu').classList.remove('active')">Projects</a>
              <a href="#contact" onclick="this.closest('.mobile-nav').classList.remove('active'); document.querySelector('.burger-menu').classList.remove('active')">Contact</a>
              ${cvButtonHtml}
            </div>
          </nav>
        </header>
        <main>
          <section id="hero" class="hero-section">
            <div class="profile-image-container">
              <img src="${personal.profileImage}" alt="profile" style="width:180px;height:180px;border-radius:50%;object-fit:cover;margin:0 auto;" onerror="this.onerror=null;this.src='https://placehold.co/180x180/6b7280/ffffff?text=${getInitialsLogo(personal.fullName)}'" />
              <h1 style="font-size:2rem; font-weight:700; color: #60a5fa; margin-top:0.75rem;">${personal.fullName}</h1>
              ${personal.title ? `<div class="title-desktop" style="color:#cbd5e1; font-size:1rem;">${personal.title}</div>` : ''}
              ${personal.tagline ? `<p class="tagline-desktop" style="opacity:0.9; max-width:48ch; margin:0.5rem auto 0; font-size:0.95rem;">${personal.tagline}</p>` : ''}
            </div>
          </section>
          
          <!-- About section (anchor target) -->
          <section id="about" class="about-section py-6">
            <div class="max-w-5xl mx-auto">
              <h3 class="text-2xl font-bold mb-4">About</h3>
              <p class="text-white-100">${(personal.about || '').replace(/\n/g, '<br/>')}</p>
            </div>
          </section>
          
          <section id="skills" class="skills-section mt-12">
            <h3 class="text-2xl font-bold mb-6">Skills & Expertise</h3>
            <div class="skills-grid">
              <div class="skill-category">
                <h4 class="text-xl font-semibold mb-4">Technical Skills</h4>
                <div class="flex flex-wrap gap-2">
                  ${skills.technical.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
              </div>
              <div class="skill-category">
                <h4 class="text-xl font-semibold mb-4">Professional Skills</h4>
                <div class="flex flex-wrap gap-2">
                  ${skills.soft.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
              </div>
            </div>
          </section>

          ${skills.certifications.length > 0 ? `
            <section class="certifications-section mt-12">
              <h3 class="text-2xl font-bold mb-6">Certifications</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                ${skills.certifications.map(cert => `
                  <div class="skill-category">
                    <h4 class="font-semibold">${cert.name}</h4>
                    <p class="text-sm opacity-75">${cert.issuer} • ${cert.year}</p>
                  </div>
                `).join('')}
              </div>
            </section>
          ` : ''}

          <section id="experience" class="experience-section mt-12">
            <h3 class="text-2xl font-bold mb-6">Experience</h3>
            <div class="space-y-8">
              ${experience.map(e => `
                <div class="skill-category">
                  <h4 class="text-xl font-semibold">${e.title}</h4>
                  <p class="text-sm opacity-75 mb-2">${e.company} • ${e.year}</p>
                  <p class="mb-4">${e.description}</p>
                  ${e.technologies ? `
                    <div class="text-sm">
                      <span class="opacity-75">Technologies:</span>
                      ${e.technologies.map(tech => `<span class="skill-tag">${tech}</span>`).join('')}
                    </div>
                  ` : ''}
                </div>
              `).join('')}
            </div>
          </section>

          <section id="projects" class="projects-section mt-8 sm:mt-12">
            <h3 class="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Key Projects</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              ${projects.map(p => `
                <div class="skill-category transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <h4 class="text-lg sm:text-xl font-semibold mb-2">${p.title}</h4>
                  <p class="text-sm sm:text-base">${p.description}</p>
                  ${p.technologies ? `
                    <div class="mt-4 flex flex-wrap gap-2">
                      ${p.technologies.map(tech => `<span class="skill-tag text-xs sm:text-sm">${tech}</span>`).join('')}
                    </div>
                  ` : ''}
                </div>
              `).join('')}
            </div>
          </section>

          <!-- Contact section -->
          <section id="contact" style="border-radius:1rem;" class="contact-section mt-8 py-8 bg-gray text-white-900">
            <div class="max-w-5xl mx-auto">
              <h3 class="text-white-2xl font-bold mb-4">Contact</h3>
              
              <div class="space-y-2 text-white-700">
                ${personal.email ? `<div>Email: <a href="mailto:${personal.email}" class="text-white-600">${personal.email}</a></div>` : ''}
                ${personal.phone ? `<div>Phone: ${personal.phone}</div>` : ''}
                ${personal.location ? `<div>Location: ${personal.location}</div>` : ''}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  `;

  // small script added to allow parent window to postMessage navigation commands
  // it will be appended to both modern and classic render outputs where appropriate

  const renderClassicTemplate = () => `
    <div class="classic-template" id="classic-portfolio" data-theme="dark">
      <style>
        /* Base */
        #classic-portfolio.classic-template {
          font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
          min-height: 100vh;
          line-height: 1.6;
          background-color: var(--bg-main);
          color: var(--text-primary);
          overflow-x: hidden;
        }
        
        /* Top Bar (Desktop) */
        .classic-topbar {
          position: sticky;
          top: 0;
          z-index: 120;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 0.75rem 1rem;
          background: var(--bg-sidebar);
          border-bottom: 1px solid var(--border-color);
        }
        .classic-topbar .brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-weight: 700;
          font-size: 1.125rem;
          color: var(--text-primary);
          white-space: nowrap;
        }
        .classic-topbar .desktop-links {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .classic-topbar .desktop-links a {
          color: var(--text-secondary);
          text-decoration: none;
          padding: 0.4rem 0.6rem;
          border-radius: 0.375rem;
        }
        .classic-topbar .desktop-links a:hover {
          color: var(--text-primary);
          background: var(--accent-light);
        }
        .classic-burger {
          display: none;
          width: 40px;
          height: 40px;
          border-radius: 0.5rem;
          border: 1px solid var(--border-color);
          background: var(--bg-card);
          color: var(--text-primary);
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .classic-burger span{ display:block; width:20px; height:2px; background: currentColor; position: relative; }
        .classic-burger span::before, .classic-burger span::after{ content:''; position:absolute; left:0; right:0; height:2px; background: currentColor; }
        .classic-burger span::before{ top:-6px; }
        .classic-burger span::after{ top:6px; }
        
        /* Mobile Fullscreen Drawer */
        .classic-mobile-drawer{
          position: fixed;
          inset: 0;
          background: rgba(17,24,39,0.96);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          z-index: 200;
          display: none;
          align-items: center;
          justify-content: center;
        }
        .classic-mobile-drawer.active{ display:flex; }
        .classic-mobile-drawer .drawer-card{
          width: min(92%, 420px);
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 1rem;
          padding: 1.5rem;
          color: #fff;
          position: relative;
        }
        .classic-mobile-drawer .close-btn{
          position: absolute; top: 0.75rem; right: 0.75rem; background: transparent; border: none; color: #fff; font-size: 1.5rem; cursor: pointer;
        }
        .classic-mobile-drawer a{
          display:block; color:#fff; text-decoration:none; padding:0.75rem 1rem; border-radius:0.75rem; margin:0.25rem 0;
        }
        .classic-mobile-drawer a:hover{ background: rgba(255,255,255,0.12); }
        
        @media (max-width: 1024px){
          .classic-burger{ display:inline-flex; }
          .classic-topbar .desktop-links{ display:none; }
        }
        
        @media (max-width: 640px){
          .classic-topbar{ padding: 0.5rem 0.75rem; }
        }

        #classic-portfolio.classic-template[data-theme="light"] {
          --accent-color: #2563eb;
          --accent-light: #dbeafe;
          --text-primary: #111827;
          --text-secondary: #4b5563;
          --bg-sidebar: #f8fafc;
          --bg-main: #ffffff;
          --bg-card: #ffffff;
          --border-color: #e5e7eb;
        }

        #classic-portfolio.classic-template[data-theme="dark"] {
          --accent-color: #60a5fa;
          --accent-light: #1e3a8a;
          --text-primary: #f3f4f6;
          --text-secondary: #9ca3af;
          --bg-sidebar: #111827;
          --bg-main: #1f2937;
          --bg-card: #374151;
          --border-color: #374151;
        }

        .classic-template .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0;
          display: flex;
          min-height: 100vh;
          gap: 2rem;
          position: relative;
          box-sizing: border-box;
        }

        .classic-sidebar {
          width: 320px;
          background: var(--bg-sidebar);
          border-right: 1px solid var(--border-color);
          padding: 2.5rem;
          position: fixed;
          height: 100vh;
          overflow-y: auto;
          transition: transform 220ms ease;
        }

        /* Collapsible sidebar support - container-level state so main shifts correctly */
        .container.sidebar-collapsed .classic-sidebar {
          transform: translateX(-100%);
          transition: transform 220ms ease;
        }

        .container.sidebar-collapsed .classic-main {
          margin-left: 0 !important;
          max-width: 100% !important;
          transition: margin-left 220ms ease;
        }

        .classic-sidebar-toggle {
          position: fixed;
          left: 1rem;
          top: 1rem;
          z-index: 220;
          background: var(--accent-color);
          color: #fff;
          border: none;
          padding: 0.5rem 0.6rem;
          border-radius: 0.45rem;
          box-shadow: 0 6px 18px rgba(2,6,23,0.12);
          cursor: pointer;
        }

        /* Prevent long words or links from creating horizontal scroll */
        .classic-main, .classic-sidebar, .classic-template { word-wrap: break-word; overflow-wrap: anywhere; }

        .classic-sidebar .profile-image {
          width: 180px;
          height: 180px;
          border-radius: 50%;
          object-fit: cover;
          margin: 0 auto 1.5rem;
          display: block;
          border: 4px solid var(--accent-color);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .classic-topbar{
           display: none;
          }

        .classic-main {
          flex: 1;
          margin-left: 320px;
          padding: 2.5rem;
          max-width: calc(100% - 320px);
          background: var(--bg-main);
        }

        .classic-template h1 {
          font-size: 2.25rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }

        .classic-template h2 {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--accent-color);
          margin-bottom: 1.5rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid var(--accent-light);
        }

        .classic-template h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }

        .section {
          margin-bottom: 3rem;
        }

        .contact-section {
          margin-top: 2rem;
          margin-bottom: 2rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid var(--border-color);
        }

        .contact-links {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .contact-links a {
          color: var(--text-secondary);
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: color 0.2s;
        }

        .contact-links svg {
          width: 18px;
          height: 18px;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .project-card {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 0.75rem;
          padding: 1.5rem;
          transition: all 0.3s ease;
        }

        .project-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .text-accent {
          color: var(--accent-color);
          font-size: 0.9rem;
        }

        .description {
          color: var(--text-secondary);
          white-space: pre-wrap;
        }

        .project-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--accent-color);
          text-decoration: none;
          margin-top: 1rem;
          font-size: 0.9rem;
          padding: 0.5rem 0.75rem;
          border-radius: 0.375rem;
          background: var(--accent-light);
          transition: all 0.2s;
        }

        .project-link:hover {
          background: var(--accent-color);
          color: var(--bg-main);
        }

        @media (max-width: 1024px) {
          .classic-sidebar {
            position: relative;
            width: 100%;
            height: auto;
            padding: 1.5rem;
            transform: none !important;
          }
          .classic-topbar{
           display: none;
          }
          .classic-main {
            margin-left: 0;
            max-width: 100%;
            padding: 1.5rem;
          }
        }

        /* Mobile layout: hide sidebar; use custom mobile header/footer */
        @media (max-width: 768px) {
        .profile-image {
          width: 70px !important;
          height: 70px !important;
          border-radius: 50% !important;
          }
          .classic-sidebar { display: none !important; }
          .classic-main {
            margin-left: 0 !important;
            max-width: 100% !important;
            padding: 1rem !important;
          }
          .classic-template .project-card {
            border-radius: 16px !important;
            box-shadow: 0 8px 24px rgba(2,6,23,0.1) !important;
            background: linear-gradient(135deg, var(--bg-card), rgba(255,255,255,0.02)) !important;
            border: 1px solid rgba(255,255,255,0.08) !important;
            animation: fadeInUp 0.6s ease-out both;
            animation-delay: calc(var(--i, 0) * 0.1s);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .classic-template .project-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 35px rgba(2,6,23,0.2) !important;
          }
          .classic-template h1 { font-size: 1.75rem !important; }
          .classic-template h2 { font-size: 1.25rem !important; }
          /* Mobile header */
          .classic-mobile-header {
            display: block !important;
            position: sticky; top: 0; z-index: 150;
            background: var(--bg-sidebar);
            border-bottom: 1px solid var(--border-color);
            padding: 0.75rem 1rem;
          }
          .classic-mobile-header .row {
            display:flex; align-items:center; justify-content:space-between; gap:0.75rem;
          }
          .classic-mobile-header .brand {
            display:flex; flex-direction:column; align-items:center; gap:0.3rem; font-weight:700; color:var(--text-primary);
            width:100%; text-align:center;
            margin-top:1.5rem; 
          }
          .classic-mobile-header .brand .avatar {
            width:200px; height:200px; border-radius:50%; object-fit:cover; border:2px solid var(--accent-color); margin:0 auto;
          }
          .classic-mobile-header .brand .name { font-size:2rem; }
          .classic-mobile-header .subtitle { color:var(--text-secondary); font-size:0.9rem; margin-top:0.125rem; text-align:center; }
          .classic-mobile-header .actions { position:absolute; top:0.5rem; right:0.75rem; display:flex; align-items:center; gap:0.5rem; }
          .classic-mobile-header .burger-btn {
            width:44px; height:44px; border-radius:0.5rem; border:1px solid var(--border-color); background:var(--bg-card); color:var(--text-primary); display:flex; align-items:center; justify-content:center; cursor:pointer; margin-top:1.5rem; 
          }
          .classic-mobile-header .burger-btn span { display:block; width:20px; height:2px; background: currentColor; position: relative; }
          .classic-mobile-header .burger-btn span::before, .classic-mobile-header .burger-btn span::after { content:''; position:absolute; left:0; right:0; height:2px; background: currentColor; }
          .classic-mobile-header .burger-btn span::before { top:-6px; }
          .classic-mobile-header .burger-btn span::after { top:6px; }
          /* Mobile footer */
          .classic-mobile-footer {
            display:block !important; margin-top:2rem; border-top:1px solid var(--border-color); padding:1rem; color:var(--text-secondary);
          }
          .classic-mobile-footer .links { display:flex; flex-wrap:wrap; gap:0.75rem; margin-bottom:0.5rem; }
          .classic-mobile-footer a { color:var(--text-secondary); text-decoration:none; padding:0.25rem 0.5rem; border-radius:0.375rem; }
          .classic-mobile-footer a:hover { background: var(--accent-light); color: var(--text-primary); }
        }

          .container {
            flex-direction: column;
          }
        }

        @media (max-width: 640px) {
        .profile-image {
          width: 70px !important;
          height: 70px !important;
          border-radius: 50% !important;
          }
          .classic-sidebar,
          .classic-main {
            padding: 1rem;
          }

          .classic-template h1 {
            font-size: 1.75rem;
          }

          .projects-grid {
            grid-template-columns: 1fr;
          }

          .classic-sidebar {
            border-radius: 16px !important;
            padding: 1.25rem !important;
            margin-bottom: 1.5rem !important;
          }

          .classic-template .project-card {
            border-radius: 12px !important;
            padding: 1rem !important;
            margin-bottom: 1rem !important;
            animation: scaleIn 0.5s ease-out both;
            animation-delay: calc(var(--i, 0) * 0.05s);
          }

          .skill-tag {
            animation: fadeIn 0.4s ease-out both;
            animation-delay: calc(var(--i, 0) * 0.1s);
          }

          .contact-links a {
            animation: slideUp 0.5s ease-out both;
            animation-delay: calc(var(--i, 0) * 0.1s);
          }

          /* Enhanced mobile navigation for classic template */
          .classic-mobile-nav-toggle {
            display: block !important;
            position: fixed !important;
            top: 1rem !important;
            right: 1rem !important;
            z-index: 1001 !important;
            background: var(--accent-color) !important;
            color: white !important;
            border: none !important;
            border-radius: 12px !important;
            padding: 0.75rem !important;
            backdrop-filter: blur(10px) !important;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2) !important;
          }

          .classic-mobile-nav {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            background: rgba(17, 24, 39, 0.95) !important;
            backdrop-filter: blur(10px) !important;
            z-index: 1000 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            opacity: 0 !important;
            visibility: hidden !important;
            transition: all 0.3s ease !important;
          }

          .classic-mobile-nav.active {
            opacity: 1 !important;
            visibility: visible !important;
          }

          .classic-mobile-nav .nav-content {
            background: rgba(255, 255, 255, 0.1) !important;
            backdrop-filter: blur(20px) !important;
            border-radius: 20px !important;
            padding: 2rem !important;
            border: 1px solid rgba(255, 255, 255, 0.2) !important;
            max-width: 300px !important;
            width: 90% !important;
            text-align: center !important;
          }

          .classic-mobile-nav a {
            display: block !important;
            color: white !important;
            text-decoration: none !important;
            padding: 1rem !important;
            margin: 0.5rem 0 !important;
            border-radius: 12px !important;
            transition: all 0.3s ease !important;
            background: rgba(255, 255, 255, 0.1) !important;
          }

          .classic-mobile-nav a:hover {
            background: rgba(255, 255, 255, 0.2) !important;
            transform: translateY(-2px) !important;
          }

          .classic-mobile-nav .close-btn {
            position: absolute !important;
            top: 1rem !important;
            right: 1rem !important;
            background: none !important;
            border: none !important;
            color: white !important;
            font-size: 1.5rem !important;
            cursor: pointer !important;
          }
        }

        @keyframes slideDown { from { opacity: 0; transform: translateY(-30px); } to { opacity: 1; transform: translateY(0); } }
      </style>
      <style>
        #classic-portfolio.classic-template { 
          font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; 
          min-height: 100vh;
          line-height: 1.6;
          display: block;
          width: 100%;
          margin: 0;
          padding: 0;
        }

        /* Theme Variables */
        #classic-portfolio.classic-template[data-theme="light"] {
          --accent-color: #2563eb;
          --accent-light: #dbeafe;
          --text-primary: #111827;
          --text-secondary: #4b5563;
          --bg-sidebar: #f8fafc;
          --bg-main: #ffffff;
          --bg-card: #ffffff;
          --border-color: #e5e7eb;
        }

        #classic-portfolio.classic-template[data-theme="dark"] {
          --accent-color: #60a5fa;
          --accent-light: #1e3a8a;
          --text-primary: #f3f4f6;
          --text-secondary: #9ca3af;
          --bg-sidebar: #111827;
          --bg-main: #1f2937;
          --bg-card: #374151;
          --border-color: #374151;
        }

        #classic-portfolio.classic-template {
          background-color: var(--bg-main);
          color: var(--text-primary);
        }

        .classic-template {
          background: var(--bg-main) !important;
          color: var(--text-primary) !important;
        }

        /* Theme Toggle Button */
        .theme-toggle-btn {
          position: fixed !important;
          top: 1rem !important;
          right: 1rem !important;
          padding: 0.5rem 1rem !important;
          border-radius: 0.5rem !important;
          background: var(--bg-card) !important;
          color: var(--text-primary) !important;
          border: 1px solid var(--border-color) !important;
          cursor: pointer !important;
          z-index: 100 !important;
          font-size: 0.875rem !important;
          transition: all 0.2s !important;
        }

        .theme-toggle-btn:hover {
          background: var(--accent-light) !important;
          color: var(--accent-color) !important;
        }
        
        /* Layout */
        #classic-portfolio.classic-template .container {
          display: flex;
          min-height: 100vh;
          max-width: 1400px;
          margin: 0 auto;
          gap: 2rem;
          position: relative;
          padding: 0;
          box-sizing: border-box;
        }
        
        /* Sidebar */
        .classic-sidebar {
          width: 320px !important;
          background: var(--bg-sidebar) !important;
          border-right: 1px solid var(--border-color) !important;
          padding: 2.5rem !important;
          position: fixed !important;
          height: 100vh !important;
          overflow-y: auto !important;
          scrollbar-width: thin !important;
          scrollbar-color: var(--accent-color) transparent !important;
          box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1) !important;
        }

        .classic-sidebar::-webkit-scrollbar {
          width: 6px !important;
        }

        .classic-sidebar::-webkit-scrollbar-track {
          background: transparent !important;
        }

        .classic-sidebar::-webkit-scrollbar-thumb {
          background: var(--accent-color) !important;
          border-radius: 3px !important;
        }
        
        /* Main Content */
        .classic-main {
          flex: 1 !important;
          margin-left: 320px !important;
          padding: 2.5rem !important;
          max-width: calc(100% - 320px) !important;
          background: var(--bg-main) !important;
        }

        /* Cards and Sections */
        .skill-category, .project-card {
          background: var(--bg-card) !important;
          border: 1px solid var(--border-color) !important;
          border-radius: 0.75rem !important;
          padding: 1.5rem !important;
          margin-bottom: 1rem !important;
          transition: all 0.3s ease !important;
        }

        .skill-category:hover, .project-card:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
        }
        
        /* Typography */
        .classic-template h1 {
          font-size: 2.25rem !important;
          font-weight: 700 !important;
          color: var(--text-primary) !important;
          margin-bottom: 1rem !important;
          line-height: 1.2 !important;
          letter-spacing: -0.025em !important;
        }
        
        .classic-template h2 {
          font-size: 1.5rem !important;
          font-weight: 600 !important;
          color: var(--accent-color) !important;
          margin-bottom: 1.5rem !important;
          padding-bottom: 0.5rem !important;
          border-bottom: 2px solid var(--accent-light) !important;
          position: relative !important;
        }

        .classic-template h2::after {
          content: '' !important;
          position: absolute !important;
          bottom: -2px !important;
          left: 0 !important;
          width: 50px !important;
          height: 2px !important;
          background: var(--accent-color) !important;
        }
        
        .classic-template h3 {
          font-size: 1.25rem !important;
          font-weight: 600 !important;
          color: var(--text-primary) !important;
          margin-bottom: 1rem !important;
          display: flex !important;
          align-items: center !important;
          gap: 0.5rem !important;
        }

        .classic-template p {
          color: var(--text-secondary) !important;
          margin-bottom: 1rem !important;
          line-height: 1.7 !important;
          font-size: 1rem !important;
        }

        .classic-template a {
          color: var(--accent-color) !important;
          text-decoration: none !important;
          transition: all 0.2s !important;
        }

        .classic-template a:hover {
          color: var(--text-primary) !important;
        }
        
        /* Section Styles */
        .section {
          margin-bottom: 3rem !important;
        }
        
        /* Profile Image */
        .profile-image {
          width: 180px !important;
          height: 180px !important;
          border-radius: 50% !important;
          object-fit: cover !important;
          margin: 0 auto 1.5rem !important;
          display: block !important;
          border: 4px solid #fff !important;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1) !important;
        }
        
        /* Contact Info */
        .contact-info {
          margin-top: 2rem !important;
        }
        
        .contact-item {
          display: flex !important;
          align-items: center !important;
          gap: 0.75rem !important;
          margin-bottom: 1rem !important;
          color: var(--text-secondary) !important;
          text-decoration: none !important;
          transition: color 0.2s !important;
        }
        
        .contact-item:hover {
          color: var(--accent-color) !important;
        }
        
        /* Skills Section */
        .skills-grid {
          display: grid !important;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)) !important;
          gap: 1.5rem !important;
          margin-top: 1.5rem !important;
        }
        
        .skill-category {
          background: var(--bg-sidebar) !important;
          padding: 1.5rem !important;
          border-radius: 0.5rem !important;
        }
        
        .skill-tag {
          display: inline-block !important;
          padding: 0.35rem 0.75rem !important;
          background: var(--accent-light) !important;
          color: var(--accent-color) !important;
          border-radius: 0.25rem !important;
          margin: 0.25rem !important;
          font-size: 0.875rem !important;
        }
        
        /* Experience Timeline */
        .timeline {
          position: relative !important;
          margin-left: 1rem !important;
        }
        
        .timeline::before {
          content: '' !important;
          position: absolute !important;
          left: -1rem !important;
          top: 0 !important;
          bottom: 0 !important;
          width: 2px !important;
          background: var(--accent-light) !important;
        }
        
        .timeline-item {
          position: relative !important;
          padding-bottom: 2rem !important;
          padding-left: 1.5rem !important;
        }
        
        .timeline-item::before {
          content: '' !important;
          position: absolute !important;
          left: -1.25rem !important;
          top: 0.5rem !important;
          width: 0.75rem !important;
          height: 0.75rem !important;
          border-radius: 50% !important;
          background: var(--accent-color) !important;
          border: 2px solid #fff !important;
        }
        
        /* Print Styles */
        // @media print {
        //   .classic-template {
        //     --accent-color: #2563eb !important;
        //     --accent-light: #dbeafe !important;
        //   }
          
        //   .classic-sidebar {
        //     position: relative !important;
        //     height: auto !important;
        //     width: 100% !important;
        //     page-break-inside: avoid !important;
        //   }
          
        //   .classic-main {
        //     margin-left: 0 !important;
        //     max-width: 100% !important;
        //   }
          
        //   .container {
        //     display: block !important;
        //   }
        // }
        
        /* Responsive Design */
        @media (max-width: 1024px) {
          .classic-sidebar {
            position: relative !important;
            width: 100% !important;
            height: auto !important;
            padding: 1.5rem !important;
          }
          
          .classic-main {
            margin-left: 0 !important;
            max-width: 100% !important;
            padding: 1.5rem !important;
          }
          
          .container {
            flex-direction: column !important;
            padding: 1rem !important;
          }

          .skills-container {
            grid-template-columns: 1fr !important;
          }

          .projects-grid {
            grid-template-columns: 1fr !important;
          }

          .timeline-item {
            padding-left: 1.5rem !important;
          }

          .classic-template h1 {
            font-size: 1.75rem !important;
          }

          .classic-template h2 {
            font-size: 1.25rem !important;
          }

          .contact-links {
            flex-direction: row !important;
            flex-wrap: wrap !important;
            justify-content: center !important;
            gap: 1rem !important;
          }
        }
       
        @media (max-width: 640px) {
        .profile-image {
          width: 70px !important;
          height: 70px !important;
          border-radius: 50% !important;
          }
          .classic-sidebar,
          .classic-main {
            padding: 1rem !important;
          }

          .skills-list {
            justify-content: center !important;
          }

          .timeline::before {
            left: -0.75rem !important;
          }

          .timeline-item::before {
            left: -1rem !important;
          }

          .project-card {
            padding: 1rem !important;
          }
        }
      </style>
      <!-- Topbar with burger for mobile -->
      <div class="classic-topbar">
        <div class="brand">
          <span style="display:inline-flex;width:28px;height:28px;border-radius:8px;background:var(--accent-color);opacity:0.85;"></span>
          ${personal.fullName}
        </div>
        <nav class="desktop-links">
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
        <button class="classic-burger" aria-label="Open menu" onclick="document.querySelector('.classic-mobile-drawer').classList.add('active')">
          <span></span>
        </button>
      </div>

      <!-- Mobile drawer nav -->
      <div class="classic-mobile-drawer">
        <div class="drawer-card">
          <button class="close-btn" aria-label="Close" onclick="this.closest('.classic-mobile-drawer').classList.remove('active')">×</button>
          <div style="display:flex;flex-direction:column;gap:0.5rem; margin-top:1rem;">
            <a href="#about" onclick="document.querySelector('.classic-mobile-drawer').classList.remove('active')">About</a>
            <a href="#experience" onclick="document.querySelector('.classic-mobile-drawer').classList.remove('active')">Experience</a>
            <a href="#projects" onclick="document.querySelector('.classic-mobile-drawer').classList.remove('active')">Projects</a>
            <a href="#contact" onclick="document.querySelector('.classic-mobile-drawer').classList.remove('active')">Contact</a>
            ${cvButtonHtml}
          </div>
        </div>
      </div>

      <!-- Mobile Header (visible only on mobile) -->
      <header class="classic-mobile-header" style="display:none; position:relative;">
        <div class="row" style="flex-direction:column; gap:0.5rem;">
          <div class="brand">
            <img class="avatar" src="${personal.profileImage}" alt="${personal.fullName}" onerror="this.onerror=null;this.src='https://placehold.co/160x160/2563eb/ffffff?text=${getInitialsLogo(personal.fullName)}'" />
            <div class="name">${personal.fullName}</div>
          </div>
          <div class="subtitle">${personal.title || ''}</div>
        </div>
        <div class="actions">
          <button class="burger-btn" aria-label="Open menu" onclick="document.querySelector('.classic-mobile-drawer').classList.add('active')">
            <span></span>
          </button>
        </div>
        ${personal.tagline ? `<div style="margin-top:0.5rem; color:var(--text-secondary); text-align:center;">${personal.tagline}</div>` : ''}
      </header>

      <div class="container">
        <!-- Sidebar (hidden on mobile) -->
        <aside class="classic-sidebar">
          <img src="${personal.profileImage}" alt="${personal.fullName}" class="profile-image" 
               onerror="this.onerror=null;this.src=\`https://placehold.co/180x180/2563eb/ffffff?text=${getInitialsLogo(personal.fullName)}\`"/>
          
          <h1>${personal.fullName}</h1>
          <!-- Sidebar section navigation -->
          <nav class="sidebar-nav" style="margin:1rem 0 1.5rem; display:flex; flex-direction:column; gap:0.5rem;">
            <a href="#experience" style="color:var(--text-secondary); text-decoration:none;">Experience</a> 
            <a href="#skills" style="color:var(--text-secondary); text-decoration:none;">Skills</a>
            <a href="#about" style="color:var(--text-secondary); text-decoration:none;">About</a>
            <a href="#projects" style="color:var(--text-secondary); text-decoration:none;">Projects</a>
            <a href="#contact" style="color:var(--text-secondary); text-decoration:none;">Contact</a>
          </nav>
          <div class="title">${personal.title}</div>
          <p class="tagline">${personal.tagline}</p>

          <div class="contact-section">
            <h3>Contact</h3>
            <div class="contact-links">
              ${personal.email ? `
                <a href="mailto:${personal.email}">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  ${personal.email}
                </a>
              ` : ''}
              ${personal.github ? `
                <a href="${personal.github}" target="_blank">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                  </svg>
                  GitHub
                </a>
              ` : ''}
              ${personal.linkedin ? `
                <a href="${personal.linkedin}" target="_blank">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect x="2" y="9" width="4" height="12"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                  LinkedIn
                </a>
              ` : ''}
              ${personal.website ? `
                <a href="${personal.website}" target="_blank">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="2" y1="12" x2="22" y2="12"/>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  </svg>
                  Website
                </a>
              ` : ''}
            </div>
            ${cvButtonHtml}
          </div>

          <div class="classic-footer">
            <p>&copy; ${new Date().getFullYear()} ${personal.name}. All rights reserved.</p>
          </div>
        </aside>

        <!-- Main Content -->
        <main class="classic-main">

          ${experience.length ? `
          <div class="section">
            <h2>Professional Experience</h2>
            <div class="timeline">
              ${experience.map(job => `
                <div class="timeline-item">
                  <h3>${job.title}</h3>
                  <div class="company">${job.company}</div>
                  <div class="year">${job.year}</div>
                  <p class="description mt-2">${job.description}</p>
                  ${job.technologies ? `
                    <div class="skills-list mt-3">
                      ${job.technologies.map(tech => `<span class="tag">${tech}</span>`).join('')}
                    </div>
                  ` : ''}
                </div>
              `).join('')}
            </div>
          </div>` : ''}

          ${projects.length ? `
          <div class="section">
            <h2>Projects</h2>
            <div style="display: grid !important; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)) !important; gap: 1.5rem !important;">
              ${projects.map(project => `
                <div style="background: var(--bg-sidebar) !important; padding: 1.5rem !important; border-radius: 0.5rem !important;">
                  <h3>${project.title}</h3>
                  <p style="color: var(--accent-color) !important; font-size: 0.9rem !important; margin-bottom: 0.5rem !important;">${project.technologies ? project.technologies.join(', ') : ''}</p>
                  <p style="white-space: pre-wrap !important;">${project.description}</p>
                  ${project.link ? `<a href="${project.link}" target="_blank" class="contact-item" style="display: inline-flex !important; margin-top: 1rem !important;">View Project <i data-feather="external-link" style="margin-left: 0.5rem !important;"></i></a>` : ''}
                </div>
              `).join('')}
            </div>
          </div>` : ''}
        </main>
      </div>
       
      </style>
      <!-- Theme toggle button (bottom-right) -->
      <button id="classicThemeToggleBtn" aria-label="Toggle theme" style="position:fixed;bottom:1.5rem;right:1.5rem;width:48px;height:48px;border-radius:50%;background:#374151;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,0.12);border:none;z-index:200;cursor:pointer;">
        <svg id="classicThemeIconMoon" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline;"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path></svg>
        <svg id="classicThemeIconSun" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none;"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"></path></svg>
      </button>
      <script>
        (function(){
          const root = document.querySelector('.classic-template');
          const btn = document.getElementById('classicThemeToggleBtn');
          const iconSun = document.getElementById('classicThemeIconSun');
          const iconMoon = document.getElementById('classicThemeIconMoon');
          function updateIcons() {
            const isDark = root && root.dataset.theme === 'dark';
            if (iconSun && iconMoon) {
              iconSun.style.display = isDark ? 'none' : 'inline';
              iconMoon.style.display = isDark ? 'inline' : 'none';
            }
          }
          btn && btn.addEventListener('click', function(){
            if (!root) return;
            root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
            updateIcons();
          });
          // initialize
          updateIcons();
        })();
        // Smooth scroll for nav links
        document.addEventListener('DOMContentLoaded', function() {
          document.querySelectorAll('.sidebar-nav a').forEach(function(link) {
            link.addEventListener('click', function(e) {
              const targetId = link.getAttribute('href').replace('#','');
              const target = document.getElementById(targetId);
              if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
              }
            });
          });
        });
      </script>
      <div class="container">
          <aside class="classic-sidebar">
            <img src="${personal.profileImage}" 
                 alt="profile"
                 class="profile-image"
                 onerror="this.onerror=null;this.src='https://placehold.co/180x180/60a5fa/1e3a8a?text=${getInitialsLogo(personal.fullName)}'" />
            <h2 style="margin:0.25rem 0 0.5rem;">${personal.fullName}</h2>
            <div style="color: var(--accent-color) !important; font-size: 1.05rem !important; margin-bottom: 0.75rem !important; font-weight: 500 !important;">${personal.title}</div>
            ${personal.tagline ? `<p style="margin-top:0.25rem;">${personal.tagline}</p>` : ''}
            
            <div class="contact-section">
              <h3>Contact</h3>
              <div class="contact-links">
                ${personal.email ? `
                  <a href="mailto:${personal.email}">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                    ${personal.email}
                  </a>
                ` : ''}
                ${personal.github ? `
                  <a href="${personal.github}" target="_blank">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                    GitHub
                  </a>
                ` : ''}
                ${personal.linkedin ? `
                  <a href="${personal.linkedin}" target="_blank">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                    LinkedIn
                  </a>
                ` : ''}
                ${personal.website ? `
                  <a href="${personal.website}" target="_blank">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                    Website
                  </a>
                ` : ''}
              </div>
              ${cvButtonHtml}
            </div>
          </aside>

          <main class="classic-main">
            <div id="about" class="classic-section">
              <h1>About Me</h1>
              <p>${(personal.about || '').replace(/\n/g, '<br/>')}</p>
            </div>

            <div id="experience" class="classic-section">
              <h2>Professional Experience</h2>
              <div class="timeline">
                ${experience.map(e => `
                  <div class="timeline-item">
                    <h3 style="margin:0;">${e.title}</h3>
                    <div class="company">${e.company}</div>
                    <div class="year">${e.year}</div>
                    <p class="mt-2">${e.description}</p>
                    ${e.technologies ? `
                      <div class="skills-list" style="margin-top:0.5rem">
                        ${e.technologies.map(tech => `<span class="tag">${tech}</span>`).join('')}
                      </div>
                    ` : ''}
                  </div>
                `).join('')}
              </div>
            </div>

            <div id="skills" class="classic-section">
              <h2>Skills & Expertise</h2>
              <div class="skills-container">
                <div class="skills-group">
                  <h3>Technical Skills</h3>
                  <div class="skills-list">
                    ${skills.technical.map(s => `<span class="tag">${s}</span>`).join('')}
                  </div>
                </div>
                <div class="skills-group">
                  <h3>Professional Skills</h3>
                  <div class="skills-list">
                    ${skills.soft.map(s => `<span class="tag">${s}</span>`).join('')}
                  </div>
                </div>
              </div>
            </div>

            ${projects.length > 0 ? `
              <div id="projects" class="classic-section">
                <h2>Featured Projects</h2>
                <div class="projects-grid">
                  ${projects.map(p => `
                    <div class="project-card">
                      <h3 style="margin:0 0 0.25rem;">${p.title}</h3>
                      <p>${p.description}</p>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}

            ${skills.certifications.length > 0 ? `
              <div id="certifications" class="classic-section">
                <h2>Certifications</h2>
                <div class="projects-grid">
                  ${skills.certifications.map(cert => `
                    <div class="project-card">
                      <h3 style="margin:0 0 0.25rem;">${cert.name}</h3>
                      <p>${cert.issuer} • ${cert.year}</p>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}

            <div id="contact" class="classic-section" style="margin-top:2rem;">
              <h2>Contact</h2>
              <div class="contact-links">
                ${personal.email ? `<a href="mailto:${personal.email}">${personal.email}</a>` : ''}
                ${personal.github ? `<a href="${personal.github}" target="_blank">GitHub</a>` : ''}
                ${personal.linkedin ? `<a href="${personal.linkedin}" target="_blank">LinkedIn</a>` : ''}
                ${personal.website ? `<a href="${personal.website}" target="_blank">Website</a>` : ''}
              </div>
            </div>

            <!-- Mobile Footer (visible only on mobile) -->
            <footer class="classic-mobile-footer" style="display:none;">
              <div style="font-size:0.85rem; text-align:center;">&copy; ${new Date().getFullYear()} ${personal.fullName || personal.name || ''}. All rights reserved.</div>
            </footer>
          </main>
      </div>
    </div>
  `;

  // Helper to inject a small navigation listener script into the produced HTML
  const navigationListenerScript = `
    <script>
      (function(){
        // Listen for navigation messages from parent
        window.addEventListener('message', function(e){
          try {
            const data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;
            if (!data) return;
            // navigation command
            if (data.type === 'navigate' && data.id) {
              var target = document.getElementById(data.id) || document.querySelector('[name="'+data.id+'"]');
              if (target && typeof target.scrollIntoView === 'function') {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
              } else if (data.id === 'hero') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
              return;
            }
            // toggle theme command
            if (data.type === 'toggleTheme') {
              try {
                var root = document.querySelector('.modern-template, .classic-template');
                if (root) {
                  root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
                }
              } catch(err) {}
              return;
            }
          } catch (err) {
            // ignore
          }
        }, false);
      })();
    </script>
  `;

  // Validate and determine which template to use
  if (template !== 'modern' && template !== 'classic') {
    console.error('Invalid template selected:', template);
    throw new Error('Template must be either "modern" or "classic"');
  }
  
  // Select and render the appropriate template
  const templateContent = (template === 'modern' ? renderModernTemplate() : renderClassicTemplate()) + navigationListenerScript;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${personal.fullName} - ${personal.title}</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  ${template === 'modern' ? '<script src="https://cdn.tailwindcss.com"></script>' : ''}
  <style>
    /* Reset default styles */
    * { box-sizing: border-box; }
    html, body { 
      margin: 0; 
      padding: 0;
      min-height: 100vh;
    }
    body {
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      line-height: 1.5;
    }
    ${template === 'classic' ? `
    /* Classic template base styles */
    body {
      font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
      background: #ffffff;
      color: #111827;
    }
    ` : ''}
  </style>
</head>
<body>
  ${templateContent}
</body>
</html>`;
};

export default generateStaticHtml;
