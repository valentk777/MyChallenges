import { baseTheme } from "./baseTheme";

const palette = {
  darkBlue: '#0d132b',
  darkBlue2: '#1f4063',
  blue1: '#079aa4',

  
  darkBlue3: '#242c50',

  white: '#FFFFFF',


  electric: '#035471',
  red: '#e32f45',
  gray: '#74858C',
};









export const customTheme = {
  ...baseTheme,
  colors: {
    canvas: palette.white,
    canvasInverted: palette.gray,

    primary: palette.darkBlue,
    secondary: palette.darkBlue2,
    tertiary: palette.blue1,

    xxxxxx: palette.red,



    tile2: palette.electric,
    tile3: palette.darkBlue3,

  },
  sizes: {
    small: 8,
    medium: 16,
    large: 24,
    extraLarge: 30,
  },
  shadows: {
    light: {
      shadowColor: palette.gray,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,

      elevation: 3,
    },
    medium: {
      shadowColor: palette.gray,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.29,
      shadowRadius: 4.65,

      elevation: 7,
    },
    dark: {
      shadowColor: palette.gray,
      shadowOffset: {
        width: 0,
        height: 7,
      },
      shadowOpacity: 0.41,
      shadowRadius: 9.11,

      elevation: 14,
    },
    primary: {
      shadowColor: palette.blue1,
      shadowOpacity: 0.25,
      shadowRadius: 3.5,
      elevation: 5,
      shadowOffset: {
        width: 0,
        height: 10,
      },
    },
  },
};

export const customDarkTheme = {
  ...customTheme,
  colors: {
    ...customTheme.colors,
  },
};
