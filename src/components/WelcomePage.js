import React, { useState } from 'react';
import { Layers, Sparkles, Star } from 'lucide-react';
import TemplatePreviewModal from './TemplatePreviewModal';
import generateStaticHtml from '../utils/generateStaticHtml';
import defaultData from '../data/defaultData';

const WelcomePage = ({ setTemplate, data }) => {
  const [previewTemplate, setPreviewTemplate] = useState(null);
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      

      {/* Hero Section */}
      <div className="relative z-10 text-center mt-20 mb-16 px-4">
        <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-cyan-300 text-sm font-medium mb-6 border border-white/20">
          <Sparkles className="w-4 h-4 mr-2" />
          Create stunning portfolios in minutes
        </div>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 tracking-tight mb-6 leading-tight">
          Portfolio
          <br />
          <span className="text-white">Generator</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
          Transform your professional story into a stunning digital portfolio.
          Choose from premium templates, customize with your content, and launch your online presence instantly.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 mt-8 mb-12">
          <div className="flex items-center text-cyan-300 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
            <Star className="w-5 h-5 mr-2" fill="currentColor" />
            <span className="font-medium">Professional Templates</span>
          </div>
          <div className="flex items-center text-purple-300 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
            <Sparkles className="w-5 h-5 mr-2" />
            <span className="font-medium">Easy Customization</span>
          </div>
          <div className="flex items-center text-blue-300 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
            <Layers className="w-5 h-5 mr-2" />
            <span className="font-medium">Instant Export</span>
          </div>
        </div>
      </div>

      {/* Templates Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Choose Your Style</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Select from our professionally designed templates, each crafted to showcase your unique professional journey.
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Modern Template */}
          <div className="group relative bg-white/10 backdrop-blur-xl p-6 sm:p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-[1.02] cursor-pointer border border-white/20 hover:border-cyan-400/50 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-600/10 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-blue-500"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Layers className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Modern Developer</h2>
                </div>
                <span className="px-3 py-1 text-xs font-semibold text-cyan-300 bg-cyan-500/20 backdrop-blur-sm rounded-full border border-cyan-400/30">Dark Theme</span>
              </div>

              <div className="flex flex-col lg:flex-row gap-6 items-start">
                <div className="description text-gray-300 flex-1">
                  <p className="text-base mb-3 leading-relaxed">A sleek, contemporary portfolio designed for developers who want to showcase their technical expertise with cutting-edge design.</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="text-xs px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-400/30">Grid Layout</span>
                    <span className="text-xs px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full border border-blue-400/30">Dark Theme</span>
                    <span className="text-xs px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full border border-purple-400/30">Interactive</span>
                    <span className="text-xs px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full border border-indigo-400/30">GitHub Ready</span>
                  </div>
                </div>

                <div
                  className="thumbnail w-full lg:w-48 h-32 sm:h-40 lg:h-36 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden relative shadow-2xl group cursor-pointer border border-white/10"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPreviewTemplate('modern');
                  }}
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-blue-500"></div>
                  <img
                    src="/images/templates/modern-preview.svg"
                    alt="Modern Template Preview"
                    className="w-full h-full object-cover transform transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-sm font-semibold flex items-center">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Preview Template
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setTemplate('modern')}
                className="mt-6 w-full py-3 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:via-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center text-base shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Layers className="w-5 h-5 mr-2" />
                Choose Modern Template
              </button>
            </div>
          </div>

          {/* Classic Template */}
          <div className="group relative bg-white/10 backdrop-blur-xl p-6 sm:p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-[1.02] cursor-pointer border border-white/20 hover:border-blue-400/50 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-600/10 to-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-500"></div>
            <div className="relative">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Layers className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-lg sm:text-2xl font-bold text-white">Classic Professional</h2>
                </div>
                <span className="px-2 py-1 text-xs font-semibold text-blue-300 bg-blue-500/20 backdrop-blur-sm rounded-full border border-blue-400/30 self-start sm:self-auto">Light Theme</span>
              </div>

              <div className="flex flex-col lg:flex-row gap-6 items-start">
                <div className="description text-gray-300 flex-1">
                  <p className="text-base mb-3 leading-relaxed">An elegant, traditional portfolio perfect for professionals seeking a clean, timeless presentation of their career achievements.</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="text-xs px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full border border-blue-400/30">Sidebar Layout</span>
                    <span className="text-xs px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full border border-purple-400/30">Timeline</span>
                    <span className="text-xs px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full border border-indigo-400/30">Print Ready</span>
                    <span className="text-xs px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-400/30">Professional</span>
                  </div>
                </div>

                <div
                  className="thumbnail w-full lg:w-48 h-32 sm:h-40 lg:h-36 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden relative shadow-2xl group cursor-pointer border border-white/10"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPreviewTemplate('classic');
                  }}
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-500"></div>
                  <img
                    src="/images/templates/classic-preview.svg"
                    alt="Classic Template Preview"
                    className="w-full h-full object-cover transform transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-sm font-semibold flex items-center">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Preview Template
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setTemplate('classic')}
                className="mt-6 w-full py-3 bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:via-purple-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center text-base shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Layers className="w-5 h-5 mr-2" />
                Choose Classic Template
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Preview Modal (live HTML preview embedded) */}
      <TemplatePreviewModal
        isOpen={!!previewTemplate}
        onClose={() => setPreviewTemplate(null)}
        template={previewTemplate}
        generatedCode={previewTemplate ? generateStaticHtml({ ...defaultData, template: previewTemplate }) : null}
      />
    </div>
  );
};

export default WelcomePage;
