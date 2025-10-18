import React from 'react';
import { X } from 'lucide-react';

const SectionCard = ({ title, children, onRemove }) => (
  <div className="group p-6 bg-white rounded-xl shadow-md border border-gray-200 mb-6 transition-all duration-300 hover:shadow-lg hover:border-blue-200">
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center space-x-2">
        <div className="w-1 h-6 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">{title}</h3>
      </div>
      {onRemove && (
        <button 
          onClick={onRemove} 
          className="relative p-2 text-red-500 hover:text-red-700 rounded-full hover:bg-red-50 transition-all duration-300 group/btn" 
          title="Remove Item"
        >
          <X className="w-5 h-5 transition-transform group-hover/btn:rotate-90" />
          <span className="absolute -top-8 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/btn:opacity-100 transition-opacity">
            Remove section
          </span>
        </button>
      )}
    </div>
    <div className="space-y-4 transition-all duration-300 group-hover:translate-x-2">
      {children}
    </div>
    {/* Bottom decoration line */}
    <div className="h-0.5 w-full bg-gradient-to-r from-blue-500/0 via-blue-500/20 to-blue-500/0 mt-4 opacity-0 group-hover:opacity-100 transition-opacity"></div>
  </div>
);

export default SectionCard;
