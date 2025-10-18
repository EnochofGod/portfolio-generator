import React from 'react';
import { Layers, Code, Sparkles, Star, Github } from 'lucide-react';

const WelcomePage = ({ setTemplate }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Header */}
      <div className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Code className="w-5 h-5 text-white" />
            <span className="text-white font-semibold">Portfolio Generator</span>
          </div>
          <a href="https://github.com/EnochofGod/portfolio-generator" 
             target="_blank" 
             rel="noopener noreferrer"
             className="flex items-center text-white hover:text-gray-100 text-sm">
            <Github className="w-4 h-4 mr-1" />
            View on GitHub
          </a>
        </div>
      </div>

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
          <div onClick={() => setTemplate('modern')} 
               className="group relative bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer border border-gray-700 hover:border-cyan-500">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-white">Modern Developer</h2>
                <span className="px-3 py-1 text-xs font-medium text-cyan-400 bg-cyan-950 rounded-full">Dark Theme</span>
              </div>
              <p className="text-gray-400 mb-6">A modern, high-contrast theme perfect for developers and tech professionals.</p>
              <div className="h-48 bg-gray-950 rounded-xl overflow-hidden relative shadow-lg">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-600"></div>
                <div className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-gray-900 font-bold text-sm">JD</div>
                    <div className="text-cyan-400 font-medium">Jane Doe</div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="h-2 w-3/4 bg-gray-800 rounded"></div>
                    <div className="h-2 w-1/2 bg-gray-800 rounded"></div>
                  </div>
                </div>
              </div>
              <button className="mt-6 w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-blue-700 transition duration-300 flex items-center justify-center">
                <Layers className="w-5 h-5 mr-2" />
                Select Modern Theme
              </button>
            </div>
          </div>

          {/* Minimal Template */}
          <div onClick={() => setTemplate('minimal')} 
               className="group relative bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer border border-gray-200 hover:border-blue-500">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Minimal Professional</h2>
                <span className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full">Light Theme</span>
              </div>
              <p className="text-gray-600 mb-6">A clean, minimalist design that puts your content in the spotlight.</p>
              <div className="h-48 bg-gray-50 rounded-xl overflow-hidden relative shadow-lg border border-gray-100">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                <div className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">JD</div>
                    <div className="text-gray-900 font-medium">Jane Doe</div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="h-2 w-3/4 bg-gray-200 rounded"></div>
                    <div className="h-2 w-1/2 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
              <button className="mt-6 w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition duration-300 flex items-center justify-center">
                <Layers className="w-5 h-5 mr-2" />
                Select Minimal Theme
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
