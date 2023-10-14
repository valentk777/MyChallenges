import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SaveButton } from '../../components/ButtonWrapper/SaveButton';
import { NumericProgressTile } from '../../components/Tile/NumericProgressTile';
import { useTheme } from '../../hooks/useTheme';
import { DailyCalendarChallenge } from '../../entities/challenge';
import { AppTheme } from '../../styles/themeModels';
import LinearGradient from 'react-native-linear-gradient'
import { ProgressStatus } from '../../entities/progressStatus';
import { MainStackParamList } from '../../navigators/MainStackNavigator';
import challengesService from '../../services/challengesService';
import { ChallengeHeader } from '../../components/Menu/ChallengeHeader';
import { ChallengeContext } from '../../hooks/useChallenge';
import timeService from '../../services/timeService';
import { ChallengeTypes } from '../../entities/challengeTypes';
import { useTranslation } from 'react-i18next';
import BooleanStatusCalendar from '../../components/CalendarWrapper/BooleanStatusCalendar';

type DailyCalendarChallengeScreenProps = NativeStackScreenProps<MainStackParamList, 'DailyCalendarChallengeScreen'>;

export const DailyCalendarChallengeScreen = ({ route, navigation }: DailyCalendarChallengeScreenProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const { t } = useTranslation('daily-calendar-challenge-screen')

  const challenge = route.params.challenge;

  if (challenge.datesCompleted === undefined) {
    challenge.datesCompleted = [] as string[];
  }

  const stringDatesWithStyling = (dates: string[]) => {
    let datesDict = {}

    dates.forEach(date => {
      datesDict[date] = { selected: true, selectedColor: theme.colors.tertiary }
    });

    return datesDict;
  }

  const [selectedDates, setSelectedDates] = useState(stringDatesWithStyling(challenge.datesCompleted));
  const [newCount, setCount] = useState(challenge.currentValue);

  const updateValue = (value: number) => {
    setCount(value);
  }

  const handleDateSelect = (day) => {
    const selected = { ...selectedDates };

    if (selected[day.dateString]) {
      delete selected[day.dateString];
    } else {
      selected[day.dateString] = { selected: true, selectedColor: theme.colors.tertiary };
    }

    setSelectedDates(selected);
    setCount(Object.keys(selected).length);
  };

  const getChallengeStatus = (currentValue: number, targetValue: number) => {
    if (currentValue >= targetValue) {
      return ProgressStatus.Completed;
    }

    if (currentValue > 0) {
      return ProgressStatus.InProgress;
    }

    return ProgressStatus.NotStarted;
  }

  const onSave = async () => {
    let newChallenge = { ...challenge } as DailyCalendarChallenge;

    newChallenge.currentValue = newCount;
    newChallenge.datesCompleted = Object.keys(selectedDates);
    newChallenge.lastTimeUpdated = timeService.getCurrentDateString();
    newChallenge.status = getChallengeStatus(newChallenge.currentValue, newChallenge.targetValue);

    const result = await challengesService.storeChallenge(newChallenge);

    if (result) {
      navigation.goBack();
    }
  }

  const onEdit = () => {
    navigation.navigate('AddDailyCalendarChallengeScreen', {
      challengeType: ChallengeTypes.DailyBolleanCalendar,
      originalChallenge: challenge
    });
  }

  const renderProgressContainer = () => (
    <View style={styles.animationContainer}>
      <LinearGradient
        start={{ x: 0.9, y: 0 }}
        colors={styles.linearGradient.colors}
        locations={[0, 0.6, 1]}
        style={styles.linearGradient}
      >
        <ChallengeHeader challenge={challenge} navigation={navigation} onEdit={onEdit} />
        <NumericProgressTile />
      </LinearGradient>
    </View>
  );

  const renderSaveContainer = () => (
    <View style={styles.saveContainer}>
      <SaveButton
        title={t("save")}
        onPress={async () => onSave()}
        isRoundTop={true}
      />
    </View>
  );

  const values = useMemo(() => ({ challenge: challenge, newValue: newCount, updateValue: updateValue }), [newCount]);

  return (
    <View style={styles.container}>
      <ChallengeContext.Provider value={values}>
        {renderProgressContainer()}
        <BooleanStatusCalendar markedDates={selectedDates} minDate={challenge.startDate} onDayPress={(day) => handleDateSelect(day)} />
        {renderSaveContainer()}
      </ChallengeContext.Provider>
    </View >
  );
};

const createStyles = (theme: AppTheme) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.canvas,
    },
    animationContainer: {
      alignItems: 'center',
      width: '100%',
      flex: 6,
    },
    linearGradient: {
      flex: 1,
      width: '100%',
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
      colors: [theme.colors.primary, theme.colors.secondary, theme.colors.primary],
    },
    saveContainer: {
      flex: 1,
    },
  });

  return styles;
};

export default DailyCalendarChallengeScreen;
