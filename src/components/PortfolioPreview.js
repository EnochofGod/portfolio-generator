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
      <div className="min-h-screen bg-gray-50 text-gray-900 overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <button onClick={() => setView('config')} className="flex items-center text-sm font-semibold px-3 py-2 rounded-lg bg-blue-600 text-white">
                <ArrowLeft className="w-4 h-4 mr-2" /> Edit Data
              </button>
              <h2 className="text-lg font-bold">Classic Template </h2>
            </div>

            <div className="flex items-center gap-3">
              <button onClick={() => setShowExportModal(true)} className="flex items-center text-sm font-semibold px-3 py-2 rounded-lg bg-green-600 text-white">
                <Code className="w-4 h-4 mr-2" /> Export HTML
              </button>
              <button onClick={openGeneratedHtmlInNewTab} className="flex items-center text-sm font-semibold px-3 py-2 rounded-lg bg-indigo-600 text-white">
                <Layers className="w-4 h-4 mr-2" /> Open Preview
              </button>
            </div>
          </div>

          <div className="border rounded-lg shadow-sm overflow-hidden">
            {/* Render the exact exported HTML inside a sandboxed iframe so preview matches export */}
            <iframe
              title="Classic Template Export Preview"
              srcDoc={generatedCode}
              className="w-full h-[90vh] md:h-[90vh] lg:h-[90vh]"
              style={{ border: 'none' }}
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
        </div>

        <CodeExportModal show={showExportModal} onClose={() => setShowExportModal(false)} generatedCode={generatedCode} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <header className="sticky top-0 z-20 shadow-xl bg-gray-800">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div            
            className="flex  space-x-8 items-center justify-between mb-4">
            <div>
            <button onClick={() => setView('config')} className={`flex items-center text-sm font-semibold px-4 py-2 rounded-lg ${isModern ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-700'}`}>
              <ArrowLeft className="w-4 h-4 mr-2" /> Edit Data
            </button>
            </div>
            <h2 className="text-lg font-bold">Modern Template </h2>
            <div style={{display:'flex', gap:"1rem"}}>
            <button onClick={() => setShowExportModal(true)} className="flex items-center text-sm font-semibold px-4 py-2 rounded-lg bg-green-600 text-white">
              <Code className="w-4 h-4 mr-2" /> Export HTML
            </button>
            <button onClick={openGeneratedHtmlInNewTab} className="flex items-center text-sm font-semibold px-4 py-2 rounded-lg bg-indigo-600 text-white">
              <Layers className="w-4 h-4 mr-2" /> Open Preview
            </button>
            </div>
          </div>
        </nav>
      </header>

  <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 overflow-x-hidden">
        {/* Mobile nav panel */}
        {mobileNavOpen && (
          <div className="sm:hidden bg-gray-800 text-white p-4 rounded-lg mb-4">
            <div className="flex flex-col space-y-2">
              {sections.map((id) => (
                <button key={id} onClick={() => { postNavigateMessage(id); setMobileNavOpen(false); }} className="text-left block py-2 px-3 rounded-md hover:bg-gray-700">{id.charAt(0).toUpperCase() + id.slice(1)}</button>
              ))}
            </div>
          </div>
        )}

        <div className="border rounded-lg shadow-sm overflow-hidden">
            <iframe
              ref={iframeRef}
              title="Modern Template Export Preview"
              srcDoc={generatedCode}
              className="w-full h-[60vh] md:h-[80vh] lg:h-[90vh] bg-white"
              style={{ border: 'none', overflow: 'hidden' }}
              sandbox="allow-scripts allow-same-origin"
            />
        </div>
      </main>

      <CodeExportModal show={showExportModal} onClose={() => setShowExportModal(false)} generatedCode={generatedCode} />
    </div>
  );
};

export default PortfolioPreview;
