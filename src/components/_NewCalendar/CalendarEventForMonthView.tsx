import React, { memo, useEffect, useMemo } from 'react'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native'
import { useTheme } from '../../hooks/useTheme'
import { AppTheme } from '../../styles/themeModels'
import { CustomCalendarEvent } from '../../entities/customCalendarEvent'
import constants from '../../constants/constants'

dayjs.extend(duration)

const CELL_WIDTH = constants.screenWidth / 7;

interface CalendarEventProps {
  event: CustomCalendarEvent
  onPressEvent: (event: CustomCalendarEvent) => void
  date: dayjs.Dayjs
}

const _CalendarEventForMonthView = ({
  event,
  onPressEvent,
  date,
}: CalendarEventProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const getEventSpanningInfo = () => {
    // adding + 1 because durations start at 0
    const eventDuration = Math.floor(dayjs.duration(dayjs(event.end).endOf('day').diff(dayjs(event.start))).asDays()) + 1;
    const eventDaysLeft = Math.floor(dayjs.duration(dayjs(event.end).endOf('day').diff(date)).asDays()) + 1;
    const dayOfTheWeek = (date.day() - 1) % 7;
    const weekDaysLeft = 7 - dayOfTheWeek;
    const isMultipleDays = eventDuration > 1;
    const isMultipleDaysStart =
      isMultipleDays && (date.isSame(event.start, 'day') || (dayOfTheWeek === 0 && date.isAfter(event.start)));

    const getEventWeekDuration = () => {
      if (eventDaysLeft > weekDaysLeft) {
        return weekDaysLeft;
      }

      if (eventDaysLeft < eventDuration) {
        return eventDaysLeft;
      }

      return eventDuration;
    }

    // This is to determine how many days from the event to show during a week
    const eventWeekDuration = getEventWeekDuration();

    const eventWidth = CELL_WIDTH * eventWeekDuration; // - 6 to take in account the padding

    return { dayOfTheWeek, eventWidth, isMultipleDays, isMultipleDaysStart, eventWeekDuration }
  }

  const {
    dayOfTheWeek,
    eventWidth,
    isMultipleDays,
    isMultipleDaysStart,
    eventWeekDuration
  } = getEventSpanningInfo();

  console.log("---------");
  console.log(date);
  console.log(dayOfTheWeek);
  console.log(eventWidth);
  console.log(isMultipleDays);
  console.log(isMultipleDaysStart);
  console.log(eventWeekDuration);

  return (
    <TouchableOpacity
      key={`${event.start.toISOString()}_${event.title}`}
      style={{
        ...styles.fullDayEventCellStyle,
        left: dayOfTheWeek * CELL_WIDTH,
        width: eventWidth,
      }}
      onPress={() => onPressEvent(event)}
    >
      {(!isMultipleDays && date.isSame(event.start, 'day')) || (isMultipleDays && isMultipleDaysStart)
        ? (
          <TouchableOpacity
            style={{
              ...styles.eventCellStyle,
              // width: eventWidth
            }}
            onPress={() => onPressEvent(event)}
            // onPress={() => console.log(date)}

          >
            <Text
              style={styles.eventText}
              numberOfLines={3}
            >
              {event.title}
            </Text>
          </TouchableOpacity>
        )
        : null
      }
    </TouchableOpacity>
  )
}

const createStyles = (theme: AppTheme) => {
  const styles = StyleSheet.create({



    eventText: {
      fontFamily: theme.fonts.light,
      fontSize: 9,
      color: theme.colors.primary,
      // padding: 0,
      // margin: 0,
      // lineHeight: 10,
      // backgroundColor: 'green'
      // minHeight: 10,
      // maxHeight: 40,
    },
    fullDayEventCellStyle: {
      backgroundColor: theme.colors.secondary,
      minHeight: 16,
      // paddingBottom: 0,
      // marginBottom: 0,
      // minHeight: 15,
      // maxHeight: 40,
    },
    eventCellStyle: {
      // backgroundColor: theme.colors.secondary,
      backgroundColor: "red",
      borderRadius: 2,

      // paddingBottom: 0,
      // marginBottom: 0,
      // minHeight: 15,
      // maxHeight: 40,
    },
  });

  return styles;
};

// export const CalendarEventForMonthView = memo(_CalendarEventForMonthView)
export const CalendarEventForMonthView = _CalendarEventForMonthView
