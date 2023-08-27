import React, { useContext, useState } from 'react';
import { StyleSheet, Text, Image, ButtonProps, Pressable, View, TouchableOpacity, Alert } from 'react-native';
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
    Alert.alert("error saving to storage");
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

const convertUTCToLocalTime = (utcTime: string) => {
  if (utcTime == null) {
    return "";
  }

  const date = new Date(utcTime);

  return date.toLocaleString();
};

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

  const title = challenge.title.length < 12 ? challenge.title : challenge.title.substring(0, 12) + "...";
  const description = challenge.description.length < 17 ? challenge.description : challenge.description.substring(0, 16) + "...";
  const timeCreated = convertUTCToLocalTime(challenge.timeCreated);

  return (
    <Pressable style={[{ backgroundColor: color }, styles.container, styles.shadow]} onPress={onPress}>
      <Image
        style={styles.image}
        source={{ uri: challenge.image }}
        resizeMode='stretch' />
      <View style={styles.textArea}>
        <View style={styles.space} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.time}>{timeCreated}</Text>
        <View style={styles.space} />
      </View>
      <TouchableOpacity
        style={styles.heart}
        onPress={onPressFavorite}
      >
        {renderIcon(styles, isFavorite)}
      </TouchableOpacity>
      <Image
        source={require('../../assets/icons/angle-right.png')}
        resizeMode='contain'
        style={styles.arrowIcon}
      />
      <View style={styles.space} />
    </Pressable>
  );
};

const createStyles = (theme: typeof customTheme) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      height: 90,
      marginTop: 10,
      borderTopColor: theme.colors.black,
      borderTopWidth: 1,
      borderBottomColor: theme.colors.black,
      borderBottomWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.white,
      borderRadius: 10,
    },
    shadow: {
      shadowColor: theme.colors.input,
      shadowOpacity: 0.25,
      shadowRadius: 3.5,
      elevation: 5,
      shadowOffset: {
        width: 0,
        height: 10,
      }
    },
    image: {
      flex: 3,
      width: 60,
      height: 60,
      borderRadius: 100,
      margin: 10,
    },
    textArea: {
      flex: 5,
    },
    space: {
      flex: 1,
    },
    title: {
      flex: 2,
      fontSize: 18,
      fontFamily: theme.text.fontFamily,
      color: theme.colors.black,
      paddingLeft: 10,
    },
    description: {
      flex: 2,
      fontSize: 14,
      fontFamily: theme.text.fontFamily,
      color: theme.colors.black,
      paddingLeft: 10,
    },
    time: {
      flex: 2,
      fontSize: 10,
      fontFamily: theme.text.fontFamily,
      color: theme.colors.black,
      paddingLeft: 10,
    },
    heart: {
      flex: 2,
    },
    hearIcon: {
      height: 30,
      width: 30,
      tintColor: theme.colors.focused
    },
    arrowIcon: {
      flex: 1,
      height: 20,
      width: 30,
      tintColor: theme.colors.black,
    },
  });

  return styles;
};
