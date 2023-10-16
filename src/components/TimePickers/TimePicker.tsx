import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import PickerCalendar from '../CalendarWrapper/PickerCalendar';
import timeService from '../../services/timeService';
import { useTranslations } from '../../hooks/useTranslations';
import { useTheme } from '../../hooks/useTheme';
import { AppTheme } from '../../styles/themeModels';
import timeService2 from '../../services/timeService2';
import { DateData } from 'react-native-calendars/src/types';
import { CalendarUtils } from 'react-native-calendars';

const STEP_NUMBER_OF_MINUTES = 15;

interface TimePickerProps {
  onSetStartDate: (date: Date) => void,
  onSetEndDate: (date: Date) => void
  initialStartDate: Date;
  initialEndDate: Date;
  disabled: boolean;
}

const TimePicker = (props: TimePickerProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const { onSetStartDate, onSetEndDate, initialStartDate, initialEndDate, disabled } = props;

  const [isStartModalVisible, setIsStartModalVisible] = useState(false);
  const [isEndModalVisible, setIsEndModalVisible] = useState(false);
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);

  const { tTime } = useTranslations();

  useEffect(() => {
    onSetStartDate(startDate);
    onSetEndDate(endDate);
  }, [startDate, endDate]);

  const onStartDayUpdated = (day: DateData) => {
    const newDate = timeService2.combineDateAndTime(new Date(day.dateString), startDate)

    // this is also hours based validation
    if (newDate > endDate) {
      setEndDate(timeService2.addMinutes(newDate, STEP_NUMBER_OF_MINUTES));
    }

    setStartDate(newDate);
    setIsStartModalVisible(false);
  };

  const onEndDayUpdated = (day: DateData) => {
    const newDate = timeService2.combineDateAndTime(new Date(day.dateString), endDate)

    // this is also hours based validation
    if (startDate > newDate) {
      return;
    }

    setEndDate(newDate);
    setIsEndModalVisible(false);
  };

  const handleStartTimeChange = (time: string) => {
    const hours = parseInt(time.split(':')[0]);
    const minutes = parseInt(time.split(':')[1]);
    const newDate = timeService2.setLocalTimeToDate(startDate, hours, minutes);

    setStartDate(newDate);
  };

  const handleEndTimeChange = (time: string) => {
    const hours = parseInt(time.split(':')[0]);
    const minutes = parseInt(time.split(':')[1]);
    const newDate = timeService2.setLocalTimeToDate(endDate, hours, minutes);

    setEndDate(newDate);
  };

  const generateTime = (startHours: number, startMinutes: number) => {
    let times = [] as string[];

    for (let minute = startMinutes; minute < 60; minute += STEP_NUMBER_OF_MINUTES) {
      const formattedHour = timeService.getTwoDigitsNumber(startHours);
      const formattedMinute = timeService.getTwoDigitsNumber(minute);

      times.push(`${formattedHour}:${formattedMinute}`);
    }

    for (let hour = startHours + 1; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += STEP_NUMBER_OF_MINUTES) {
        const formattedHour = timeService.getTwoDigitsNumber(hour);
        const formattedMinute = timeService.getTwoDigitsNumber(minute);

        times.push(`${formattedHour}:${formattedMinute}`);
      }
    }

    return times
  }

  const generateTimeOptions = () => {

    if (timeService2.getLocalDayStringFromDate(startDate) != timeService2.getLocalDayStringFromDate(endDate)) {
      return generateTime(0, 0);
    }

    const time = timeService2.dateToLocalTimeString(startDate);

    if (time == "23:45") {
      setEndDate(timeService2.addMinutes(endDate, STEP_NUMBER_OF_MINUTES));

      return generateTime(0, 0);
    }

    const hours = parseInt(time.split(':')[0]);
    const minutes = parseInt(time.split(':')[1]);

    return generateTime(hours, minutes + STEP_NUMBER_OF_MINUTES);
  };

  const renderStartTimeStampAndTimeContainer = () => (
    <View style={styles.dateAndTimeSection}>
      <PickerCalendar
        onDayPress={onStartDayUpdated}
        hideCalendar={() => setIsStartModalVisible(false)}
        isModalVisible={isStartModalVisible}
        currentDate={CalendarUtils.getCalendarDateString(startDate)}
        minDate={undefined}
      />
      <View style={styles.textImput}>
        <TouchableOpacity
          onPress={() => setIsStartModalVisible(true)}
          style={styles.textButton}
          disabled={disabled}
        >
          <Text style={[styles.dateText, disabled ? { color: theme.colors.canvasInverted } : {}]}>
            {tTime(startDate.toISOString(), 'EEEE, LLLL dd')}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.pickerArea}>
        <Picker
          selectedValue={timeService2.dateToLocalTimeString(startDate)}
          onValueChange={handleStartTimeChange}
          mode={Picker.MODE_DROPDOWN}
          numberOfLines={5}
          enabled={!disabled}
          dropdownIconColor={theme.colors.tertiary}
          itemStyle={[styles.picker, disabled ? { color: theme.colors.canvasInverted } : {}]}
        >
          {(disabled ? ["00:00"] : generateTime(0, 0)).map((time) => (
            <Picker.Item
            label={time}
             value={time} 
             key={time}
            //  style={[styles.picker, disabled ? { color: theme.colors.canvasInverted } : {}]}
             />
          ))}
        </Picker>
      </View>
    </View>
  );

  const renderEndTimeStampAndTimeContainer = () => (
    <View style={styles.dateAndTimeSection}>
      <PickerCalendar
        onDayPress={onEndDayUpdated}
        hideCalendar={() => setIsEndModalVisible(false)}
        isModalVisible={isEndModalVisible}
        currentDate={CalendarUtils.getCalendarDateString(endDate)}
        minDate={CalendarUtils.getCalendarDateString(startDate)}
      />
      <View style={styles.textImput}>
        <TouchableOpacity
          onPress={() => setIsEndModalVisible(true)}
          style={styles.textButton}
          disabled={disabled}
        >
          <Text style={[styles.dateText, disabled ? { color: theme.colors.canvasInverted } : {}]}>
            {tTime(endDate.toISOString(), 'EEEE, LLLL dd')}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.pickerArea}>
        <Picker
          selectedValue={timeService2.dateToLocalTimeString(endDate)}
          onValueChange={handleEndTimeChange}
          mode={Picker.MODE_DROPDOWN}
          numberOfLines={5}
          enabled={!disabled}
          itemStyle={[styles.picker, disabled ? { color: theme.colors.canvasInverted } : {}]}
        >
          {(disabled ? ["00:00"] : generateTimeOptions()).map((time) => (
            <Picker.Item
             label={time}
              value={time} 
              key={time}
              // style={[styles.picker, disabled ? { color: theme.colors.canvasInverted } : {}]}
              />
          ))}
        </Picker>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {renderStartTimeStampAndTimeContainer()}
      {renderEndTimeStampAndTimeContainer()}
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
    },
    textImput: {
      flex: 3,
      flexDirection: 'column',
    },
    textButton: {
      flex: 1,
      justifyContent: 'center',
    },
    dateText: {
      fontFamily: theme.fonts.regular,
      color: theme.colors.primary,
      fontSize: 15,
    },
    pickerArea: {
      flex: 2,
      justifyContent: 'center',
      flexDirection: 'column',
    },
    picker: {
      fontFamily: theme.fonts.regular,
      color: theme.colors.primary,
      backgroundColor: theme.colors.canvas,
      fontSize: 20,
    }
  });

  return styles;
};

export default TimePicker;
