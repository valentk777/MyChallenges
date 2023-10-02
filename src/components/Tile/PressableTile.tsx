import React, { useContext, useState } from 'react';
import { StyleSheet, Text, Image, ButtonProps, Pressable, View, TouchableOpacity } from 'react-native';
import { Challenge } from '../../entities/challenge';
import { ThemeContext } from '../../contexts/themeContext';
import { customTheme } from '../../styles/customTheme';
import { icons } from '../../assets';
import challengesService from '../../services/challengesService';
import timeService from '../../services/timeService';
import { SvgFileNamesToComponentsMap } from '../../assets/svgIndex';
import { ChallengeTypes } from '../../entities/challengeTypes';

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
  // const description = getCroppedText(challenge.description, 16);
  const timeCreated = timeService.convertUTCToLocalTime(challenge.timeCreated);
  const ImageComponent = SvgFileNamesToComponentsMap[challenge.image];

  let icon = icons['calendar.png'];

  if (challenge.type === ChallengeTypes.TotalCounter) {
    icon = icons['number-blocks.png'];
  } else if (challenge.type === ChallengeTypes.DailyBolleanCalendar) {
    icon = icons['calendar.png'];
  }

  return (
    <TouchableOpacity style={[styles.container, theme.shadows.primary]} onPress={onPress}>
      <View style={styles.image}>
        <ImageComponent width={60} height={60} />
      </View>
      <View style={styles.textArea}>
        <View style={styles.titleArea}>
          <Image
            source={icon}
            resizeMode='contain'
            style={styles.textIcon}
          />
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.timeArea}>
          <Text style={styles.time}>{timeCreated}</Text>
        </View>
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
    </TouchableOpacity>
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
      flex: 7,
      flexDirection: 'column',
    },
    titleArea: {
      flex: 1,
      alignItems: 'flex-end',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    textIcon: {
      flex: 1,
      height: '60%',
      tintColor: theme.colors.card,
    },
    title: {
      flex: 4,
      fontSize: 18,
      paddingLeft: 10,
      fontFamily: theme.fonts.medium,
      color: theme.colors.black,
    },
    timeArea: {
      flex: 1,
      marginTop: 5,
      justifyContent: 'flex-start',
    },
    time: {
      fontSize: 10,
      fontFamily: theme.fonts.light,
      color: theme.colors.black,
    },
    heart: {
      flex: 2,
      alignItems: 'center',
    },
    hearIcon: {
      height: 30,
      width: 30,
      tintColor: theme.colors.focused,
    },
    arrowArea: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    arrowIcon: {
      height: '25%',
      aspectRatio: 1,
      tintColor: theme.colors.black,
    },
  });

  return styles;
};
