export const getInitialsLogo = (fullName) => {
  const parts = (fullName || '').trim().split(' ').filter(Boolean);
  if (parts.length === 0) return '';
  const firstInitial = parts[0][0] || '';
  const lastInitial = parts.length > 1 ? parts[parts.length - 1][0] : '';
  return `${firstInitial}${lastInitial}`.toUpperCase();
};

const generateStaticHtml = (data) => {
  const { personal = {}, experience = [], projects = [], template, skills = [] } = data || {};
  const isModern = template === 'modern';
  const MAX_EMBED_BYTES = 300 * 1024; // 300 KB - don't embed data URLs larger than this

  const skillTags = skills.map((skill) => `<span class="skill-tag">${skill}</span>`).join('');

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
    <div class="font-sans min-h-screen" style="background-color: #111827; color: #e5e7eb;">
      <style>
        .skill-tag{display:inline-block;background:#374151;color:#9ca3af;padding:.35rem .75rem;border-radius:.5rem;margin:.25rem;}
        .cv-button{background:#22d3ee;color:#111827;padding:.75rem 1.5rem;border-radius:.5rem;text-decoration:none;}
      </style>
      <header><h1>${personal.fullName}</h1></header>
      <main>
        <section id="hero">
          <img src="${personal.profileImage}" alt="profile" style="width:140px;height:140px;border-radius:50%;object-fit:cover" onerror="this.onerror=null;this.src='https://placehold.co/140x140/6b7280/ffffff?text=${getInitialsLogo(personal.fullName)}'" />
          <h2>${personal.title}</h2>
          <p>${personal.tagline}</p>
          <div>${cvButtonHtml}</div>
        </section>
        <section id="about"><h3>About</h3><p>${(personal.about || '').replace(/\n/g, '<br/>')}</p></section>
        <section id="skills"><h3>Skills</h3><div>${skillTags}</div></section>
        <section id="experience"><h3>Experience</h3>${experience.map((e)=>`<div><h4>${e.title}</h4><p>${e.company} • ${e.year}</p><p>${e.description}</p></div>`).join('')}</section>
        <section id="projects"><h3>Projects</h3>${projects.map((p)=>`<div><h4>${p.title}</h4><p>${p.description}</p></div>`).join('')}</section>
      </main>
    </div>
  `;

  const renderMinimalTemplate = () => `
    <div class="font-sans min-h-screen" style="background-color: #ffffff; color: #1f2937;">
      <style>
        .skill-tag{display:inline-block;background:#bfdbfe;color:#1e3a8a;padding:.25rem .6rem;border-radius:.375rem;margin:.3rem;}
        .cv-button{background:#2563eb;color:#fff;padding:.5rem 1rem;border-radius:.375rem;text-decoration:none;}
      </style>
      <header><h1>${personal.fullName}</h1></header>
      <main>
        <section id="hero">
          <img src="${personal.profileImage}" alt="profile" style="width:120px;height:120px;border-radius:50%;object-fit:cover" />
          <h2>${personal.title}</h2>
          <p>${personal.tagline}</p>
          <div>${cvButtonHtml}</div>
        </section>
        <section id="about"><h3>About</h3><p>${(personal.about || '').replace(/\n/g, '<br/>')}</p></section>
        <section id="skills"><h3>Skills</h3><div>${skillTags}</div></section>
        <section id="experience"><h3>Experience</h3>${experience.map((e)=>`<div><h4>${e.title}</h4><p>${e.company} • ${e.year}</p><p>${e.description}</p></div>`).join('')}</section>
        <section id="projects"><h3>Projects</h3>${projects.map((p)=>`<div><h4>${p.title}</h4><p>${p.description}</p></div>`).join('')}</section>
      </main>
    </div>
  `;

  const templateContent = isModern ? renderModernTemplate() : renderMinimalTemplate();

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${personal.fullName} - ${personal.title}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>body{font-family:Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; margin:0; padding:0}</style>
</head>
<body>
  ${templateContent}
</body>
</html>`;
};

export default generateStaticHtml;
