import React, { createContext, useMemo } from 'react';
import { customTheme } from '../styles/customTheme';

interface ContextProvider {
  theme: typeof customTheme;
}

export const ThemeContext = createContext<ContextProvider>({
  theme: customTheme,
});

export const ThemeProvider: React.FunctionComponent = ({ children }) => {
  const currentTheme = useMemo(() => ({theme: customTheme}), []); // value is cached by useMemo
  
  return (
    <ThemeContext.Provider
      value={currentTheme}>
      {children}
    </ThemeContext.Provider>
  );
};
