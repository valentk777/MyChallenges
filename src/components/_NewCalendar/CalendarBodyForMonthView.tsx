import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView
} from 'react-native'
import { CustomCalendarEvent } from '../../entities/customCalendarEvent'
import { CalendarEventForMonthView } from './CalendarEventForMonthView'
import { useTheme } from '../../hooks/useTheme'
import { AppTheme } from '../../styles/themeModels'
import { useTranslation } from 'react-i18next'
import InfiniteList from './InfiniteList'
import constants from '../../constants/constants'
import { useCombinedRefs } from '../../hooks/useCombinedRefs'

dayjs.extend(duration)

const NUMBER_OF_PAGES = 50;
const CELL_HEIGHT = 90;
const CELL_WIDTH = constants.screenWidth / 7;

interface CalendarBodyForMonthViewProps {
  events: CustomCalendarEvent[]
  targetDate: dayjs.Dayjs
  onChangeDate: (date: dayjs.Dayjs) => void
  onPressCell: (date: Date) => void
  onLongPressCell: (date: Date) => void
  onPressEvent: (event: CustomCalendarEvent) => void
  onPressMoreLabel: (events: CustomCalendarEvent[], date: Date) => void
}

const getFirstDayOfWeeksArray = (date: dayjs.Dayjs) => {
  const array: dayjs.Dayjs[] = [];
  const customStartOfWeek = 1; // start on monday
  const firstDayOfTheWeek = date.startOf('week').day(customStartOfWeek);

  console.log(date);
  console.log(firstDayOfTheWeek);

  for (let index = -NUMBER_OF_PAGES; index <= NUMBER_OF_PAGES; index++) {
    array.push(firstDayOfTheWeek.add(index * 7, 'day'));
  }

  return array;
}

const getFirstDayOfMonthIndex = (items, targetDate) => {
  let index = NUMBER_OF_PAGES - 7;

  while (items[index].month() < targetDate.month()) {
    index += 1;
  }

  return index - 1;
}

const _CalendarBodyForMonthView = ({
  events,
  targetDate,
  onChangeDate,
  onPressCell,
  onLongPressCell,
  onPressEvent,
  onPressMoreLabel,
}: CalendarBodyForMonthViewProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { t } = useTranslation('status-calendar-screen');

  const ref = useRef<ScrollView>();
  const [items, setItems] = useState<dayjs.Dayjs[]>(getFirstDayOfWeeksArray(targetDate));
  const [positionIndex, setPositionIndex] = useState<number>(getFirstDayOfMonthIndex(items, targetDate));
  const listRef = useCombinedRefs(ref);

  const isToday = (date: dayjs.Dayjs) => {
    const today = dayjs();
    return today.isSame(date, 'day');
  }

  // const sortedEvents = useCallback(
  const sortedEvents = (day: dayjs.Dayjs) => {
      /**
       * Better way to sort overlapping events that spans accross multiple days
       * For example, if you want following events
       * Event 1, start = 01/01 12:00, end = 02/01 12:00
       * Event 2, start = 02/01 12:00, end = 03/01 12:00
       * Event 3, start = 03/01 12:00, end = 04/01 12:00
       *
       * When drawing calendar in month view, event 3 should be placed at 3rd index for 03/01, because Event 2 are placed at 2nd index for 02/01 and 03/01
       *
       */
      let min = day.startOf('day'),
        max = day.endOf('day')

      //filter all events that starts from the current week until the current day, and sort them by reverse starting time
      let filteredEvents = events
        .filter(
          ({ start, end }) =>
            dayjs(end).isAfter(day.startOf('week')) && dayjs(start).isBefore(max),
        )
        .sort((a, b) => {
          if (dayjs(a.start).isSame(b.start, 'day')) {
            const aDuration = dayjs.duration(dayjs(a.end).diff(dayjs(a.start))).days()
            const bDuration = dayjs.duration(dayjs(b.end).diff(dayjs(b.start))).days()
            return aDuration - bDuration
          }
          return b.start.getTime() - a.start.getTime()
        })

      /**
       * find the most relevant min date to filter the events
       * in the example:
       * 1. when rendering for 01/01, min date will be 01/01 (start of day for event 1)
       * 2. when rendering for 02/01, min date will be 01/01 (start of day for event 1)
       * 3. when rendering for 03/01, min date will be 01/01 (start of day for event 1)
       * 4. when rendering for 04/01, min date will be 01/01 (start of day for event 1)
       * 5. when rendering for 05/01, min date will be 05/01 (no event overlaps with 05/01)
       */
      filteredEvents.forEach(({ start, end }) => {
        if (dayjs(end).isAfter(min) && dayjs(start).isBefore(min)) {
          min = dayjs(start).startOf('day')
        }
      })

      filteredEvents = filteredEvents
        .filter(
          ({ start, end }) => dayjs(end).endOf('day').isAfter(min) && dayjs(start).isBefore(max),
        )
        .reverse()
      /**
       * We move eligible event to the top
       * For example, when rendering for 03/01, Event 3 should be moved to the top, since there is a gap left by Event 1
       */
      let finalEvents: CustomCalendarEvent[] = []
      let tmpDay: dayjs.Dayjs = day.startOf('week')
      //re-sort events from the start of week until the calendar cell date
      //optimize sorting of event nodes and make sure that no empty gaps are left on top of calendar cell
      while (!tmpDay.isAfter(day)) {
        filteredEvents.forEach((event) => {
          if (dayjs(event.end).isBefore(tmpDay.startOf('day'))) {
            let eventToMoveUp = filteredEvents.find((e) =>
              dayjs(e.start).startOf('day').isSame(tmpDay.startOf('day')),
            )
            if (eventToMoveUp != undefined) {
              //remove eventToMoveUp from finalEvents first
              if (finalEvents.indexOf(eventToMoveUp) > -1) {
                finalEvents.splice(finalEvents.indexOf(eventToMoveUp), 1)
              }

              if (finalEvents.indexOf(event) > -1) {
                finalEvents.splice(finalEvents.indexOf(event), 1, eventToMoveUp)
              } else {
                finalEvents.push(eventToMoveUp)
              }
            }
          } else if (finalEvents.indexOf(event) == -1) {
            finalEvents.push(event)
          }
        })

        tmpDay = tmpDay.add(1, 'day')
      }

      return finalEvents
    };

  const getMaxEventsCount = (date: dayjs.Dayjs) => {
    //TODO: implemenet based on events count this day
    const maxVisibleEventCount = 3;

    return maxVisibleEventCount;
  }

  const onPageChange = useCallback((pageIndex: number, _: number, info: { scrolledByUser: boolean }) => {
    if (info.scrolledByUser) {
      onChangeDate(items[pageIndex]);
    }
  }, [items]);

  const reloadPages = useCallback(
    pageIndex => {
      addItems(pageIndex);
    },
    [items, events]
  );

  const addItems = (index: number) => {
    const array: dayjs.Dayjs[] = [...items];
    const startingDate = items[index];
    const shouldAppend = index > NUMBER_OF_PAGES;

    if (startingDate) {
      if (shouldAppend) {
        for (let i = 2; i <= NUMBER_OF_PAGES; i++) {
          array.push(startingDate.add(index * 7, 'day'));
        }
      } else {
        for (let i = -1; i > -NUMBER_OF_PAGES; i--) {
          array.unshift(startingDate.add(index * 7, 'day'));
        }
      }

      setPositionIndex(shouldAppend ? index : NUMBER_OF_PAGES - 1);
      setItems(array);
    }
  };

  const renderEventsWithMaxEventCount = (
    index: number,
    event: CustomCalendarEvent,
    date: dayjs.Dayjs,
    maxVisibleEventCount: number
  ) => {

    if (index > maxVisibleEventCount) {
      return (null);
    }

    if (index === maxVisibleEventCount) {
      return (
        <View
          key={index}
          style={styles.moreEventsContainer}>
          <Text
            style={styles.moreEventsText}
            onPress={() => onPressMoreLabel?.(events, date.toDate())}
          >
            {t("more-events").replace('{moreCount}', `${events.length - maxVisibleEventCount}`)}
          </Text>
        </View>
      )
    }

    return (
      <CalendarEventForMonthView
        key={index}
        event={event}
        onPressEvent={onPressEvent}
        date={date}
        calendarWidth={constants.screenWidth}
      />
    );
  };

  const renderOneDayCellEvents = (date: dayjs.Dayjs, dayIndexInRow: number) => {
    const maxVisibleEventCount = getMaxEventsCount(date);

    return (
      <View
      key={date.format("DD/MM")}
      style={{
        position: 'absolute',
        zIndex: 2,
        // width: CELL_WIDTH,
        top: CELL_HEIGHT * 0.2,
        height: CELL_HEIGHT * 0.8,
        // left: index * CELL_WIDTH,
        // backgroundColor: 'blue'
      }}
      >
        {sortedEvents(date).reduce(
          (elements, event, index) => [...elements, renderEventsWithMaxEventCount(index, event, date, maxVisibleEventCount)],
          [] as (null | JSX.Element)[],
        )}
      </View>
    )
  };

  const renderOneDayCell = (date: dayjs.Dayjs) => {
    return (
      <TouchableOpacity
        style={styles.oneDayCellContainer}
        key={date.toDate().toDateString()}
        onPress={() => onPressCell(date.toDate())}
        onLongPress={() => onLongPressCell(date.toDate())}
      >
        <Text
          style={[
            isToday(date) ? styles.todayDateCell : styles.dateCell,
            // TODO: fix when month display will be fixed
            // date.month() !== targetDate.month() ? { color: theme.colors.canvasInverted } : {}
          ]}
        >
          {date.format("DD/MM")}
          {/* {date.format('D')} */}
        </Text>
      </TouchableOpacity>
    )
  };

  const renderItem = useCallback((_type: any, firstDayOfTheWeek: dayjs.Dayjs) => {
    const weekDates = [...Array(7)].map((_, index) => firstDayOfTheWeek.add(index, 'day'));

    return (
      <View style={styles.weekRowContainer}>
        {weekDates.map((date, index) => (renderOneDayCellEvents(date, index)))}
        {weekDates.map((date) => (renderOneDayCell(date)))}
      </View>
    );
  }, [items, events]);

  return (
    <View style={styles.container}>
      <InfiniteList
        key="calendar-list"
        ref={listRef}
        data={items}
        renderItem={renderItem}
        reloadPages={reloadPages}
        onReachNearEdgeThreshold={Math.round(NUMBER_OF_PAGES * 0.4)}
        // extendedState={calendarProps?.markedDates}
        isHorizontal={false}
        // style={style.current.container}
        initialPageIndex={positionIndex}
        positionIndex={positionIndex}
        pageHeight={CELL_HEIGHT}
        pageWidth={constants.screenWidth}
        // onPageChange={onPageChange}
        scrollViewProps={{ showsHorizontalScrollIndicator: false, showsVerticalScrollIndicator: false }}
        disableScrollOnDataChange={false}
      />
    </View>
  )
}

const createStyles = (theme: AppTheme) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      flex: 1,
    },
    weekRowContainer: {
      width: constants.screenWidth,
      flexDirection: 'row',
    },
    dateCell: {
      textAlign: 'center',
      fontSize: 12,
      fontFamily: theme.fonts.semiBold,
      color: theme.colors.primary,
    },
    todayDateCell: {
      textAlign: 'center',
      fontSize: 12,
      fontFamily: theme.fonts.bold,
      color: theme.colors.exceptional,
    },
    oneDayCellContainer: {
      height: CELL_HEIGHT - 1,
      width: CELL_WIDTH - 1,
      flexDirection: 'column',
      marginBottom: 1,
      marginRight: 1,
      backgroundColor: theme.colors.canvas,
      borderRadius: 10,
    },
    oneDayCellBody: {
      marginBottom: 1,
      marginRight: 1,
      width: constants.screenWidth,
      // position: 'absolute',
      backgroundColor: theme.colors.canvas,
      // borderColor: theme.colors.canvasInverted,
      borderRadius: 10,
      // borderWidth: 1,
    },
    moreEventsContainer: {
      // marginTop: 2,
      // bottom: 0,
      // top: 0,
      // backgroundColor: 'green',
      //TODO: fix at the bottom of the cell
    },
    moreEventsText: {
      // marginTop: 2,
      fontFamily: theme.fonts.bold,
      fontSize: 9,
      color: theme.colors.primary,
      //TODO: fix at the bottom of the cell
    },
  });

  return styles;
};

// export const CalendarBodyForMonthView = memo(_CalendarBodyForMonthView)
export const CalendarBodyForMonthView = _CalendarBodyForMonthView
