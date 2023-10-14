import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import PickerCalendar from '../CalendarWrapper/PickerCalendar';
import timeService from '../../services/timeService';
import { useTranslations } from '../../hooks/useTranslations';
import { useTheme } from '../../hooks/useTheme';
import { AppTheme } from '../../styles/themeModels';

interface TimePickerProps {
  onSetStartDate: (date: Date) => void,
  onSetEndDate: (date: Date) => void
  initialStartDate: Date;
  initialEndDate: Date;
}

const TimePicker = (props: TimePickerProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const { onSetStartDate, onSetEndDate, initialStartDate, initialEndDate } = props;

  const [isStartModalVisible, setIsStartModalVisible] = useState(false);
  const [isEndModalVisible, setIsEndModalVisible] = useState(false);

  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate));

  // const [startDate, setStartDate] = useState(timeService.getDate(initialStartDate));
  // const [endDate, setEndDate] = useState(timeService.getDate(initialEndDate));

  // const [startTime, setStartTime] = useState(timeService.getTime(initialStartDate));
  // const [endTime, setEndTime] = useState(timeService.getTime(initialEndDate));

  const { tTime } = useTranslations();

  useEffect(() => {
    updateState();
  }, [startDate, endDate, startTime, endTime]);

  const updateState = () => {
    onSetStartDate(new Date(`${startDate} ${startTime}`).toISOString());
    onSetEndDate(new Date(`${endDate} ${endTime}`).toISOString());
  }

  const onStartDayPress = (day) => {
    const _startDate = new Date(day.dateString);
    const _endDate = new Date(endDate);

    if (endDate !== "" && _startDate > _endDate) {
      setEndDate(day.dateString);
    }

    setStartDate(day.dateString);
    setIsStartModalVisible(false);
    updateState();
  };

  const onEndDayPress = (day) => {
    const _startDate = new Date(startDate);
    const _endDate = new Date(day.dateString);

    if (_startDate > _endDate) {
      return;
    }

    setEndDate(day.dateString);
    setIsEndModalVisible(false);
    updateState();
  };

  const handleStartTimeChange = (time: string) => {
    setStartTime(time);
    updateState();
  };

  const handleEndTimeChange = (time: string) => {
    setEndTime(time);
    updateState();
  };

  const generateTime = (startHours: number, startMinutes: number) => {
    let times = [] as string[];

    for (let minute = startMinutes; minute < 60; minute += 15) {
      const formattedHour = startHours < 10 ? `0${startHours}` : `${startHours}`;
      const formattedMinute = minute === 0 ? '00' : `${minute}`;

      times.push(`${formattedHour}:${formattedMinute}`);
    }

    for (let hour = startHours + 1; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const formattedHour = hour < 10 ? `0${hour}` : `${hour}`;
        const formattedMinute = minute === 0 ? '00' : `${minute}`;

        times.push(`${formattedHour}:${formattedMinute}`);
      }
    }

    return times
  }

  const generateTimeOptions = () => {
    if (startDate != endDate) {
      return generateTime(0, 0);
    }

    const startHours = parseInt(startTime.split(':')[0], 10);
    const startMinutes = parseInt(startTime.split(':')[1], 10);

    if (startHours === 23 && startMinutes == 45) {
      setEndDate(timeService.getNextDayDate(endDate));
      setEndTime("00:00");

      return generateTime(0, 0);
    }

    return generateTime(startHours, startMinutes + 15);
  };

  const renderStartDateAndTimeContainer = () => (
    <View style={styles.dateAndTimeSection}>
      <PickerCalendar
        onDayPress={onStartDayPress}
        hideCalendar={() => setIsStartModalVisible(false)}
        isModalVisible={isStartModalVisible}
        currentDate={startDate}
        minDate={undefined}
      />
      <View style={styles.textImput}>
        <TouchableOpacity onPress={() => setIsStartModalVisible(true)}>
          <Text style={styles.dateText}>{tTime(startDate, 'EEEE, LLLL dd')}</Text>
        </TouchableOpacity>
      </View>
      <Picker
        selectedValue={startTime}
        onValueChange={handleStartTimeChange}
        style={styles.timeImput}
      >
        {generateTime(0, 0).map((time) => (
          <Picker.Item label={time} value={time} key={time} style={styles.picker} />
        ))}
      </Picker>
    </View>
  );

  const renderEndDateAndTimeContainer = () => (
    <View style={styles.dateAndTimeSection}>
      <PickerCalendar
        onDayPress={onEndDayPress}
        hideCalendar={() => setIsEndModalVisible(false)}
        isModalVisible={isEndModalVisible}
        currentDate={endDate}
        minDate={startDate}
      />
      <View style={styles.textImput}>
        <TouchableOpacity onPress={() => setIsEndModalVisible(true)}>
          <Text style={styles.dateText}>{tTime(endDate, 'EEEE, LLLL dd')}</Text>
        </TouchableOpacity>
      </View>
      <Picker
        selectedValue={endTime}
        onValueChange={handleEndTimeChange}
        style={styles.timeImput}
      >
        {generateTimeOptions().map((time) => (
          <Picker.Item label={time} value={time} key={time} />
        ))}
      </Picker>
    </View>
  );

  return (
    <View style={styles.container}>
      {renderStartDateAndTimeContainer()}
      {renderEndDateAndTimeContainer()}
    </View>
  );
};

const createStyles = (theme: AppTheme) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    dateAndTimeSection: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    textImput: {
      flex: 1,
      justifyContent: 'center',
    },
    timeImput: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    dateText: {
      fontFamily: theme.fonts.medium,
      color: theme.colors.canvasInverted,
    },
    picker: {
      // fontFamily: theme.fonts.bold,
      // fontSize: 10,
    },
  });

  return styles;
};

export default TimePicker;
