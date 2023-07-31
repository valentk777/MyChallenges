import React, { useContext } from 'react';
import { StyleSheet, Text, Image, ButtonProps, Pressable } from 'react-native';
import { Challenge } from '../../entities/challenge';
import { ThemeContext } from '../../contexts/themeContext';
import { customTheme } from '../../styles/customTheme';

interface TileProps extends ButtonProps {
  challenge: Challenge;
  color: string
}

export const PressableTile = (props: TileProps) => {
  const { onPress, challenge, color } = props;

  const { theme } = useContext(ThemeContext);
  const styles = createStyles(theme);
  
  return (
    <Pressable style={[{ backgroundColor: color, borderColor: color }, styles.container]} onPress={onPress}>
      <Image style={styles.image} source={{ uri: challenge.image }} />
      <Text style={styles.title}>{challenge.title}</Text>
    </Pressable>
  );
};

const createStyles = (theme: typeof customTheme) => {
  const styles = StyleSheet.create({
    container: {
      borderWidth: 2,
      borderRadius: 5,
      width: '90%',
      height: 150,
    },
    title: {
      fontSize: 15,
      fontFamily: theme.text.fontFamily,
      color: theme.colors.text,
      paddingLeft: 10,
    },
    image: {
      width: '100%',
      height: '60%',
      borderRadius: 5,
    },
  });

  return styles;
};
