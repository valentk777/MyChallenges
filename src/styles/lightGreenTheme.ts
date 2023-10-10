import {baseTheme} from './baseTheme';
import {AppTheme, Palette, Shadow, Shadows} from './themeModels';

const palette: Palette = {
  canvas: '#FFFFFF',
  canvasInverted: '#74858C',
  primary: '#435334',
  secondary: '#85A389',
  tertiary: '#79AC78',
  exceptional: '#FF8080',
};

const shadows: Shadows = {
  light: {
    shadowColor: palette.canvasInverted,
    ...baseTheme.shadows.light,
  } as Shadow,
  medium: {
    shadowColor: palette.canvasInverted,
    ...baseTheme.shadows.medium,
  } as Shadow,
  dark: {
    shadowColor: palette.canvasInverted,
    ...baseTheme.shadows.dark,
  } as Shadow,
  primary: {
    shadowColor: palette.tertiary,
    ...baseTheme.shadows.primary,
  } as Shadow,
};

export const lightGreenTheme: AppTheme = {
  ...baseTheme,
  colors: palette,
  shadows: {
    ...baseTheme.shadows,
    ...shadows
  },
};
