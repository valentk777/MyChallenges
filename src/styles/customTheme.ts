import {baseTheme} from './baseTheme';
import {AppTheme, Palette, Shadow, Shadows, Sizes} from './themeModels';

const palette: Palette = {
  canvas: '#FFFFFF',
  canvasInverted: '#74858C',
  primary: '#0d132B',
  secondary: '#1F4063',
  tertiary: '#079AA4',
  exceptional: '#E32F45',
};

const sizes: Sizes = {
  small: 8,
  medium: 16,
  large: 24,
  extraLarge: 30,
};

const shadows: Shadows = {
  light: {
    shadowColor: palette.canvasInverted,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  } as Shadow,
  medium: {
    shadowColor: palette.canvasInverted,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  } as Shadow,
  dark: {
    shadowColor: palette.canvasInverted,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
  } as Shadow,
  primary: {
    shadowColor: palette.tertiary,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,

    elevation: 5,
  } as Shadow,
};

export const customTheme: AppTheme = {
  ...baseTheme,
  colors: palette,
  sizes: sizes,
  shadows: shadows,
};

export const customDarkTheme = {
  ...customTheme,
  colors: {
    ...customTheme.colors,
  },
};
