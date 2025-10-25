import React, { useState, useRef } from 'react';
import { ArrowLeft, Layers, Code } from 'lucide-react';
import useActiveSection from '../hooks/useActiveSection';
import generateStaticHtml from '../utils/generateStaticHtml';
import CodeExportModal from './CodeExportModal';

const PortfolioPreview = ({ data, setView }) => {
  const { personal = {}, template } = data || {};

  const sections = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];
  const [showExportModal, setShowExportModal] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const iframeRef = useRef(null);
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

  const postNavigateMessage = (id) => {
    const anchor = getAnchorId(id);
    // iframe may be same-origin since we're using srcDoc; postMessage with structured data
    try {
      const iframe = iframeRef.current;
      if (!iframe) return;
      // post as stringified JSON for robustness
      iframe.contentWindow.postMessage(JSON.stringify({ type: 'navigate', id: anchor }), '*');
    } catch (err) {
      console.error('Failed to post navigate message to iframe', err);
    }
  };
  

  // Open the generated HTML in a new tab (blob URL) so users can inspect the export directly
  const openGeneratedHtmlInNewTab = () => {
    try {
      const blob = new Blob([generatedCode], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const win = window.open(url, '_blank');
      if (!win) {
        // popup blocked
        alert('Popup blocked — please allow popups for this site to open the preview in a new tab.');
        URL.revokeObjectURL(url);
        return;
      }
      // Give the new window a moment to load, then revoke the object URL later
      setTimeout(() => URL.revokeObjectURL(url), 60 * 1000);
    } catch (err) {
      console.error('Failed to open generated HTML in new tab', err);
      alert('Failed to open the preview in a new tab.');
    }
  };

  if (template === 'classic') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 text-gray-900 overflow-x-hidden relative">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 p-6 mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Layers className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Classic Template Preview</h2>
                  <p className="text-gray-600">Review your portfolio before exporting</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button onClick={() => setView('config')} className="flex items-center text-sm font-semibold px-4 py-2 rounded-xl bg-white/80 backdrop-blur-sm text-blue-600 hover:text-blue-800 transition-all duration-300 border border-blue-200/50 hover:border-blue-300 shadow-sm hover:shadow-md">
                  <ArrowLeft className="w-2 h-2 mr-2" /> Edit Data
                </button>
                <button onClick={() => setShowExportModal(true)} className="flex items-center text-sm font-semibold px-4 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  <Code className="w-2 h-2 mr-2" /> Export HTML
                </button>
                <button onClick={openGeneratedHtmlInNewTab} className="flex items-center text-sm font-semibold px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  <Layers className="w-2 h-2 mr-2" /> Open Preview
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 overflow-hidden">
            {/* Render the exact exported HTML inside a sandboxed iframe so preview matches export */}
            <iframe
              title="Classic Template Export Preview"
              srcDoc={generatedCode}
              className="w-full h-[70vh] md:h-[80vh] lg:h-[85vh]"
              style={{ border: 'none', borderRadius: '1rem' }}
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
        </div>

        <CodeExportModal show={showExportModal} onClose={() => setShowExportModal(false)} generatedCode={generatedCode} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-gray-100 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      <header className="relative z-10 sticky top-0 shadow-2xl bg-black/20 backdrop-blur-xl border-b border-white/10">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Layers className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Modern Template Preview</h2>
                  <p className="text-gray-300">Review your portfolio before exporting</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button onClick={() => setView('config')} className="flex items-center text-sm font-semibold px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm text-cyan-300 hover:text-white transition-all duration-300 border border-white/20 hover:border-cyan-400 shadow-sm hover:shadow-md">
                  <ArrowLeft className="w-2 h-2 mr-2" /> Edit Data
                </button>
                <button onClick={() => setShowExportModal(true)} className="flex items-center text-sm font-semibold px-4 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  <Code className="w-2 h-2 mr-2" /> Export HTML
                </button>
                <button onClick={openGeneratedHtmlInNewTab} className="flex items-center text-sm font-semibold px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  <Layers className="w-2 h-2 mr-2" /> Open Preview
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>

     <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 overflow-x-hidden">
       {/* Mobile nav panel */}
       {mobileNavOpen && (
         <div className="sm:hidden bg-black/20 backdrop-blur-xl text-white p-6 rounded-2xl shadow-2xl border border-white/20 mb-6">
           <div className="flex flex-col space-y-3">
             {sections.map((id) => (
               <button key={id} onClick={() => { postNavigateMessage(id); setMobileNavOpen(false); }} className="text-left block py-3 px-4 rounded-xl hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/30">{id.charAt(0).toUpperCase() + id.slice(1)}</button>
             ))}
           </div>
         </div>
       )}

       <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
           <iframe
             ref={iframeRef}
             title="Modern Template Export Preview"
             srcDoc={generatedCode}
             className="w-full h-[65vh] md:h-[75vh] lg:h-[80vh] bg-white"
             style={{ border: 'none', borderRadius: '1rem', overflow: 'hidden' }}
             sandbox="allow-scripts allow-same-origin"
           />
       </div>
     </main>

      <CodeExportModal show={showExportModal} onClose={() => setShowExportModal(false)} generatedCode={generatedCode} />
    </div>
  );
};

export default PortfolioPreview;
