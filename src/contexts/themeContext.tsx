import React, { createContext, useState } from 'react';
import {customDarkTheme, customTheme} from '../styles/customTheme';

interface ContextProvider {
  isDarkMode: boolean;
  theme: typeof customTheme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ContextProvider>({
  isDarkMode: false,
  theme: customTheme,
  toggleTheme: () => {},
});

export const ThemeProvider: React.FunctionComponent = ({children}) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode: darkMode,
        theme: darkMode ? customDarkTheme : customTheme,
        toggleTheme: toggleTheme,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};
