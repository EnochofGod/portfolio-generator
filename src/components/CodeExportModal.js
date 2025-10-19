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

        <div className="p-6 space-y-6">
          {/* Instructions Section */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
            <h4 className="text-xl font-semibold text-blue-800 mb-4">Deployment Instructions</h4>
            
            <div className="space-y-6">
              {/* GitHub Steps */}
              <div>
                <h5 className="text-lg font-medium text-blue-700 mb-2">1. Create GitHub Repository</h5>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Go to <a href="https://github.com/new" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">github.com/new</a></li>
                  <li>Create a new repository named <code className="bg-gray-100 px-2 py-1 rounded">portfolio</code> (or any name you prefer)</li>
                  <li>Keep the repository public if you want to use free Vercel hosting</li>
                  <li>Don't initialize with any files</li>
                </ol>
              </div>

              {/* Local Setup Steps */}
              <div>
                <h5 className="text-lg font-medium text-blue-700 mb-2">2. Setup Local Project</h5>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Create a new folder for your portfolio</li>
                  <li>Open terminal/command prompt in that folder</li>
                  <li>Initialize git: <code className="bg-gray-100 px-2 py-1 rounded">git init</code></li>
                  <li>Create <code className="bg-gray-100 px-2 py-1 rounded">index.html</code> and paste the code below</li>
                  <li>Add files: <code className="bg-gray-100 px-2 py-1 rounded">git add .</code></li>
                  <li>Commit: <code className="bg-gray-100 px-2 py-1 rounded">git commit -m "Initial commit"</code></li>
                  <li>Link to your repo: <code className="bg-gray-100 px-2 py-1 rounded">git remote add origin YOUR_REPO_URL</code></li>
                  <li>Push code: <code className="bg-gray-100 px-2 py-1 rounded">git push -u origin main</code></li>
                </ol>
              </div>

              {/* Vercel Steps */}
              <div>
                <h5 className="text-lg font-medium text-blue-700 mb-2">3. Deploy on Vercel</h5>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Go to <a href="https://vercel.com/new" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">vercel.com/new</a></li>
                  <li>Sign in with GitHub</li>
                  <li>Import your portfolio repository</li>
                  <li>Keep default settings and click "Deploy"</li>
                  <li>Wait for deployment to complete</li>
                  <li>Your portfolio will be live at <code className="bg-gray-100 px-2 py-1 rounded">https://your-repo-name.vercel.app</code></li>
                </ol>
              </div>

              {/* Additional Notes */}
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                <h5 className="text-lg font-medium text-yellow-800 mb-2">Pro Tips</h5>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Use a custom domain by configuring it in Vercel's project settings</li>
                  <li>Enable automatic deployments to update your site when you push changes</li>
                  <li>Add a README.md file to your repository with project information</li>
                  <li>Consider adding a LICENSE file to your repository</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Code Section */}
          <div>
            <h4 className="text-xl font-semibold text-gray-800 mb-4">Generated Code</h4>
            <div className="relative bg-gray-800 p-4 rounded-lg text-sm text-white font-mono overflow-x-auto max-h-64">
              <button onClick={handleCopy} className={`absolute top-2 right-2 p-2 rounded-lg text-white ${copied ? 'bg-green-600' : 'bg-blue-600'} transition-colors duration-200 hover:opacity-90`}>
                {copied ? <><Check className="w-4 h-4 mr-1 inline" /> Copied!</> : <><Copy className="w-4 h-4 mr-1 inline" /> Copy Code</>}
              </button>
              <pre className="whitespace-pre-wrap break-all pr-12">{generatedCode}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeExportModal;
