import React from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import { Calendar } from "react-native-calendars";
import timeService from "../../services/timeService";
import { AppTheme } from "../../styles/themeModels";
import { useTheme } from "../../hooks/useTheme";
import { Theme } from "react-native-calendars/src/types";

interface BooleanStatusCalendarProps {
  onDayPress: (day) => void;
  minDate: string | undefined;
  markedDates: {};
}

const BooleanStatusCalendar = (props: BooleanStatusCalendarProps) => {
  const { onDayPress, minDate, markedDates } = props;

  const { theme } = useTheme();
  const styles = createStyles(theme);

  const window = useWindowDimensions();

  return (
    <View style={styles.calendarContainer}>
      <View style={styles.modalContainer}>
        <Calendar
          style={[styles.calendarStyles, { width: window.width * 0.8 }]}
          theme={styles.calendarTheme}
          minDate={minDate}
          maxDate={timeService.getCurrentDateString()}
          current={timeService.getCurrentDateString()}
          markedDates={markedDates}
          // hideArrows={true}
          enableSwipeMonths={true}
          onDayPress={onDayPress}
        />
      </View>
    </View>
  )
}

const createStyles = (theme: AppTheme) => {
  const styles = StyleSheet.create({
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
    } as Theme,
  });

  return styles;
};

export default BooleanStatusCalendar;
