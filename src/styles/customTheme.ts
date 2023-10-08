import { baseTheme } from "./baseTheme";

const palette = {
  canvas: '#FFFFFF',
  canvasInverted: '#74858C',

  primary: '#0d132b',
  secondary: '#1f4063',
  tertiary: '#079aa4',

  exceptional: '#e32f45',
};

export const customTheme = {
  ...baseTheme,
  colors: {
    ...palette
  },
  sizes: {
    small: 8,
    medium: 16,
    large: 24,
    extraLarge: 30,
  },
  shadows: {
    light: {
      shadowColor: palette.canvasInverted,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,

      elevation: 3,
    },
    medium: {
      shadowColor: palette.canvasInverted,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.29,
      shadowRadius: 4.65,

      elevation: 7,
    },
    dark: {
      shadowColor: palette.canvasInverted,
      shadowOffset: {
        width: 0,
        height: 7,
      },
      shadowOpacity: 0.41,
      shadowRadius: 9.11,

      elevation: 14,
    },
    primary: {
      shadowColor: palette.tertiary,
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
