import React, { ProviderProps, createContext, useContext, useMemo, useState } from 'react';
import { customTheme } from '../styles/customTheme';

interface IThemeContext {
  theme: typeof customTheme;
}

export const ThemeContext = createContext<IThemeContext>({
  theme: customTheme,
});

interface ThemeContextProviderProps
  extends Omit<ProviderProps<ThemeContextProviderProps>, 'value'> {
}

export const ThemeProvider = ({ children }: ThemeContextProviderProps) => {
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
