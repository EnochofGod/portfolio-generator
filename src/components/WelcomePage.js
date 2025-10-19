import React, { useState } from 'react';
import { Layers, Sparkles, Star } from 'lucide-react';
import TemplatePreviewModal from './TemplatePreviewModal';

const WelcomePage = ({ setTemplate }) => {
  const [previewTemplate, setPreviewTemplate] = useState(null);
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center py-6"></div>

      {/* Hero Section */}
      <div className="text-center mt-16 mb-12 px-4">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 tracking-tight mb-4">
          Portfolio Generator
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Create your professional portfolio in minutes. Choose a template, add your content, and showcase your work to the world.
        </p>
        <div className="flex items-center justify-center space-x-4 mt-6">
          <div className="flex items-center text-cyan-400">
            <Star className="w-5 h-5 mr-1" fill="currentColor" />
            <span>Professional Templates</span>
          </div>
          <div className="flex items-center text-cyan-400">
            <Sparkles className="w-5 h-5 mr-1" />
            <span>Easy Customization</span>
          </div>
        </div>
      </div>

      {/* Templates Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">Select Your Template</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Modern Template */}
          <div className="group relative bg-gray-800 p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer border border-gray-700 hover:border-cyan-500">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xl font-bold text-white">Modern Developer</h2>
                <span className="px-2 py-1 text-xs font-medium text-cyan-400 bg-cyan-950 rounded-full">Dark</span>
              </div>

              <div className="flex flex-col md:flex-row gap-4 items-start">
                <div className="description text-gray-400 flex-1">
                  <p className="text-sm">Dynamic portfolio with modern UI and tech focus.</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="text-xs px-2 py-1 bg-gray-900 rounded-full">Grid Layout</span>
                    <span className="text-xs px-2 py-1 bg-gray-900 rounded-full">Dark Theme</span>
                    <span className="text-xs px-2 py-1 bg-gray-900 rounded-full">GitHub</span>
                  </div>
                </div>

                <div 
                  className="thumbnail w-full md:w-40 h-32 bg-gray-950 rounded-lg overflow-hidden relative shadow-lg group cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPreviewTemplate('modern');
                  }}
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-600"></div>
                  <img 
                    src="/images/templates/modern-preview.svg" 
                    alt="Modern Template Preview"
                    className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-xs font-medium">Click to preview</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setTemplate('modern')}
                className="mt-4 w-full py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-lg hover:from-cyan-600 hover:to-blue-700 transition duration-300 flex items-center justify-center text-sm"
              >
                <Layers className="w-4 h-4 mr-2" />
                Select Modern Theme
              </button>
            </div>
          </div>

          {/* Classic Template */}
          <div className="group relative bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer border border-gray-200 hover:border-blue-500">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xl font-bold text-gray-900">Classic Professional</h2>
                <span className="px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full">Light</span>
              </div>

              <div className="flex flex-col md:flex-row gap-4 items-start">
                <div className="description text-gray-600 flex-1">
                  <p className="text-sm">Clean, timeless design for professional portfolios.</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">Sidebar</span>
                    <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">Timeline</span>
                    <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">Print</span>
                  </div>
                </div>

                <div 
                  className="thumbnail w-full md:w-40 h-32 bg-gray-50 rounded-lg overflow-hidden relative shadow-lg border border-gray-100 group cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPreviewTemplate('classic');
                  }}
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                  <img 
                    src="/images/templates/classic-preview.svg" 
                    alt="Classic Template Preview"
                    className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-xs font-medium">Click to preview</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setTemplate('classic')}
                className="mt-4 w-full py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 transition duration-300 flex items-center justify-center text-sm"
              >
                <Layers className="w-4 h-4 mr-2" />
                Select Classic Theme
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Preview Modal */}
      <TemplatePreviewModal
        isOpen={!!previewTemplate}
        onClose={() => setPreviewTemplate(null)}
        template={previewTemplate}
      />
    </div>
  );
};

export default WelcomePage;
