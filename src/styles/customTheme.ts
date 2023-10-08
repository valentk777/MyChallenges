import { baseTheme } from "./baseTheme";

const palette = {
  darkBlue: '#0d132b',
  darkBlue2: '#1f4063',
  blue1: '#079aa4',
  electric: '#035471',
  darkBlue3: '#242c50',
  white: '#FFFFFF',
  black: '#000000',
  red: '#e32f45',
  darkRed: '#80211b',
  gray: '#74858C',
};

export const customTheme = {
  ...baseTheme,
  colors: {
    primary: palette.darkBlue,
    secondary: palette.darkBlue2,
    background: palette.darkBlue,
    primaryButton: palette.darkBlue2,
    secondaryButton: palette.blue1,
    border: palette.darkBlue2,
    card: palette.blue1,
    text: palette.white,
    notification: palette.blue1,
    input: palette.blue1,
    tile1: palette.blue1,
    tile2: palette.electric,
    tile3: palette.darkBlue3,
    white: palette.white,
    black: palette.black,
    focused: palette.red,
    menuNotFocused: palette.gray,
    heart: palette.darkRed,
    calendarDay: palette.blue1,
    placeholder: palette.darkBlue2,
  },
  sizes: {
    base: 8,
    small: 8,
    medium: 16,
    large: 18,
    extraLarge: 24,
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
