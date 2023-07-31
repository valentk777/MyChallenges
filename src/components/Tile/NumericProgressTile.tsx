import React, { useContext } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Challenge } from '../../entities/challenge';
import { ThemeContext } from '../../contexts/themeContext';
import { customTheme } from '../../styles/customTheme';
import CircularProgress from 'react-native-circular-progress-indicator';

interface NumericProgressTileProps {
  challenge: Challenge;
}

export const NumericProgressTile = (props: NumericProgressTileProps) => {
  const { title, description, currentValue, image, targetValue } = props.challenge;
  const { theme } = useContext(ThemeContext);
  const styles = createStyles(theme);

  let percentage = currentValue / targetValue * 100;
  percentage = percentage === Infinity ? 0 : percentage;
  percentage = percentage > 100 ? 100 : percentage;
  percentage = Math.floor(percentage);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.progress}>
        <CircularProgress 
          title={currentValue + " / " + targetValue}
          titleStyle={{fontSize: 13}}
          radius={100}
          value={percentage}
          initialValue={percentage}
          valueSuffix={"%"}
          activeStrokeColor={styles.progress.activeStrokeColor}
          inActiveStrokeColor={styles.progress.inActiveStrokeColor}
          inActiveStrokeOpacity={0.7}
          inActiveStrokeWidth={6}
          circleBackgroundColor={styles.progress.circleBackgroundColor}
        />
      </View>
      {/* <Image style={styles.image} source={{uri: image}} /> */}
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const createStyles = (theme: typeof customTheme) => {
  const styles = StyleSheet.create({
    container: {
      // borderWidth: 2,
      // borderRadius: 10,
      // backgroundColor: theme.colors.secondary,
      // borderColor: theme.colors.border,
      height: '100%',
      width: '100%',
      alignItems: 'center',
    },
    title: {
      paddingTop: '5%',
      fontSize: 25,
      color: theme.colors.text,
      fontWeight: 'bold',
      height: '21%',
      fontFamily: theme.text.fontFamily,
    },
    progress: {
      activeStrokeColor: theme.colors.white,
      circleBackgroundColor: theme.colors.tile2,
      inActiveStrokeColor: theme.colors.black,
    },
    description: {
      paddingTop: '3%',
      fontFamily: theme.text.fontFamily,
      fontSize: 18,
      color: theme.colors.text,
    },
    // image: {
    //   width: '100%',
    //   height: '65%',
    //   borderRadius: 10,
    // },
  });

  return styles;
};
