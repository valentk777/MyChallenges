import dayjs from 'dayjs'
import React, { memo, useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useTheme } from '../../hooks/useTheme'
import { CustomCalendarEvent } from '../../entities/customCalendarEvent'
import { CalendarBodyForMonthView } from './CalendarBodyForMonthView'
import { AppTheme } from '../../styles/themeModels'
import { CalendarHeaderForMonthView } from './CalendarHeaderForMonthView'
import screenConstants from '../../constants/constants'

export interface CalendarContainerProps {
  events: CustomCalendarEvent[]
  date: Date
  onPressCell: (date: Date) => void
  onLongPressCell: (date: Date) => void
  onPressEvent: (event: CustomCalendarEvent) => void
  onPressMoreLabel: (event: CustomCalendarEvent[]) => void
}

const _CalendarContainer = ({
  events,
  date,
  onPressCell,
  onLongPressCell,
  onPressEvent,
  onPressMoreLabel,
}: CalendarContainerProps) => {

  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [targetDate, setTargetDate] = useState(dayjs(date))

  useEffect(() => {
    if (date) {
      setTargetDate(dayjs(date))
    }
    console.log("_CalendarContainer");
    console.log(events.length);
  }, [date, events])

  const onToday = () => {
    setTargetDate(dayjs(date))
  }

  const onChangeDate = (date: dayjs.Dayjs) => {
    setTargetDate(date);
  }

  return (
    <View style={styles.constainer}>
      <View style={styles.calendarHeader}>
        <CalendarHeaderForMonthView
          onToday={onToday}
          currentDate={targetDate.toDate()}
        />
      </View>
      <View style={styles.calendarBody}>
        <CalendarBodyForMonthView
          events={events}
          targetDate={targetDate}
          onChangeDate={onChangeDate}
          onPressCell={onPressCell}
          onLongPressCell={onLongPressCell}
          onPressEvent={onPressEvent}
          onPressMoreLabel={onPressMoreLabel}
        />
      </View>
    </View>
  )
}

const createStyles = (theme: AppTheme) => {
  const styles = StyleSheet.create({
    constainer: {
      height: screenConstants.screenHeight - 149
    },
    calendarHeader: {
      height: 80
    },
    calendarBody: {
      height: screenConstants.screenHeight - 149 - 80
    },
  });

  return styles;
};

// export const MyCalendar = memo(_CalendarContainer)
export const MyCalendar = _CalendarContainer