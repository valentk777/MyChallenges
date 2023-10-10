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
  } as Shadow,
  medium: {
    shadowColor: palette.canvasInverted,
  } as Shadow,
  dark: {
    shadowColor: palette.canvasInverted,
  } as Shadow,
  primary: {
    shadowColor: palette.tertiary,
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
