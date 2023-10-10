import React from 'react';
import { ButtonProps, Pressable, StyleSheet, Text } from 'react-native';
import { AppTheme } from '../../styles/themeModels';
import { useTheme } from '../../hooks/useTheme';
import LinearGradient from 'react-native-linear-gradient'

export const SaveButton = (props: ButtonProps) => {
  const { onPress, title } = props;

  const { theme } = useTheme();
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

const createStyles = (theme: AppTheme) => {
  const styles = StyleSheet.create({
    textPrimary: {
      fontSize: 18,
      lineHeight: 35,
      color: theme.colors.canvas,
      fontFamily: theme.fonts.bold,
    },
    buttonSave: {
      height: '100%',
      width: '100%',
      colors: [theme.colors.primary, theme.colors.secondary],
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 5,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
    }
  });

  return styles;
};
