import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, useWindowDimensions, TouchableOpacity } from 'react-native';
import { SaveButton } from '../../components/ButtonWrapper/SaveButton';
import { useTheme } from '../../hooks/useTheme';
import { AppTheme } from '../../styles/themeModels';
import LinearGradient from 'react-native-linear-gradient'
import { MainStackParamList } from '../../navigators/MainStackNavigator';
import challengesService from '../../services/challengesService';
import { useHeaderHeight } from '@react-navigation/elements';
import { icons } from '../../assets';
import { CircleButton } from '../../components/ButtonWrapper/CircleButton';
import ImageSwapper from '../../components/ImageSwapper/ImageSwapper';
import { SvgComponents } from '../../assets/svgIndex';
import { DailyCalendarChallenge } from '../../entities/challenge';
import timeService from '../../services/timeService';
import { Theme } from 'react-native-calendars/src/types';
import { useTranslation } from 'react-i18next';
import PickerCalendar from '../../components/CalendarWrapper/PickerCalendar';

type AddDailyCalendarChallengeScreenProps = NativeStackScreenProps<MainStackParamList, 'AddDailyCalendarChallengeScreen'>;

export const AddDailyCalendarChallengeScreen = ({ navigation, route }: AddDailyCalendarChallengeScreenProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const { challengeType, originalChallenge } = route.params;

  const window = useWindowDimensions();
  const headerHeight = useHeaderHeight();

  const [isStartModalVisible, setIsStartModalVisible] = useState(false);
  const [isEndModalVisible, setIsEndModalVisible] = useState(false);

  const [title, onChangeTitleText] = useState(originalChallenge?.title != null ? originalChallenge.title : '');
  const [description, onChangeDescriptionText] = useState(originalChallenge?.description != null ? originalChallenge.description : '');
  const [targetValue, onChangeTargetValueText] = useState(originalChallenge?.targetValue != null ? originalChallenge.targetValue.toString() : '');
  const [imageLocation, setCurrentImageLocation] = useState(originalChallenge?.image != null ? originalChallenge.image : SvgComponents[0].location);

  const [startDate, setStartDate] = useState(originalChallenge?.startDate != null ? originalChallenge.startDate : timeService.getCurrentDayString());
  const [endDate, setEndDate] = useState(originalChallenge?.endDate != null ? originalChallenge.endDate : '');
  const [numberOfDays, setNumberOfDays] = useState(timeService.dateDiffInDays(new Date(startDate), new Date(endDate)));

  const { t } = useTranslation('add-daily-calendar-challenge-screen')

  const showStartCalendar = () => {
    setIsStartModalVisible(true);
  };

  const hideStartCalendar = () => {
    setIsStartModalVisible(false);
  };

  const showEndCalendar = () => {
    setIsEndModalVisible(true);
  };

  const hideEndCalendar = () => {
    setIsEndModalVisible(false);
  };

  const onStartDayPress = (day) => {
    const _startDate = new Date(day.dateString);
    const _endDate = new Date(endDate);

    if (endDate !== "" && _startDate > _endDate) {
      return;
    }

    setStartDate(day.dateString);
    setNumberOfDays(timeService.dateDiffInDays(_startDate, _endDate));
    hideStartCalendar();
  };

  const onEndDayPress = (day) => {
    const _startDate = new Date(startDate);
    const _endDate = new Date(day.dateString);

    if (_startDate > _endDate) {
      return;
    }

    setEndDate(day.dateString);
    setNumberOfDays(timeService.dateDiffInDays(_startDate, _endDate));
    hideEndCalendar();
  };

  const handleImageChange = newIndex => {
    setCurrentImageLocation(newIndex);
  };

  const createOrUpdateChallenge = () => {

    const targetValueInt = parseInt(targetValue, 10);

    const challengeCandidate = challengesService.createNewChallenge(title, description, 0, targetValueInt, imageLocation, challengeType) as DailyCalendarChallenge;

    if (challengeCandidate == null) {
      return null;
    }

    if (originalChallenge != null) {
      challengeCandidate.id = originalChallenge.id;
      challengeCandidate.timeCreated = originalChallenge.timeCreated;
      challengeCandidate.favorite = originalChallenge.favorite;
      challengeCandidate.status = originalChallenge.status;
    }

    if (targetValueInt > numberOfDays) {
      Alert.alert("Target value cannot be bigger than number of days");
      return null;
    }

    if (endDate === "") {
      Alert.alert("End date cannot be empty");
      return null;
    }

    challengeCandidate.startDate = startDate;
    challengeCandidate.endDate = endDate;

    let datesCompleted = originalChallenge?.datesCompleted != null ? originalChallenge.datesCompleted : [];

    datesCompleted = datesCompleted.filter(
      date => startDate <= date && date <= endDate,
    );

    challengeCandidate.datesCompleted = datesCompleted;
    challengeCandidate.currentValue = datesCompleted.length;

    return challengeCandidate;
  }

  const onSave = async () => {
    try {
      const challenge = createOrUpdateChallenge();

      if (challenge === null) {
        return false;
      }

      const result = await challengesService.storeChallenge(challenge);

      if (result) {
        navigation.navigate('ChallengesScreen');
      }
    }
    catch (exception) {
      return false;
    }
  }

  const setNumericValueOrDefault = (value: string, setValueFunction) => {
    const defaultNumbericValue = '0';
    const numericValue = parseInt(value, 10);

    if (!isNaN(numericValue)) {
      setValueFunction(numericValue.toString());
    } else {
      setValueFunction(defaultNumbericValue);
    }
  }

  const renderHeaderContainer = () => (
    <View style={styles.imageArea}>
      <View style={styles.imageSwapper}>
        <ImageSwapper onImageChange={handleImageChange} initialImageLocation={imageLocation} />
      </View>
      <CircleButton
        imgUrl={icons["back-arrow.png"]}
        onPress={() => navigation.navigate('ChallengesScreen')}
        style={styles.backCircle}
      />
    </View>
  );

  const renderInputContainer = () => (
    <View style={styles.textArea}>
      <View style={styles.textImput}>
        <Text style={styles.text}>{t("title")}</Text>
        <TextInput
          style={styles.textbox}
          placeholder={t("title-placeholder")}
          onChangeText={onChangeTitleText}
          value={title}
          placeholderTextColor={theme.colors.secondary}
        />
      </View>
      <PickerCalendar
        onDayPress={onStartDayPress}
        hideCalendar={hideStartCalendar}
        isModalVisible={isStartModalVisible}
        currentDate={startDate}
        minDate={undefined}
      />
      <PickerCalendar
        onDayPress={onEndDayPress}
        hideCalendar={hideEndCalendar}
        isModalVisible={isEndModalVisible}
        currentDate={endDate}
        minDate={startDate}
      />

      <View style={styles.textImput}>
        <Text style={styles.text}>{t("start-date")}</Text>
        <TouchableOpacity onPress={showStartCalendar} style={styles.textbox}>
          <Text style={styles.dateText}>{startDate || t("start-date-placeholder")}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.textImput}>
        <Text style={styles.text}>{t("end-date")}</Text>
        <TouchableOpacity onPress={showEndCalendar} style={styles.textbox}>
          <Text style={styles.dateText}>{endDate || t("end-date-placeholder")}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.textImput}>
        <Text style={styles.text}>{t("target-value", { numberOfDays: numberOfDays })}</Text>
        <TextInput
          style={styles.textbox}
          placeholder={t("target-value-placeholder")}
          onChangeText={onChangeTargetValueText}
          onBlur={() => setNumericValueOrDefault(targetValue, onChangeTargetValueText)}
          value={targetValue}
          keyboardType="numeric"
          placeholderTextColor={theme.colors.secondary}
        />
      </View>
      <View style={styles.textImput}>
        <Text style={styles.text}>{t("description")}</Text>
        <TextInput
          style={styles.textbox}
          placeholder={t("description-placeholder")}
          onChangeText={onChangeDescriptionText}
          value={description}
          placeholderTextColor={theme.colors.secondary}
        />
      </View>
      <View style={styles.textImput} />
    </View>
  );

  const renderSaveContainer = () => (
    <View style={styles.saveContainer}>
      <SaveButton
        title={t("save")}
        onPress={async () => onSave()}
        isRoundBottom={true}
      />
    </View>
  );

  return (
    <View style={{ ...styles.container, height: window.height - headerHeight }}>
      <LinearGradient
        colors={styles.linearGradient.colors}
        style={styles.linearGradient}
      >
        <View style={styles.mainScreen}>
          <View style={styles.inputBox}>
            <View style={[styles.inputContaine]}>
              {renderHeaderContainer()}
              {renderInputContainer()}
            </View>
          </View>
          <View style={styles.empty} />
        </View>
        {renderSaveContainer()}
      </LinearGradient>
    </View>
  );
};

const createStyles = (theme: AppTheme) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.primary,
    },
    linearGradient: {
      flex: 1,
      height: '100%',
      colors: [theme.colors.primary, theme.colors.secondary],
    },
    iconsStyle: {
      height: 100,
      width: 100,
    },
    mainScreen: {
      flex: 11,
    },
    saveContainer: {
      flex: 1,
    },
    inputBox: {
      flex: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    empty: {
      flex: 2,
    },
    inputContaine: {
      width: '90%',
      height: '80%',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      backgroundColor: theme.colors.canvas
    },
    imageArea: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    imageSwapper: {
      flex: 1,
      width: '60%',
    },
    backCircle: {
      left: 15,
      top: 15,
    },
    textArea: {
      flex: 3,
      justifyContent: 'center',
      marginLeft: 30,
      marginRight: 30,
    },
    textImput: {
      flex: 1,
    },
    text: {
      flex: 3,
      textAlignVertical: 'bottom',
      fontFamily: theme.fonts.semiBold,
      color: theme.colors.primary,
    },
    textbox: {
      flex: 2,
      padding: 0,
      fontFamily: theme.fonts.light,
      color: theme.colors.secondary,
      borderBottomColor: theme.colors.canvasInverted,
      borderBottomWidth: 1,
      justifyContent: 'flex-end',
    },
    dateText: {
      padding: 0,
      fontFamily: theme.fonts.light,
      color: theme.colors.secondary,
    },
  });

  return styles;
};

export default AddDailyCalendarChallengeScreen;
