import {Fonts, Shadow, Shadows, Sizes} from './themeModels';

const sizes: Sizes = {
  small: 8,
  medium: 16,
  large: 24,
  extraLarge: 30,
};

const fonts: Fonts = {
  bold: 'Inter-Bold',
  semiBold: 'Inter-SemiBold',
  medium: 'Inter-Medium',
  regular: 'Inter-Regular',
  light: 'Inter-Light',
};

const shadows = {
  light: {
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  medium: {
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  dark: {
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
  },
  primary: {
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,

    elevation: 5,
  },
};

export const baseTheme = {
  fonts: fonts,
  sizes: sizes,
  shadows: shadows,
};
