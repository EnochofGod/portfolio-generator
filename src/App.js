import React, { useEffect } from 'react';
import defaultData from './data/defaultData';
import WelcomePage from './components/WelcomePage';
import ConfigForm from './components/ConfigForm';
import PortfolioPreview from './components/PortfolioPreview';
import useLocalStorage from './hooks/useLocalStorage';

const App = () => {
  const [data, setData] = useLocalStorage('portfolioData', defaultData);
  const [view, setView] = useLocalStorage('currentView', 'welcome'); // 'welcome', 'config', 'preview'
  const [isLoading, setIsLoading] = React.useState(true);

  // Strictly enforce template selection before allowing config/preview
  useEffect(() => {
    if (!data.template || (data.template !== 'modern' && data.template !== 'classic')) {
      // Force back to welcome page if template isn't explicitly set to modern or classic
      setView('welcome');
      // Clear invalid template value if one exists
      if (data.template) {
        setData(prev => ({ ...prev, template: null }));
      }
    }
  }, [data.template, view, setView, setData]);

  let ComponentToRender;
  switch (view) {
    case 'config':
      ComponentToRender = <ConfigForm data={data} setData={setData} setView={setView} />;
      break;
    case 'preview':
      ComponentToRender = <PortfolioPreview data={data} setView={setView} />;
      break;
    case 'welcome':
    default:
      ComponentToRender = (
        <WelcomePage
          setTemplate={(template) => {
            setData((prevData) => ({ ...prevData, template }));
            setView('config');
          }}
          data={data}
        />
      );
      break;
  }

  // Add loading effect
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center app-container">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <h2 className="mt-4 text-xl font-semibold text-gray-200 animate-pulse">Loading your portfolio space...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-x-hidden">
      <div className="relative">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl"></div>
        </div>

        {/* Main content */}
        <div className="relative z-10">
          {ComponentToRender}
        </div>
      </div>
    </div>
  );
};

export default App;
