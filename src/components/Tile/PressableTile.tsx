import React, {useContext} from 'react';
import {StyleSheet, Text, Image, ButtonProps, Pressable} from 'react-native';
import {Challenge} from '../../entities/challenge';
import {ThemeContext} from '../../contexts/themeContext';

interface TileProps extends ButtonProps {
  challenge: Challenge;
}

export const PressableTile = (props: TileProps) => {
  const {onPress, challenge} = props;

  const {theme} = useContext(ThemeContext);
  const styles = createStyles(theme);

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Image style={styles.image} source={{uri: challenge.image}} />
      <Text style={styles.title}>{challenge.title}</Text>
    </Pressable>
  );
};

const createStyles = (theme: typeof customTheme) => {
  const styles = StyleSheet.create({
    container: {
      borderWidth: 2,
      borderRadius: 10,
      width: 170,
      height: 200,
      backgroundColor: theme.colors.secondary,
      borderColor: theme.colors.border,
    },
    title: {
      fontSize: 20,
      fontFamily: theme.text.fontFamily,
      color: theme.colors.text,
      paddingLeft: 10,
    },
    image: {
      width: '100%',
      height: '60%',
      borderRadius: 10,
    },
  });

  return styles;
};
