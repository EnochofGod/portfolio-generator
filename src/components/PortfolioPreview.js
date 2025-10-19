import React, { useState } from 'react';
import { ArrowLeft, Github, Layers, Download, Mail, Code } from 'lucide-react';
import useActiveSection from '../hooks/useActiveSection';
import generateStaticHtml, { getInitialsLogo } from '../utils/generateStaticHtml';
import CodeExportModal from './CodeExportModal';

const PortfolioPreview = ({ data, setView }) => {
  const { 
    personal = {}, 
    experience = [], 
    projects = [], 
    template, 
    skills = { 
      technical: [], 
      soft: [], 
      certifications: [] 
    } 
  } = data || {};

  const sections = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];
  const [showExportModal, setShowExportModal] = useState(false);
  // All hooks must be called before any conditionals
  useActiveSection(sections);

  // Ensure a valid template is selected
  React.useEffect(() => {
    if (!template || (template !== 'modern' && template !== 'classic')) {
      setView('welcome');
    }
  }, [template, setView]);

  // Validate template before rendering
  if (!template || (template !== 'modern' && template !== 'classic')) {
    return null;
  }
  
  // Explicitly set the template to use
  const templateType = template;
  const isModern = templateType === 'modern';

  const getAnchorId = (id) => (id === 'home' ? 'hero' : id);

  const generatedCode = generateStaticHtml(data);
  const initials = getInitialsLogo(personal.fullName);

  if (template === 'classic') {
    return (
      <div className="classic-template">
        {/* Classic Template Preview */}
        <aside className="classic-sidebar">
          <img src={personal.profileImage} alt={personal.fullName} className="profile-image" 
               onError={(e)=>{e.target.onerror=null;e.target.src=`https://placehold.co/180x180/2563eb/ffffff?text=${initials}`}}/>
          <h1>{personal.fullName}</h1>
          <h3>{personal.title}</h3>
          <p>{personal.tagline}</p>
          <div className="contact-info">
            {personal.email && <a href={`mailto:${personal.email}`} className="contact-item">{personal.email}</a>}
            {personal.github && <a href={personal.github} className="contact-item">GitHub</a>}
            {personal.linkedin && <a href={personal.linkedin} className="contact-item">LinkedIn</a>}
          </div>
          <button onClick={() => setView('config')} className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded">
            <ArrowLeft className="w-4 h-4 inline mr-2" /> Edit Data
          </button>
          <button onClick={() => setShowExportModal(true)} className="mt-2 w-full bg-green-600 text-white py-2 px-4 rounded">
            <Code className="w-4 h-4 inline mr-2" /> Export HTML
          </button>
        </aside>
        <main className="classic-main">
          {/* Content sections will go here */}
        </main>
        <CodeExportModal show={showExportModal} onClose={() => setShowExportModal(false)} generatedCode={generatedCode} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <header className="sticky top-0 z-20 shadow-xl bg-gray-800">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <span className={`text-xl font-extrabold ${isModern ? 'text-cyan-400' : 'text-blue-600'}`}>{personal.fullName}</span>

          <div className="flex space-x-6 text-sm font-medium">
            {sections.map((id) => (
              <a key={id} href={`#${getAnchorId(id)}`} className="py-1 px-3 rounded-lg font-medium transition duration-200 text-blue-200 hover:text-white hover:bg-blue-700">{id.charAt(0).toUpperCase() + id.slice(1)}</a>
            ))}
          </div>

          <div className="flex space-x-3">
            <button onClick={() => setView('config')} className={`flex items-center text-sm font-semibold px-4 py-2 rounded-lg ${isModern ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-700'}`}>
              <ArrowLeft className="w-4 h-4 mr-2" /> Edit Data
            </button>
            <button onClick={() => setShowExportModal(true)} className="flex items-center text-sm font-semibold px-4 py-2 rounded-lg bg-green-600 text-white">
              <Code className="w-4 h-4 mr-2" /> Export HTML
            </button>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <section id="hero" className="py-16 text-center">
          <img src={personal.profileImage} alt="Profile" className={`w-36 h-36 object-cover rounded-full mx-auto mb-6 shadow-xl ${isModern ? 'border-4 border-gray-800 outline-cyan-500' : 'border-4 border-white outline-blue-500'}`} onError={(e)=>{e.target.onerror=null;e.target.src=`https://placehold.co/128x128/${isModern?'0891b2':'6366f1'}/ffffff?text=${initials}`}} />
          <h1 className={`text-6xl font-extrabold tracking-tight mb-2 ${isModern ? 'text-white' : 'text-gray-900'}`}>{personal.fullName}</h1>
          <h2 className={`text-3xl font-semibold mb-4 ${isModern ? 'text-cyan-400' : 'text-blue-600'}`}>{personal.title}</h2>
          <p className={`text-xl font-light max-w-4xl mx-auto ${isModern ? 'text-gray-400' : 'text-gray-600'}`}>{personal.tagline}</p>

          <div className="flex justify-center space-x-4 mt-8">
            <a href={personal.github} target="_blank" rel="noreferrer" className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium ${isModern ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-700'}`}><Github className="w-4 h-4 mr-2" /> GitHub</a>
            <a href={personal.linkedin} target="_blank" rel="noreferrer" className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium ${isModern ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-700'}`}><Layers className="w-4 h-4 mr-2" /> LinkedIn</a>
            {personal.cvFile && <a href={personal.cvFile} download={personal.cvFileName || 'resume.pdf'} className="flex items-center px-4 py-2 rounded-lg bg-green-600 text-white"><Download className="w-4 h-4 mr-2" /> Download CV</a>}
          </div>
        </section>

        <section id="about" className="py-16">
          <h2 className={`text-3xl font-extrabold mb-8 ${isModern ? 'text-cyan-400' : 'text-gray-900'}`}>About Me</h2>
          <div className={`p-8 rounded-xl shadow-xl ${isModern ? 'bg-gray-800' : 'bg-gray-50'}`}>
            <p className={`${isModern ? 'text-gray-300' : 'text-gray-700'}`}>{personal.about}</p>
          </div>
        </section>

        <section id="skills" className="py-16">
          <h2 className={`text-3xl font-extrabold mb-8 ${isModern ? 'text-cyan-400' : 'text-gray-900'}`}>Skills & Expertise</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className={`p-6 rounded-xl shadow-xl ${isModern ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <h3 className={`text-xl font-bold mb-4 ${isModern ? 'text-white' : 'text-gray-800'}`}>Technical Skills</h3>
              <div>
                {skills.technical.map((s) => (
                  <span key={s} className={`inline-block text-sm font-medium px-4 py-2 m-1 rounded-full ${isModern ? 'bg-gray-700 text-cyan-400' : 'bg-blue-100 text-blue-800'}`}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div className={`p-6 rounded-xl shadow-xl ${isModern ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <h3 className={`text-xl font-bold mb-4 ${isModern ? 'text-white' : 'text-gray-800'}`}>Professional Skills</h3>
              <div>
                {skills.soft.map((s) => (
                  <span key={s} className={`inline-block text-sm font-medium px-4 py-2 m-1 rounded-full ${isModern ? 'bg-gray-700 text-green-400' : 'bg-green-100 text-green-800'}`}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {skills.certifications.length > 0 && (
            <div className={`mt-8 p-6 rounded-xl shadow-xl ${isModern ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <h3 className={`text-xl font-bold mb-4 ${isModern ? 'text-white' : 'text-gray-800'}`}>Certifications</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {skills.certifications.map((cert, index) => (
                  <div key={index} className={`p-4 rounded-lg ${isModern ? 'bg-gray-700' : 'bg-white'}`}>
                    <h4 className={`font-semibold ${isModern ? 'text-cyan-400' : 'text-blue-600'}`}>{cert.name}</h4>
                    <p className={`text-sm ${isModern ? 'text-gray-400' : 'text-gray-600'}`}>
                      {cert.issuer} • {cert.year}
                      {cert.expires && ` (Expires: ${cert.expires})`}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        <section id="experience" className="py-16">
          <h2 className={`text-3xl font-extrabold mb-8 ${isModern ? 'text-cyan-400' : 'text-gray-900'}`}>Work Experience</h2>
          <div className={`space-y-12 border-l-4 ${isModern ? 'border-gray-700' : 'border-blue-200'} ml-3 pl-8`}>
            {experience.map((exp)=> (
              <div key={exp.id} className="relative">
                <div className={`absolute left-[-22px] top-0 w-4 h-4 rounded-full ${isModern ? 'bg-cyan-600 border-4 border-gray-900' : 'bg-blue-600 border-4 border-white'}`} />
                <div>
                  <p className={`text-sm font-semibold uppercase mb-1 ${isModern ? 'text-cyan-400' : 'text-blue-600'}`}>{exp.year}</p>
                  <h3 className={`text-xl font-bold mb-1 ${isModern ? 'text-white' : 'text-gray-800'}`}>{exp.title} at {exp.company}</h3>
                  <p className={`${isModern ? 'text-gray-300' : 'text-gray-700'}`}>{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="py-16">
          <h2 className={`text-3xl font-extrabold mb-8 ${isModern ? 'text-cyan-400' : 'text-gray-900'}`}>Key Projects</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((proj) => (
              <div key={proj.id} className={`p-6 rounded-xl shadow-lg ${isModern ? 'bg-gray-800' : 'bg-white'}`}>
                <h3 className={`text-xl font-bold mb-2 ${isModern ? 'text-white' : 'text-gray-800'}`}>{proj.title}</h3>
                <p className={`${isModern ? 'text-gray-400' : 'text-gray-600'}`}>{proj.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="py-16">
          <h2 className={`text-3xl font-extrabold mb-8 ${isModern ? 'text-cyan-400' : 'text-gray-900'}`}>Contact & Links</h2>
          <div className={`p-8 rounded-xl shadow-xl flex flex-col sm:flex-row justify-around items-center ${isModern ? 'bg-gray-800' : 'bg-gray-50'}`}>
            <p className={`text-lg flex items-center ${isModern ? 'text-gray-300' : 'text-gray-700'}`}><Mail className="w-5 h-5 mr-2" /><a href={`mailto:${personal.email}`} className="font-medium">{personal.email}</a></p>
            <p className={`text-lg flex items-center ${isModern ? 'text-gray-300' : 'text-gray-700'}`}>{personal.phone || 'N/A'}</p>
            <a href={personal.linkedin} target="_blank" rel="noreferrer" className={`text-lg flex items-center ${isModern ? 'text-gray-300' : 'text-blue-600'}`}><Layers className="w-5 h-5 mr-2" /> LinkedIn</a>
          </div>
        </section>
      </main>

      <CodeExportModal show={showExportModal} onClose={() => setShowExportModal(false)} generatedCode={generatedCode} />
    </div>
  );
};

export default PortfolioPreview;
