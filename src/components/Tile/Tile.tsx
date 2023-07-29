import React, {useContext} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Challenge} from '../../entities/challenge';
import {ThemeContext} from '../../contexts/themeContext';

interface TileProps {
  challenge: Challenge;
}

export const Tile = (props: TileProps) => {
  const {title, description, image} = props.challenge;
  const {theme} = useContext(ThemeContext);
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri: image}} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const createStyles = (theme: typeof customTheme) => {
  const styles = StyleSheet.create({
    container: {
      borderWidth: 2,
      borderRadius: 3,
      width: '90%',
      height: '100%',
    },
    label: {
      fontSize: 20,
      paddingLeft: 10,
      paddingTop: 10,
    },
    title: {
      fontSize: 20,
      color: 'black',
      fontWeight: 'bold',
      paddingLeft: 10,
    },
    description: {
      fontSize: 20,
      color: 'black',
      paddingLeft: 10,
    },
    image: {
      width: '100%',
      height: '70%',
    },
  });

  return styles;
};
