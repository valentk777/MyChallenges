import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { SaveButton } from '../../components/ButtonWrapper/SaveButton';
import { NumericProgressTile } from '../../components/Tile/NumericProgressTile';
import { useTheme } from '../../hooks/useTheme';
import { DailyCalendarChallenge } from '../../entities/challenge';
import { customTheme } from '../../styles/customTheme';
import LinearGradient from 'react-native-linear-gradient'
import { ProgressStatus } from '../../entities/progressStatus';
import { MainStackParamList } from '../../navigators/MainStackNavigator';
import challengesService from '../../services/challengesService';
import { ChallengeHeader } from '../../components/Menu/ChallengeHeader';
import { Calendar } from 'react-native-calendars';
import { ChallengeContext } from '../../hooks/useChallenge';
import timeService from '../../services/timeService';
import { ChallengeTypes } from '../../entities/challengeTypes';

type DailyCalendarChallengeScreenProps = NativeStackScreenProps<MainStackParamList, 'DailyCalendarChallengeScreen'>;

export const DailyCalendarChallengeScreen = ({ route, navigation }: DailyCalendarChallengeScreenProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const challenge = route.params.challenge;

  if (challenge.datesCompleted === undefined) {
    challenge.datesCompleted = [] as string[];
  }

  const window = useWindowDimensions();

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
    newChallenge.lastTimeUpdated = new Date().toISOString();
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

  const renderCalendarContainer = () => (
    <View style={styles.calendarContainer}>
      <View style={styles.modalContainer}>
        <Calendar
          style={[styles.calendarStyles, { width: window.width * 0.8 }]}
          theme={styles.calendarTheme}
          minDate={challenge.startDate}
          maxDate={timeService.getCurrentDate()}
          current={timeService.getCurrentDate()}
          markedDates={selectedDates}
          // hideArrows={true}
          enableSwipeMonths={true}
          onDayPress={(day) => {
            handleDateSelect(day);
          }}
        />
      </View>
    </View>
  );

  const renderSaveContainer = () => (
    <View style={styles.saveContainer}>
      <SaveButton
        title="Save"
        onPress={async () => onSave()}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <ChallengeContext.Provider
        value={{
          challenge: challenge,
          newValue: newCount,
          updateValue: updateValue,
        }}>
        {renderProgressContainer()}
        {renderCalendarContainer()}
        {renderSaveContainer()}
      </ChallengeContext.Provider>
    </View >
  );
};

const createStyles = (theme: typeof customTheme) => {
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
    calendarContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 6,
    },
    modalContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    calendarStyles: {
      flex: 1,
      height: '100%',
      justifyContent: 'center',
    },
    calendarTheme: {
      arrowColor: theme.colors.canvasInverted,
      textDayFontFamily: theme.fonts.light,
      textMonthFontFamily: theme.fonts.bold,
      textDayHeaderFontFamily: theme.fonts.medium,
      todayTextColor: theme.colors.tertiary,
    },
    saveContainer: {
      flex: 1,
    },
  });

  return styles;
};

export default DailyCalendarChallengeScreen;
