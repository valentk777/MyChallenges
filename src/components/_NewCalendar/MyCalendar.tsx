import dayjs from 'dayjs'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useTheme } from '../../hooks/useTheme'
import { CustomCalendarEvent } from '../../entities/customCalendarEvent'
import { CalendarBodyForMonthView } from './CalendarBodyForMonthView'
import { AppTheme } from '../../styles/themeModels'
import { CalendarHeaderForMonthView } from './CalendarHeaderForMonthView'
import screenConstants from '../../constants/constants'


export type DateRangeHandler = ([start, end]: [Date, Date]) => void
export type WeekNum = 0 | 1 | 2 | 3 | 4 | 5 | 6

export interface CalendarContainerProps {
  events: CustomCalendarEvent[]
  date: Date
  weekStartsOn?: WeekNum
  onToday: () => void
  onChangeDate: DateRangeHandler
  onPressCell: (date: Date) => void
  onLongPressCell: (date: Date) => void
  onPressEvent: (event: CustomCalendarEvent) => void
  onPressMoreLabel: (event: CustomCalendarEvent[]) => void
}

const _CalendarContainer = ({
  events,
  date,
  weekStartsOn = 0,
  onToday,
  onChangeDate,
  onPressCell,
  onLongPressCell,
  onPressEvent,
  onPressMoreLabel,
}: CalendarContainerProps) => {

  const { theme } = useTheme();
  const styles = createStyles(theme);


  // const window = useWindowDimensions();

  // const getDatesInMonth = (date: Date | dayjs.Dayjs = new Date())=>  {
  //   const subject = dayjs(date)
  //   const days = Array(subject.daysInMonth())
  //     .fill(0)
  //     .map((_, i) => {
  //       return subject.date(i + 1).locale(currentLanguage)
  //     })
  //   return days
  // }

  const [initialDate, setTargetDate] = React.useState(dayjs(date))

  React.useEffect(() => {
    if (date) {
      setTargetDate(dayjs(date))
    }
  }, [date])

  // const allDayEvents = React.useMemo(
  //   () => events.filter((event) => event.isFullDayEvent),
  //   [events],
  // )

  // const daytimeEvents = React.useMemo(
  //   () => events.filter((event) => !event.isFullDayEvent),
  //   [events],
  // )

  // const getDateRange = React.useCallback(
  //   (date: dayjs.Dayjs) => {
  //     return getDatesInMonth(date)
  //   },
  //   [currentLanguage, weekStartsOn],
  // )

  // const cellHeight = React.useMemo(
  //   () => Math.max(height - 30, MIN_HEIGHT) / 24,
  //   [height],
  // )

  // const onSwipeHorizontal = React.useCallback(
  //   (direction: HorizontalDirection) => {
  //     if (!swipeEnabled) {
  //       return
  //     }
  //     let nextTargetDate: dayjs.Dayjs
  //     if ((direction === 'LEFT' && !theme.isRTL) || (direction === 'RIGHT' && theme.isRTL)) {
  //       nextTargetDate = targetDate.add(modeToNum('month', targetDate), 'day')
  //     } else {
  //       nextTargetDate = targetDate.add(targetDate.date() * -1, 'day')
  //     }
  //     setTargetDate(nextTargetDate)
  //     if (onChangeDate) {
  //       const nextDateRange = getDateRange(nextTargetDate)
  //       onChangeDate([nextDateRange[0].toDate(), nextDateRange.slice(-1)[0].toDate()])
  //     }
  //   },
  //   [swipeEnabled, targetDate, getDateRange, onChangeDate],
  // )

  // const commonProps = {
  //   cellHeight,
  //   dateRange: getDateRange(targetDate),
  //   onPressEvent,
  // }

  return (
    <View style={styles.constainer}>
      <View style={styles.calendarHeader}>
      <CalendarHeaderForMonthView
        onToday={onToday}
        currentDate={date}
      />
      </View>
      <View style={styles.calendarBody}>
      <CalendarBodyForMonthView
        events={events}
        initialDate={initialDate}
        weekStartsOn={weekStartsOn}
        // onChangeDate={onChangeDate}
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

export const MyCalendar = React.memo(_CalendarContainer)