import React, { useContext, useState } from 'react';
import { StyleSheet, Text, Image, ButtonProps, Pressable, View, TouchableOpacity } from 'react-native';
import { Challenge } from '../../entities/challenge';
import { ThemeContext } from '../../contexts/themeContext';
import { customTheme } from '../../styles/customTheme';
import { icons } from '../../assets';
import challengesService from '../../services/challengesService';
import timeService from '../../services/timeService';

interface TileProps extends ButtonProps {
  challenge: Challenge;
}

const renderIcon = (styles: any, isFavorite: boolean) => {
  return (
    <Image
      source={isFavorite ? icons['heart-full.png'] : icons['heart-empty.png']}
      style={styles.hearIcon}
    />
  );
}

const getCroppedText = (text: string, cropUntil: number) => {
  return text.length < cropUntil ? text : text.substring(0, cropUntil) + "...";
}

export const PressableTile = (props: TileProps) => {
  const { onPress, challenge } = props;
  const { theme } = useContext(ThemeContext);
  const styles = createStyles(theme);
  const [isFavorite, onChangeFavorite] = useState(challenge.favorite);

  const onPressFavorite = async () => {
    challenge.favorite = !challenge.favorite;
    await challengesService.storeChallenge(challenge);
    onChangeFavorite(challenge.favorite);
  }

  const title = getCroppedText(challenge.title, 12);
  const description = getCroppedText(challenge.description, 16);
  const timeCreated = timeService.convertUTCToLocalTime(challenge.timeCreated);

  return (
    <Pressable style={[styles.container, theme.shadows.primary]} onPress={onPress}>
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
      <View style={styles.arrowArea}>
        <Image
          source={icons['angle-right.png']}
          resizeMode='contain'
          style={styles.arrowIcon}
        />
      </View>
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
      fontSize: 16,
      fontFamily: theme.fonts.medium,
      color: theme.colors.black,
      paddingLeft: 10,
    },
    description: {
      flex: 2,
      fontSize: 14,
      fontFamily: theme.fonts.regular,
      color: theme.colors.black,
      paddingLeft: 10,
    },
    time: {
      flex: 2,
      fontSize: 10,
      fontFamily: theme.fonts.light,
      color: theme.colors.black,
      paddingLeft: 10,
    },
    heart: {
      flex: 1.5,
      alignItems: 'center',
    },
    hearIcon: {
      height: 30,
      width: 30,
      tintColor: theme.colors.focused,
    },
    arrowArea: {
      flex: 1.5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    arrowIcon: {
      height: 20,
      width: 30,
      tintColor: theme.colors.black,
    },
  });

  return styles;
};
