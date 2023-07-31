import React, { useContext } from 'react';
import { ButtonProps, Pressable, StyleSheet, Text } from 'react-native';
import { customTheme } from '../../styles/customTheme';
import { ThemeContext } from '../../contexts/themeContext';
import LinearGradient from 'react-native-linear-gradient'

export enum ButtonTypes {
  Primary,
  Secondary,
}

interface ExpandedButtonProps extends ButtonProps {
  type: ButtonTypes;
}

export const Button = (props: ExpandedButtonProps) => {
  const { onPress, title, type } = props;

  const { theme } = useContext(ThemeContext);
  const styles = createStyles(theme);

  return (
    <Pressable
      style={
        type == ButtonTypes.Primary
          ? styles.buttonPrimary
          : styles.buttonSecondary
      }
      onPress={onPress}>
      <Text
        style={
          type == ButtonTypes.Primary
            ? styles.textPrimary
            : styles.textSecondary
        }>
        {title}
      </Text>
    </Pressable>
  );
};

export const SaveButton = (props: ButtonProps) => {
  const { onPress, title } = props;

  const { theme } = useContext(ThemeContext);
  const styles = createStyles(theme);

  return (
    <Pressable
      onPress={onPress}>
      <LinearGradient
        colors={styles.buttonSave.colors}
        style={styles.buttonSave}
      >
        <Text
          style={styles.textPrimary}>
          {title}
        </Text>

      </LinearGradient>

    </Pressable>
  );
};

const createStyles = (theme: typeof customTheme) => {
  const styles = StyleSheet.create({
    buttonPrimary: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      borderRadius: 10,
      backgroundColor: theme.colors.primaryButton,
      borderColor: theme.colors.border,
      marginBottom: 20,
    },
    textPrimary: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      color: theme.colors.text,
    },
    buttonSecondary: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      borderRadius: 10,
      backgroundColor: theme.colors.secondaryButton,
      borderColor: theme.colors.border,
      borderWidth: 3,
    },
    textSecondary: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: theme.colors.text,
    },
    buttonSave: {
      height: '100%',
      width: '100%',
      colors: [theme.colors.primary, '#242c50', theme.colors.secondary],
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 5,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      // borderWidth: 5,
    },
  });
  return styles;
};
