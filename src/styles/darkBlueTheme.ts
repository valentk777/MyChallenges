import {baseTheme} from './baseTheme';
import {AppTheme, Palette, Shadow, Shadows} from './themeModels';

const palette: Palette = {
  canvas: '#FFFFFF',
  canvasInverted: '#74858C',
  primary: '#0d132B',
  secondary: '#1F4063',
  tertiary: '#079AA4',
  exceptional: '#E32F45',
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

export const darkBlueTheme: AppTheme = {
  ...baseTheme,
  colors: palette,
  shadows: {
    ...baseTheme.shadows,
    ...shadows
  },
};
