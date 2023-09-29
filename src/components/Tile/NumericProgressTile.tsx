import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ThemeContext } from '../../contexts/themeContext';
import { customTheme } from '../../styles/customTheme';
import CircularProgress from 'react-native-circular-progress-indicator';
import { ChallengeContext } from '../../screens/challengeScreen';

interface NumericProgressTileProps {
}

const getPercentage = (currentValue: number, targetValue: number) => {
  let percentage = currentValue / targetValue * 100;
  percentage = Number(targetValue) === 0 || targetValue === undefined ? 0 : percentage;
  percentage = percentage > 100 ? 100 : percentage;
  percentage = Math.floor(percentage);

  return percentage;
}

const getCroppedTest = (text: string, cropUntil: number) => {
  return text.length < cropUntil ? text : text.substring(0, cropUntil) + "...";
}

export const NumericProgressTile = (props: NumericProgressTileProps) => {
  const { newValue, challenge } = useContext(ChallengeContext);
  const { theme } = useContext(ThemeContext);
  const styles = createStyles(theme);
  const percentage = getPercentage(newValue, challenge.targetValue);
  const initialPercentage = getPercentage(challenge.currentValue, challenge.targetValue)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{getCroppedTest(challenge.title, 15)}</Text>
      <View style={styles.progress}>
        <CircularProgress
          title={newValue + " / " + Number(challenge.targetValue)}
          titleStyle={{ fontSize: 13 }}
          radius={100}
          value={percentage}
          initialValue={initialPercentage}
          valueSuffix={"%"}
          activeStrokeColor={styles.progress.activeStrokeColor}
          inActiveStrokeColor={styles.progress.inActiveStrokeColor}
          inActiveStrokeOpacity={0.7}
          inActiveStrokeWidth={6}
          circleBackgroundColor={styles.progress.circleBackgroundColor}
        />
      </View>
      <View style={styles.descriptionArea}>
        <Text style={styles.description}>{getCroppedTest(challenge.description, 90)}</Text>
      </View>
    </View>
  );
};

const createStyles = (theme: typeof customTheme) => {
  const styles = StyleSheet.create({
    container: {
      height: '100%',
      width: '100%',
      alignItems: 'center',
    },
    title: {
      paddingTop: '5%',
      fontSize: 25,
      color: theme.colors.text,
      height: '21%',
      fontFamily: theme.fonts.semiBold,
    },
    progress: {
      activeStrokeColor: theme.colors.white,
      circleBackgroundColor: theme.colors.tile2,
      inActiveStrokeColor: theme.colors.black,
    },
    descriptionArea: {
      marginTop: '3%',
      flex: 0.8,
      width: '80%',
      alignItems: 'center',
    },
    description: {
      fontFamily: theme.fonts.light,
      fontSize: 18,
      color: theme.colors.text,
      flexWrap: 'wrap',
      flexShrink: 1,
    },
  });

  return styles;
};
