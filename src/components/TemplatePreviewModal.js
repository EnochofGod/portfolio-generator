import React from 'react';
import { X } from 'lucide-react';

const TemplatePreviewModal = ({ isOpen, onClose, template, generatedCode }) => {
  if (!isOpen) return null;

  const getTemplateDetails = () => {
    if (template === 'modern') {
      return {
        title: 'Modern Developer Portfolio',
        subtitle: 'Modern Developer Portfolio Preview',
        features: [
          'Dynamic grid layout for projects and skills',
          'Dark mode optimized with accent gradients',
          'Interactive project cards with hover effects',
          'Prominent hero section with custom animations',
          'Integrated tech stack showcase',
          'GitHub activity timeline integration',
          'Built-in theme customization'
        ],
        techStack: ['React', 'Tailwind CSS', 'CSS Grid', 'Smooth Animations'],
        image: '/images/templates/modern-preview.svg'
      };
    }
    return {
      title: 'Classic Professional Portfolio',
      features: [
        'Clean, sidebar-based navigation',
        'Dedicated sections for experience and skills',
        'Professional contact information layout',
        'Optimized for readability and content focus',
        'Print-friendly design',
        'Customizable accent colors',
        'Responsive layout across all devices'
      ],
      techStack: ['Clean Typography', 'Sidebar Navigation', 'Whitespace Optimization', 'Content-First Design'],
      image: '/images/templates/classic-preview.svg'
    };
  };

  const details = getTemplateDetails();

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9999] flex items-end sm:items-center justify-center">
      {/* Slide-up animation styles scoped to this modal */}
      <style>{`
        @keyframes slideUp { from { transform: translateY(30%); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
        .modal-panel { animation: slideUp 360ms cubic-bezier(.2,.9,.2,1) both; }
      `}</style>
      <div className="bg-white dark:bg-gray-900 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl m-4 modal-panel">
        <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{details.title}</h2>
            {details.subtitle && <div className="text-sm text-gray-500">{details.subtitle}</div>}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        <div className="p-6">
          {/* Large Preview: embed generated HTML when available, otherwise show image */}
          <div className="relative aspect-[16/10] mb-8 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50">
            {generatedCode ? (
              <iframe
                title={`${details.title} Live Preview`}
                srcDoc={generatedCode}
                className="w-full h-full"
                style={{ border: 'none' }}
                sandbox="allow-scripts allow-same-origin"
              />
            ) : (
              <img
                src={details.image}
                alt={`${details.title} Preview`}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Key Features</h3>
              <ul className="space-y-3">
                {details.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {details.techStack.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplatePreviewModal;