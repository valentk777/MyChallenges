import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextStyle } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import PickerCalendar from '../CalendarWrapper/PickerCalendar';
import timeService from '../../services/timeService';
import { useTranslations } from '../../hooks/useTranslations';
import { useTheme } from '../../hooks/useTheme';
import { AppTheme } from '../../styles/themeModels';
import timeService2 from '../../services/timeService2';
import { DateData } from 'react-native-calendars/src/types';

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
  const [endDate, setEndDate] = useState(initialEndDate);

  const { tTime } = useTranslations();

  useEffect(() => {
    console.log("11111111111")
    console.log(startDate);
    console.log(startDate.toISOString()); // utc
    console.log(startDate.toLocaleString()); // local
    console.log("11111111111")

    onSetStartDate(startDate);
    onSetEndDate(endDate);
  }, [startDate, endDate]);

  const onStartDayUpdated = (day: DateData) => {
    const newDate = timeService2.combineDateAndTime(new Date(day.dateString), startDate)

    console.log("2222222")
    console.log(newDate);
    console.log(newDate.toISOString()); // utc
    console.log(newDate.toLocaleString()); // local
    console.log("2222222")

    // this is also hours based validation
    if (newDate > endDate) {
      // now start = end. need validation on save or just disable save for this case at all.
      setEndDate(newDate);
    }

    setStartDate(newDate);
    setIsStartModalVisible(false);
  };

  const onEndDayUpdated = (day: DateData) => {
    const newDate = timeService2.combineDateAndTime(new Date(day.dateString), endDate)

    console.log("3333333")
    console.log(newDate);
    console.log(newDate.toISOString()); // utc
    console.log(newDate.toLocaleString()); // local
    console.log("3333333")

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

    console.log("44444444")
    console.log(newDate);
    console.log(newDate.toISOString()); // utc
    console.log(newDate.toLocaleString()); // local
    console.log("44444444")

    setStartDate(newDate);
  };

  const handleEndTimeChange = (time: string) => {
    const hours = parseInt(time.split(':')[0]);
    const minutes = parseInt(time.split(':')[1]);
    const newDate = timeService2.setLocalTimeToDate(endDate, hours, minutes);

    console.log("5555555")
    console.log(newDate);
    console.log(newDate.toISOString()); // utc
    console.log(newDate.toLocaleString()); // local
    console.log("5555555")

    setEndDate(newDate);
  };

  const generateTime = (startHours: number, startMinutes: number) => {
    let times = [] as string[];

    for (let minute = startMinutes; minute < 60; minute += 15) {
      const formattedHour = timeService.getTwoDigitsNumber(startHours);
      const formattedMinute = timeService.getTwoDigitsNumber(minute);

      times.push(`${formattedHour}:${formattedMinute}`);
    }

    for (let hour = startHours + 1; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const formattedHour = timeService.getTwoDigitsNumber(hour);
        const formattedMinute = timeService.getTwoDigitsNumber(minute);

        times.push(`${formattedHour}:${formattedMinute}`);
      }
    }

    return times
  }

  // const generateTimeOptions = () => {
  //   if (timeService2.timestampToLocalDayString(startDate) != timeService2.timestampToLocalDayString(endDate)) {
  //     return generateTime(0, 0);
  //   }

  //   if (timeService2.timestampToTimeString(startDate) == "23:45") {
  //     setEndDate(timeService2.getNextDayTimestamp(endDate));

  //     return generateTime(0, 0);
  //   }

  //   const time = timeService2.timestampToTimeString(startDate);
  //   const hours = parseInt(time.split(':')[0]);
  //   const minutes = parseInt(time.split(':')[1]);

  //   return generateTime(hours, minutes + 15);
  // };

  const renderStartTimeStampAndTimeContainer = () => (
    <View style={styles.dateAndTimeSection}>
      <PickerCalendar
        onDayPress={onStartDayUpdated}
        hideCalendar={() => setIsStartModalVisible(false)}
        isModalVisible={isStartModalVisible}
        currentDate={startDate.toLocaleString()}
        minDate={undefined}
      />
      <View style={styles.textImput}>
        <TouchableOpacity
          onPress={() => setIsStartModalVisible(true)}
          style={styles.textButton}
        >
          <Text style={styles.dateText}>{tTime(startDate.toISOString(), 'EEEE, LLLL dd')}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.pickerArea}>
        <Picker
          selectedValue={timeService2.dateToLocalTimeString(startDate)}
          onValueChange={handleStartTimeChange}
          mode={Picker.MODE_DROPDOWN}
          dropdownIconColor={theme.colors.tertiary}
        >
          {generateTime(0, 0).map((time) => (
            <Picker.Item label={time} value={time} key={time} style={styles.picker} />
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
        currentDate={endDate.toLocaleString()}
        minDate={endDate.toLocaleString()}
      />
      <View style={styles.textImput}>
        <TouchableOpacity
          onPress={() => setIsEndModalVisible(true)}
          style={styles.textButton}
        >
          <Text style={styles.dateText}>{tTime(endDate.toISOString(), 'EEEE, LLLL dd')}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.pickerArea}>
        <Picker
          selectedValue={timeService2.dateToLocalTimeString(endDate)}
          onValueChange={handleEndTimeChange}
          mode={Picker.MODE_DROPDOWN}
          dropdownIconColor={theme.colors.tertiary}
        >
          {/* {generateTimeOptions().map((time) => ( */}
          {generateTime(0, 0).map((time) => (
            <Picker.Item label={time} value={time} key={time} style={styles.picker} />
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
      fontFamily: theme.fonts.medium,
      color: theme.colors.primary,
      fontSize: 15,
    },
    pickerArea: {
      flex: 2,
      justifyContent: 'center',
      flexDirection: 'column',
    },
    picker: {
      fontFamily: theme.fonts.medium,
      color: theme.colors.primary,
      fontSize: 15,
    }
  });

  return styles;
};

export default TimePicker;
