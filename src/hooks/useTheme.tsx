import React, { ProviderProps, createContext, useContext, useMemo, useState } from 'react';
import { AppTheme } from '../styles/themeModels';

interface IThemeContext {
  theme: AppTheme;

  getAllThemes: () => void;
}

export const ThemeContext = createContext<IThemeContext>({
  theme: customTheme,
  getAllThemes: () => {}
});

interface ThemeContextProviderProps
  extends Omit<ProviderProps<ThemeContextProviderProps>, 'value'> {
}

export const ThemeProvider = ({ children }: ThemeContextProviderProps) => {
  const data = [
    { name: 'darkBlue', theme: customTheme },
    { key: 'item2', text: 'Item 2' },
    { key: 'item3', text: 'Item 3' },
    // Add more items as needed
  ];

  const [currentTheme, setCurrentTheme] = useState(customTheme)

  const values = useMemo(() => ({ theme: currentTheme }), []);

  return (
    <ThemeContext.Provider
      value={values}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
