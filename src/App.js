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
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <h2 className="mt-4 text-xl font-semibold text-gray-200 animate-pulse">Loading your portfolio space...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="relative">
        {/* Main content */}
        <div className="relative">
          {ComponentToRender}
        </div>
      </div>
    </div>
  );
};

export default App;
