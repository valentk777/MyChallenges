import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, useWindowDimensions, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { SaveButton } from '../../components/ButtonWrapper/SaveButton';
import { ThemeContext } from '../../contexts/themeContext';
import { customTheme } from '../../styles/customTheme';
import LinearGradient from 'react-native-linear-gradient'
import { MainStackParamList } from '../../navigators/MainStackNavigator';
import { ProgressStatus } from '../../entities/progressStatus';
import uuid from 'react-native-uuid';
import challengesService from '../../services/challengesService';
import { useHeaderHeight } from '@react-navigation/elements';
import { icons } from '../../assets';
import { CircleButton } from '../../components/ButtonWrapper/CircleButton';
import ImageSwapper from '../../components/ImageSwapper/ImageSwapper';
import { SvgComponents } from '../../assets/svgIndex';
import { Calendar } from 'react-native-calendars';
import { DailyCalendarChallenge } from '../../entities/challenge';
import { ChallengeTypes } from '../../entities/challengeTypes';
import timeService from '../../services/timeService';

type AddDailyCalendarChallengeScreenProps = NativeStackScreenProps<MainStackParamList, 'AddDailyCalendarChallengeScreen'>;

export const AddDailyCalendarChallengeScreen = ({ navigation }: AddDailyCalendarChallengeScreenProps) => {
  const { theme } = useContext(ThemeContext);
  const styles = createStyles(theme);

  const window = useWindowDimensions();
  const headerHeight = useHeaderHeight();

  const [title, onChangeTitleText] = useState('');
  const [description, onChangeDescriptionText] = useState('');
  const [isStartModalVisible, setIsStartModalVisible] = useState(false);
  const [isEndModalVisible, setIsEndModalVisible] = useState(false);
  const [startDate, setStartDate] = useState(timeService.getCurrentDate());
  const [endDate, setEndDate] = useState('');
  const [targetValue, onChangeTargetValueText] = useState('');
  const [imageLocation, setCurrentImageLocation] = useState(SvgComponents[50 % SvgComponents.length].location);
  const [numberOfDays, setNumberOfDays] = useState(0);

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

  const dateDiffInDays = (date1: Date, date2: Date) => {
    const diffTime = Math.abs(date2 - date1);

    if (isNaN(diffTime)) {
      return 0;
    }

    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays + 1;
  }

  const onStartDayPress = (day) => {
    const _startDate = new Date(day.dateString);
    const _endDate = new Date(endDate);

    if (endDate !== "" && _startDate > _endDate) {
      return;
    }

    setStartDate(day.dateString);
    setNumberOfDays(dateDiffInDays(_startDate, _endDate));
    hideStartCalendar();
  };

  const onEndDayPress = (day) => {
    const _startDate = new Date(startDate);
    const _endDate = new Date(day.dateString);

    if (_startDate > _endDate) {
      return;
    }

    setEndDate(day.dateString);
    setNumberOfDays(dateDiffInDays(_startDate, _endDate));
    hideEndCalendar();
  };

  const handleImageChange = newIndex => {
    setCurrentImageLocation(newIndex);
  };

  const createNewChallenge = () => {
    const targetValueInt = parseInt(targetValue, 10);

    if (title === "") {
      Alert.alert("Title cannot be empty");
      return null;
    }

    if (title.length > 20) {
      Alert.alert("Title too long. Max 20 symbols allowed");
      return null;
    }

    if (description.length > 90) {
      Alert.alert("Description too long. Max 90 symbols allowed");
      return null;
    }

    if (targetValueInt === null || isNaN(targetValueInt)) {
      Alert.alert("Target value should be a number");
      return null;
    }

    if (targetValueInt <= 0) {
      Alert.alert("Target value cannot be 0");
      return null;
    }

    if (targetValueInt > numberOfDays) {
      Alert.alert("Target value cannot be bigger than number of days");
      return null;
    }

    if (endDate === "") {
      Alert.alert("End date cannot be empty");
      return null;
    }

    const currentUtcTime = new Date().toISOString();
    const challengeCandidate = {} as DailyCalendarChallenge;

    challengeCandidate.id = uuid.v4().toString();
    challengeCandidate.title = title;
    challengeCandidate.description = description;
    challengeCandidate.currentValue = 0;
    challengeCandidate.targetValue = targetValueInt;
    challengeCandidate.image = imageLocation;
    challengeCandidate.timeCreated = currentUtcTime;
    challengeCandidate.lastTimeUpdated = currentUtcTime;
    challengeCandidate.favorite = false;
    challengeCandidate.status = ProgressStatus.NotStarted;
    challengeCandidate.type = ChallengeTypes.DailyBolleanCalendar;
    challengeCandidate.startDate = startDate;
    challengeCandidate.endDate = endDate;

    return challengeCandidate;
  }

  const onSave = async () => {
    try {
      const challenge = createNewChallenge();

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

  const renderHeaderContainer = () => (
    <View style={styles.imageArea}>
      <View style={styles.imageSwapper}>
        <ImageSwapper onImageChange={handleImageChange} />
      </View>
      <CircleButton
        imgUrl={icons["back-arrow.png"]}
        onPress={() => navigation.goBack()}
        style={styles.backCircle}
      />
    </View>
  );

  const renderCalendarContainer = (onDayPress, hideCalendar, isModalVisible, currentDate, minDate) => (
    <View style={styles.calendarContainer}>
      <Modal
        transparent={true}
        animationType='fade'
        visible={isModalVisible}
        onRequestClose={hideCalendar}
      >
        <TouchableWithoutFeedback onPress={hideCalendar}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <Calendar
                style={[styles.calendarStyles, { width: window.width * 0.8 }]}
                theme={styles.calendarTheme}
                minDate={minDate}
                current={currentDate === Date().toString() ? '' : currentDate}
                enableSwipeMonths={true}
                onDayPress={onDayPress}
                markedDates={{
                  [currentDate]: { selected: true, disableTouchEvent: true, selectedColor: theme.colors.calendarDay },
                }}
              />
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );

  const renderInputContainer = () => (
    <View style={styles.textArea}>
      <View style={styles.textImput}>
        <Text style={styles.text}>Title</Text>
        <TextInput
          style={styles.textbox}
          placeholder='Enter your challenge title...'
          onChangeText={onChangeTitleText}
          value={title}
          placeholderTextColor={theme.colors.placeholder}
        />
      </View>
      {renderCalendarContainer(onStartDayPress, hideStartCalendar, isStartModalVisible, startDate, undefined)}
      {renderCalendarContainer(onEndDayPress, hideEndCalendar, isEndModalVisible, endDate, startDate)}
      <View style={styles.textImput}>
        <Text style={styles.text}>Start date: </Text>
        <TouchableOpacity onPress={showStartCalendar} style={styles.textbox}>
          <Text style={styles.dateText}>{startDate || 'Select challenge start day'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.textImput}>
        <Text style={styles.text}>End date: </Text>
        <TouchableOpacity onPress={showEndCalendar} style={styles.textbox}>
          <Text style={styles.dateText}>{endDate || 'Select challenge end day'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.textImput}>
        <Text style={styles.text}>Number of days to success   ({numberOfDays} days)</Text>
        <TextInput
          style={styles.textbox}
          placeholder='Enter target value...'
          onChangeText={onChangeTargetValueText}
          value={targetValue}
          keyboardType="numeric"
          placeholderTextColor={theme.colors.placeholder}
        />
      </View>
      <View style={styles.textImput}>
        <Text style={styles.text}>Short description</Text>
        <TextInput
          style={styles.textbox}
          placeholder='Enter a short description...'
          onChangeText={onChangeDescriptionText}
          value={description}
          placeholderTextColor={theme.colors.placeholder}
        />
      </View>
      <View style={styles.textImput} />
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

const createStyles = (theme: typeof customTheme) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.primary,
    },
    calendarContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    calendarStyles: {
      justifyContent: 'center',
    },
    calendarTheme: {
      arrowColor: theme.colors.black,
      textDayFontFamily: theme.fonts.light,
      textMonthFontFamily: theme.fonts.bold,
      textDayHeaderFontFamily: theme.fonts.medium,
      todayTextColor: theme.colors.calendarDay,
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
      backgroundColor: theme.colors.white
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
      color: theme.colors.black,
    },
    textbox: {
      flex: 2,
      padding: 0,
      fontFamily: theme.fonts.light,
      color: theme.colors.black,
      borderBottomColor: theme.colors.placeholder,
      borderBottomWidth: 1,
      justifyContent: 'flex-end',
    },
    dateText: {
      padding: 0,
      fontFamily: theme.fonts.light,
      color: theme.colors.placeholder,
    },
  });

  return styles;
};

export default AddDailyCalendarChallengeScreen;
