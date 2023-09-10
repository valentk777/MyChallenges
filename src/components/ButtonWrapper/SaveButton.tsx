import React, { useContext } from 'react';
import { ButtonProps, Pressable, StyleSheet, Text } from 'react-native';
import { customTheme } from '../../styles/customTheme';
import { ThemeContext } from '../../contexts/themeContext';
import LinearGradient from 'react-native-linear-gradient'

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
    textPrimary: {
      fontSize: 16,
      lineHeight: 35,
      fontWeight: 'bold',
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
    }
  });

  return styles;
};
