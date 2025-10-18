import React, { useState } from 'react';
import { Copy, Check, X, Code } from 'lucide-react';

const CodeExportModal = ({ show, onClose, generatedCode }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      const temp = document.createElement('textarea');
      temp.value = generatedCode;
      document.body.appendChild(temp);
      temp.select();
      document.execCommand('copy');
      document.body.removeChild(temp);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-80 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-6 rounded-t-2xl border-b flex justify-between items-center">
          <h3 className="text-2xl font-bold text-blue-700 flex items-center"><Code className="w-6 h-6 mr-2" /> Export & Deploy Codebase</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-800"><X className="w-6 h-6" /></button>
        </div>

        <div className="p-6">
          <div className="relative bg-gray-800 p-4 rounded-lg text-sm text-white font-mono overflow-x-auto max-h-64">
            <button onClick={handleCopy} className={`absolute top-2 right-2 p-2 rounded-lg text-white ${copied ? 'bg-green-600' : 'bg-blue-600'}`}>
              {copied ? <><Check className="w-4 h-4 mr-1 inline" /> Copied!</> : <><Copy className="w-4 h-4 mr-1 inline" /> Copy Code</>}
            </button>
            <pre className="whitespace-pre-wrap break-all pr-12">{generatedCode}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeExportModal;
