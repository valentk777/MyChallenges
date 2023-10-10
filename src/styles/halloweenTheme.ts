import {baseTheme} from './baseTheme';
import {AppTheme, Palette, Shadow, Shadows} from './themeModels';

const palette: Palette = {
  canvas: '#FFFFFF',
  canvasInverted: '#74858C',
  primary: '#1C1C1C',
  secondary: '#f36a1f',
  tertiary: '#f3861f',
  exceptional: '#1C1C1C',
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

export const halloweenTheme: AppTheme = {
  ...baseTheme,
  colors: palette,
  shadows: {
    ...baseTheme.shadows,
    ...shadows
  },
};
