import React, { useContext, useState } from 'react';
import { StyleSheet, Text, Image, ButtonProps, Pressable, View, TouchableOpacity } from 'react-native';
import { Challenge } from '../../entities/challenge';
import { ThemeContext } from '../../contexts/themeContext';
import { customTheme } from '../../styles/customTheme';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface TileProps extends ButtonProps {
  challenge: Challenge;
  color: string
}

const storeData = async (value: Challenge) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(value.id, jsonValue);
    return true;
  } catch (e) {
    alert("error saving to storage");
    return false;
  }
};

const renderIcon = (styles, isFavorite) => {
  const image = isFavorite
    ? require('../../assets/icons/heart-full.png')
    : require('../../assets/icons/heart-empty.png');
  return (
    <Image
      source={image}
      style={styles.hearIcon}
    />
  );
}

export const PressableTile = (props: TileProps) => {
  const { onPress, challenge, color } = props;
  const { theme } = useContext(ThemeContext);
  const styles = createStyles(theme);
  const [isFavorite, onChangeFavorite] = useState(challenge.favorite);

  const onPressFavorite = async () => {
    challenge.favorite = !challenge.favorite;
    await storeData(challenge);
    onChangeFavorite(challenge.favorite);
  }

  return (
    <Pressable style={[{ backgroundColor: color }, styles.container]} onPress={onPress}>
      {/* <Image style={styles.image} source={challenge.image} /> */}
      <Image style={styles.image} source={{ uri: challenge.image }} />
      <View style={styles.textArea}>
        <View style={styles.space} />
        <Text style={styles.title}>{challenge.title}</Text>
        <Text style={styles.description}>{challenge.description}</Text>
        {/* <Text style={styles.description}>{challenge.timeCreated}</Text> */}
        <View style={styles.space} />
      </View>
      <TouchableOpacity
        style={styles.heart}
        onPress={onPressFavorite}
      >
        {renderIcon(styles, isFavorite)}
      </TouchableOpacity>
    </Pressable>
  );
};

const createStyles = (theme: typeof customTheme) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      height: 150,
      marginTop: 10,
      borderTopColor: theme.colors.black,
      borderTopWidth: 1,
      borderBottomColor: theme.colors.black,
      borderBottomWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      flex: 5,
      width: 100,
      height: 100,
      borderRadius: 100,
      margin: 10,
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
      fontSize: 15,
      fontFamily: theme.text.fontFamily,
      color: theme.colors.text,
      paddingLeft: 10,
    },
    heart: {
      flex: 2,
    },
    hearIcon: {
      height: 30,
      width: 30,
      tintColor: theme.colors.heart
    },
  });

  return styles;
};
