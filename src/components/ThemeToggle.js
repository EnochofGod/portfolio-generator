import React from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
  const [isDark, setIsDark] = React.useState(() => 
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  React.useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="fixed bottom-4 right-4 p-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
      aria-label="Toggle dark mode"
    >
      {isDark ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
    </button>
  );
};

export default ThemeToggle;