import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { customTheme } from '../../styles/customTheme';
import CircularProgress from 'react-native-circular-progress-indicator';
import { ChallengeContext } from '../../hooks/useChallenge';
import challengesService from '../../services/challengesService';

interface NumericProgressTileProps {
}

const getCroppedTest = (text: string, cropUntil: number) => {
  return text.length < cropUntil ? text : text.substring(0, cropUntil) + "...";
}

export const NumericProgressTile = (props: NumericProgressTileProps) => {
  const { newValue, challenge } = useContext(ChallengeContext);
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const percentage = challengesService.getPercentage(newValue, challenge.initialValue, challenge.targetValue);
  const initialPercentage = challengesService.getPercentage(challenge.currentValue, challenge.initialValue, challenge.targetValue)

  console.log(JSON.stringify(challenge));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{getCroppedTest(challenge.title, 17)}</Text>
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
      fontSize: 23,
      color: theme.colors.canvas,
      height: '21%',
      fontFamily: theme.fonts.semiBold,
    },
    progress: {
      activeStrokeColor: theme.colors.canvas,
      circleBackgroundColor: theme.colors.secondary,
      inActiveStrokeColor: theme.colors.primary,
    },
    descriptionArea: {
      marginTop: '3%',
      width: '80%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    description: {
      fontFamily: theme.fonts.light,
      fontSize: 15,
      color: theme.colors.canvas,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  return styles;
};
