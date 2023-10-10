import React, { ProviderProps, createContext, useContext, useMemo, useState } from 'react';
import { AppTheme } from '../styles/themeModels';
import { darkBlueTheme } from '../styles/darkBlueTheme';
import { lightGreenTheme } from '../styles/lightGreenTheme';
import { halloweenTheme } from '../styles/halloweenTheme';
import { pinkTheme } from '../styles/pinkTheme';

interface ThemeMap {
  name: string;
  color: string;
  iconName: string;
  theme: AppTheme;
}

interface IThemeContext {
  theme: AppTheme;
  getAllThemes: () => ThemeMap[];
  setCurrentTheme: (theme: AppTheme) => void;
}

export const ThemeContext = createContext<IThemeContext>({
  theme: darkBlueTheme, // default theme
  getAllThemes: () => [] as ThemeMap[],
  setCurrentTheme: (theme: AppTheme) => {}
});

const themesMap = [
  { name: 'darkBlue', color: "#1F4063", iconName: "night-mode.png", theme: darkBlueTheme },
  { name: 'lightGreen', color: "#79AC78", iconName: "light-mode.png",  theme: lightGreenTheme },
  { name: 'pink', color: "#FF8DC7", iconName: "heart-full.png", theme: pinkTheme },
  { name: 'halloween', color: "#f36a1f",  iconName: "halloween.png", theme: halloweenTheme },
] as ThemeMap[];

interface ThemeContextProviderProps
  extends Omit<ProviderProps<ThemeContextProviderProps>, 'value'> {
}

export const ThemeProvider = ({ children }: ThemeContextProviderProps) => {


  const [currentTheme, setCurrentTheme] = useState(darkBlueTheme)

  const getAllThemes = () => {
    return themesMap;
  }

  const values = useMemo(() => ({ theme: currentTheme, getAllThemes, setCurrentTheme }), [currentTheme]);

  return (
    <ThemeContext.Provider
      value={values}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
