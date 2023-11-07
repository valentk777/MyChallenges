import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import * as React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useTheme } from '../../hooks/useTheme'
import { AppTheme } from '../../styles/themeModels'
import { CustomCalendarEvent } from '../../entities/customCalendarEvent'

dayjs.extend(duration)

interface CalendarEventProps {
  event: CustomCalendarEvent
  onPressEvent?: (event: CustomCalendarEvent) => void
  date: dayjs.Dayjs
  dayOfTheWeek: number
  calendarWidth: number
}

export function getEventSpanningInfo(
  event: CustomCalendarEvent,
  date: dayjs.Dayjs,
  dayOfTheWeek: number,
  calendarWidth: number,
  showAdjacentMonths: boolean,
) {
  const dayWidth = calendarWidth / 7;

  // adding + 1 because durations start at 0
  const eventDuration = Math.floor(dayjs.duration(dayjs(event.end).endOf('day').diff(dayjs(event.start))).asDays()) + 1;
  const eventDaysLeft = Math.floor(dayjs.duration(dayjs(event.end).endOf('day').diff(date)).asDays()) + 1;
  const weekDaysLeft = 7 - dayOfTheWeek;
  const monthDaysLeft = date.endOf('month').date() - date.date();
  // console.log(dayOfTheWeek === 0 && !showAdjacentMonths && monthDaysLeft < 7)
  const isMultipleDays = eventDuration > 1;
  // This is to determine how many days from the event to show during a week
  const eventWeekDuration =
    !showAdjacentMonths && monthDaysLeft < 7 && monthDaysLeft < eventDuration
      ? monthDaysLeft + 1
      : eventDaysLeft > weekDaysLeft
      ? weekDaysLeft
      : eventDaysLeft < eventDuration
      ? eventDaysLeft
      : eventDuration;
  const isMultipleDaysStart =
    isMultipleDays &&
    (date.isSame(event.start, 'day') ||
      (dayOfTheWeek === 0 && date.isAfter(event.start)) ||
      (!showAdjacentMonths && date.get('date') === 1));
  // - 6 to take in account the padding
  const eventWidth = dayWidth * eventWeekDuration - 6;

  return { eventWidth, isMultipleDays, isMultipleDaysStart, eventWeekDuration }
}

function _CalendarEventForMonthView({
  event,
  onPressEvent,
  date,
  dayOfTheWeek,
  calendarWidth,
  // eventMinHeightForMonthView,
}: CalendarEventProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);


  const   showAdjacentMonths = true;


  const { 
    eventWidth,
     isMultipleDays, 
    isMultipleDaysStart, 
    eventWeekDuration
   } = React.useMemo(
    () => getEventSpanningInfo(event, date, dayOfTheWeek, calendarWidth, showAdjacentMonths),
    [date, dayOfTheWeek, event, calendarWidth, showAdjacentMonths],
  )

  console.log(eventWidth);
  console.log(isMultipleDays);
  console.log(isMultipleDaysStart);
  console.log(eventWeekDuration);

  return (
    <TouchableOpacity
      style={{ minHeight: 16 }}
      onPress={() => !event.disabled && onPressEvent?.(event)}
      delayPressIn={20}
    >
      {(!isMultipleDays && date.isSame(event.start, 'day')) || (isMultipleDays && isMultipleDaysStart) 
      ? (
          <TouchableOpacity
          key={`${event.start.toISOString()}_${event.title}`}
          delayPressIn={20}
          style={[
            // event.isFullDayEvent ? styles.fullDayEventCellStyle : styles.eventCellStyle,
          // {left: 0, marginTop: 2,},
          isMultipleDaysStart && eventWeekDuration > 1
          ? {
              backgroundColor: 'green',
              position: 'relative',
              width: eventWidth,
              zIndex: 10000000000,
            }
          : {},
          ]}
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
      color: theme.colors.canvas,
      padding: 0,
      margin: 0,
      lineHeight: 10,
      // minHeight: 10,
      // maxHeight: 40,
    },
    fullDayEventCellStyle: {
      backgroundColor: theme.colors.primary,
      paddingBottom: 0,
      marginBottom: 0,
      minHeight: 15,
      maxHeight: 40,
    },
    eventCellStyle: {
      backgroundColor: theme.colors.secondary,
      paddingBottom: 0,
      marginBottom: 0,
      minHeight: 15,
      maxHeight: 40,
    },
  });

  return styles;
};

export const CalendarEventForMonthView = React.memo(_CalendarEventForMonthView)
