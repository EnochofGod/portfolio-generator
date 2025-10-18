import React, { useEffect } from 'react';
import defaultData from './data/defaultData';
import WelcomePage from './components/WelcomePage';
import ConfigForm from './components/ConfigForm';
import PortfolioPreview from './components/PortfolioPreview';
import ThemeToggle from './components/ThemeToggle';
import useLocalStorage from './hooks/useLocalStorage';

const App = () => {
  const [data, setData] = useLocalStorage('portfolioData', defaultData);
  const [view, setView] = useLocalStorage('currentView', 'welcome'); // 'welcome', 'config', 'preview'
  const [isLoading, setIsLoading] = React.useState(true);

  // Ensure template is set before showing config/preview (avoid state updates during render)
  useEffect(() => {
    if (data.template === null && view !== 'welcome') {
      setView('welcome');
    }
  }, [data.template, view, setView]);

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
            setData({ ...data, template });
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="relative">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 animate-gradient"></div>
        
        {/* Main content */}
        <div className="relative">
          {ComponentToRender}
        </div>

        {/* Theme toggle and additional controls */}
        <div className="fixed bottom-4 right-4 flex items-center space-x-2">
          <ThemeToggle />
        </div>

        {/* Quick help tooltip */}
        <div className="fixed bottom-4 left-4">
          <button 
            className="p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
            title="Need help? Click here!"
            onClick={() => alert('Welcome to Portfolio Generator!\n\n1. Choose a template\n2. Fill in your information\n3. Preview and export your portfolio')}>
            ?
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
