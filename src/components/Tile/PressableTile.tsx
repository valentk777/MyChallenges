import React, { useContext } from 'react';
import { StyleSheet, Text, Image, ButtonProps, Pressable, View } from 'react-native';
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
    <Pressable style={[{ backgroundColor: color }, styles.container]} onPress={onPress}>
      <Image style={styles.image} source={{ uri: challenge.image }} />
      <View style={styles.textArea}>
      <View style={styles.space} />
        <Text style={styles.title}>{challenge.title}</Text>
        <Text style={styles.description}>{challenge.description}</Text>
        <View style={styles.space} />
      </View>
      <Pressable style={styles.heart}>
          {/* <Icon name="heart" size={20} color="#500" /> */}
      </Pressable>
    </Pressable>
  );
};

const createStyles = (theme: typeof customTheme) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      // borderWidth: 2,
      // borderRadius: 2,
      // width: '100%', //todo: fix this to %
      height: 150,
      marginTop: 10,
      // borderTopLeftRadius: 20,
      // borderTopRightRadius: 20,
      borderTopColor: theme.colors.black,
      borderTopWidth: 1,
      borderBottomColor: theme.colors.black,
      borderBottomWidth: 1,
      // opacity: 0.5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      // width: '100%',
      flex: 5,
      width: 100,
      height: 100,
      borderRadius: 100,
      margin: 10,
      // opacity: 0.8,
      // borderTopLeftRadius: 20,
      // borderTopRightRadius: 20,

    },
    textArea: {
      flex: 7,
    },
    space: {
      flex: 1,
    },
    title: {
      flex: 1,
      fontSize: 20,
      fontFamily: theme.text.fontFamily,
      color: theme.colors.text,
      paddingLeft: 10,
    },
    description: {
      flex: 2,
      // paddingTop: 5,
      fontSize: 15,
      fontFamily: theme.text.fontFamily,
      color: theme.colors.text,
      paddingLeft: 10,
    },
    heart: {
      flex: 2,
      // fontSize: 15,
      // fontFamily: theme.text.fontFamily,
      // color: theme.colors.text,
      // paddingLeft: 10,
    },
  });

  return styles;
};
