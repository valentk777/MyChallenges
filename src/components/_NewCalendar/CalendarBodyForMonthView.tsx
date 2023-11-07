import calendarize, { Week } from 'calendarize'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import duration from 'dayjs/plugin/duration'
import * as React from 'react'
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  LayoutRectangle,
  FlatList,
  ScrollView
} from 'react-native'
import { CustomCalendarEvent } from '../../entities/customCalendarEvent'
import { CalendarEventForMonthView } from './CalendarEventForMonthView'
import { useTheme } from '../../hooks/useTheme'
import { AppTheme } from '../../styles/themeModels'
import { useTranslation } from 'react-i18next'
import { useCallback, useMemo, useRef, useState } from 'react'
import InfiniteList from './InfiniteList'
import constants from '../../constants/constants'

dayjs.extend(isBetween)
dayjs.extend(duration)

export type WeekNum = 0 | 1 | 2 | 3 | 4 | 5 | 6;

const NUMBER_OF_PAGES = 50;


interface CalendarBodyForMonthViewProps {
  events: CustomCalendarEvent[]
  initialDate: dayjs.Dayjs
  weekStartsOn: WeekNum
  // onChangeDate: DateRangeHandler
  onPressCell: (date: Date) => void
  onLongPressCell: (date: Date) => void
  onPressEvent: (event: CustomCalendarEvent) => void
  onPressMoreLabel: (events: CustomCalendarEvent[], date: Date) => void
}

const getFirstDayOfWeeksArray = (date: dayjs.Dayjs) => {
  const array: dayjs.Dayjs[] = [];
  const customStartOfWeek = 1; // start on monday
  const firstDayOfTheWeek = date.startOf('week').day(customStartOfWeek);

  for (let index = -NUMBER_OF_PAGES; index <= NUMBER_OF_PAGES; index++) {
    array.push(firstDayOfTheWeek.add(index * 7, 'day'));
  }

  return array;
}

const _CalendarBodyForMonthView = ({
  events,
  initialDate,
  weekStartsOn,
  onPressCell,
  onLongPressCell,
  onPressEvent,
  onPressMoreLabel,
}: CalendarBodyForMonthViewProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { t } = useTranslation('status-calendar-screen');

  const [calendarWidth, setCalendarWidth] = React.useState<number>(0);
  const [calendarHeight, setCalendarHeight] = React.useState<number>(0);

  const list = useRef<ScrollView>();
  const [items, setItems] = useState<dayjs.Dayjs[]>(getFirstDayOfWeeksArray(initialDate));
  const [positionIndex, setPositionIndex] = useState(NUMBER_OF_PAGES);

  // for static header
  const [currentMonth, setCurrentMonth] = useState(initialDate);



  
  const [calendarCellHeight, setCalendarCellHeight] = React.useState<number>(0);

  const minCellHeight = calendarHeight / 6;

  const isToday = (date: dayjs.Dayjs) => {
    const today = dayjs();
    return today.isSame(date, 'day');
  }

  // const getCalendarCellStyle = React.useMemo(
  //   () => (typeof calendarCellStyle === 'function' ? calendarCellStyle : () => calendarCellStyle),
  //   [calendarCellStyle],
  // )

  // const getCalendarCellTextStyle = React.useMemo(
  //   () =>
  //     typeof calendarCellTextStyle === 'function'
  //       ? calendarCellTextStyle
  //       : () => calendarCellTextStyle,
  //   [calendarCellTextStyle],
  // )

  const sortedEvents = React.useCallback(
    (day: dayjs.Dayjs) => {
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
    },
    [events],
  )

  const getMaxEventsCount = (date: dayjs.Dayjs) => {
    //TODO: implemenet based on events count this day
    const maxVisibleEventCount= 2;

    return maxVisibleEventCount;
  }


  const renderMoreEvents = (date: dayjs.Dayjs, index: number, maxVisibleEventCount: number) => {

    return (
    <Text
      key={index}
      style={styles.moreEventsContainer}
      onPress={() => onPressMoreLabel?.(events, date.toDate())}
    >
      {
      t("more-events").replace(
        '{moreCount}',
        `${events.length - maxVisibleEventCount}`,
      )}
    </Text>
  )};

  const renderMaxVisibleEventCount = (
    index: number,
    event: CustomCalendarEvent,
    date: dayjs.Dayjs,
    dayOfTheWeek: number,
    maxVisibleEventCount: number
  ) => {

    return (
      index === maxVisibleEventCount
        ? renderMoreEvents(date, index, maxVisibleEventCount)
        : <CalendarEventForMonthView
          key={index}
          event={event}
          onPressEvent={onPressEvent}
          date={date}
          dayOfTheWeek={dayOfTheWeek}
          calendarWidth={calendarWidth}
        />
    )
  };

  const renderEventsInCell = (date: dayjs.Dayjs, dayOfTheWeek: number) => {
    const maxVisibleEventCount = getMaxEventsCount(date);

    return (
      date &&
      sortedEvents(date).reduce(
        (elements, event, index, events) => [
          ...elements,
          index > maxVisibleEventCount
            ? null
            : renderMaxVisibleEventCount(index, event, date, dayOfTheWeek, maxVisibleEventCount),
        ],
        [] as (null | JSX.Element)[],
      )
    )
  };

  const renderDateCell = (date: dayjs.Dayjs | null, index: number) => {
    return (
      <Text
        style={[
          date && isToday(date) ? styles.todayDateCell : styles.dateCell,
          date?.month() !== initialDate.month() ? {color: theme.colors.canvasInverted} : {}
        ]}
      >
        {date && date.format('D')}
      </Text>
    )
  }

  const renderOneDayCell = (date: dayjs.Dayjs, numberOfWeek: number, dayOfTheWeek: number) => {
    return (
      <TouchableOpacity
        onLongPress={() => date && onLongPressCell && onLongPressCell(date.toDate())}
        onPress={() => date && onPressCell && onPressCell(date.toDate())}
        style={[
          // numberOfWeek > 0 && { borderTopWidth: 1 },
          // dayOfTheWeek > 0 && { borderLeftWidth: 1 },
          { minHeight: minCellHeight },
          styles.oneDayCellContainer,
        ]}
        key={dayOfTheWeek}
        onLayout={({ nativeEvent: { layout } }) =>
          // Only set calendarCellHeight once because they are all same
          numberOfWeek === 0 && dayOfTheWeek === 0 && setCalendarCellHeight(layout.height)
        }
      >
        <TouchableOpacity
          onPress={() => date && onPressCell && onPressCell(date.toDate())}
          onLongPress={() => date && onLongPressCell && onLongPressCell(date.toDate())}
        >
          {renderDateCell(date, numberOfWeek)}
        </TouchableOpacity>

        {renderEventsInCell(date, dayOfTheWeek)}
      </TouchableOpacity>
    )
  };

  const setLayout = (layout: LayoutRectangle) => {
    setCalendarWidth(layout.width);
    setCalendarHeight(layout.height);
  }
 
  const renderItem = useCallback((_type: any, firstDayOfTheWeek: dayjs.Dayjs) => {
    console.log(_type);
    console.log(firstDayOfTheWeek);

    const weekDates = [...Array(7)].map((_, index) =>
    firstDayOfTheWeek.add(index, 'day')
  );
  
    // const getWeeksWithAdjacentMonths = (targetDate: dayjs.Dayjs, weekStartsOn: WeekNum)=> {
    //   let weeks = calendarize(targetDate.toDate(), weekStartsOn)

    //   console.log(weeks);
    //   const firstDayIndex = weeks[0].findIndex((d) => d === 1)
    //   const lastDay = targetDate.endOf('month').date()
    //   const lastDayIndex = weeks[weeks.length - 1].findIndex((d) => d === lastDay)
    
    //   weeks = weeks.map((week, iw) => {
    //     return week.map((day, id) => {
    //       if (day !== 0) {
    //         return day;
    //       }
    
    //       if (iw === 0) {
    //         return day - (firstDayIndex - id - 1);
    //       }
    
    //       return lastDay + (id - lastDayIndex);
    //     }) as Week
    //   })
    
    //   return weeks;
    // }

    // const weeks = getWeeksWithAdjacentMonths(initialDate, weekStartsOn);

    return (
      <View
      key={numberOfWeek}
      style={[{ minHeight: minCellHeight }, styles.weekRowContainer]}
    >
      {week
        .map((day) => day > 0 ? initialDate.date(day) : null)
        // .map((day) => initialDate.date(day))
        .map((date, dayOfTheWeek) => (renderOneDayCell(date, numberOfWeek, dayOfTheWeek)))}
    </View>

      // <Calendar
      //   {...calendarProps}
      //   {...headerProps}
      //   initialDate={item}
      //   disableMonthChange
      //   hideArrows={!horizontal}
      //   onPressArrowRight={scrollToNextMonth}
      //   onPressArrowLeft={scrollToPreviousMonth} 
      //   hideExtraDays={calendarProps?.hideExtraDays || true}
      //   style={[style.current.calendar, calendarProps?.style]}
      //   headerStyle={horizontal ? calendarProps?.headerStyle : undefined}
      //   testID={`${testID}_${item}`}
      //   // context={context}
      // />
    );
  }, []);

  const onPageChange = useCallback((pageIndex: number, _: number, info: {scrolledByUser: boolean}) => {
    if (info.scrolledByUser) {
      console.log("cscdscasdcasc");

      setCurrentMonth(items[pageIndex]);
    }
  }, [items]);

  return (
    <View
      style={[{ height: calendarHeight }, styles.container]}
      onLayout={({ nativeEvent: { layout } }) => setLayout(layout)}
    >

<InfiniteList
    key="calendar-list"
      ref={list}
      data={items}
      renderItem={renderItem}


        // reloadPages={reloadPages}
        onReachNearEdgeThreshold={Math.round(NUMBER_OF_PAGES * 0.4)}
        // extendedState={calendarProps?.markedDates}
        isHorizontal={false}
        // style={style.current.container}
        initialPageIndex={NUMBER_OF_PAGES}
        positionIndex={positionIndex}
        // pageHeight={500}
        // pageWidth={constants.screenWidth}
        onPageChange={onPageChange}
        scrollViewProps={{ showsHorizontalScrollIndicator: false, showsVerticalScrollIndicator: false }}


    // // windowSize={shouldUseAndroidRTLFix ? pastScrollRange + futureScrollRange + 1 : undefined}
    //   showsVerticalScrollIndicator={false}
    //   showsHorizontalScrollIndicator={false}
    //   renderItem={renderItem}
    //   // getItemLayout={getItemLayout}
    //   initialNumToRender={range.current}
    //   initialScrollIndex={initialDateIndex}
    //   // viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
    //   pagingEnabled
    //   scrollEnabled
    //   scrollsToTop={false}
    //   horizontal={false}
    //   keyExtractor={item => item.toDateString()} //  (_: any, index: number) => String(index),




      // key={timeService2.getUTCThisMonthFirstDayDate(today).toDateString()}
      // data={renderData()}
      // initialScrollIndex={5}

      // renderItem={({ item, index }) => renderItem(item, index)}
      // renderItem={({ item, index }) => renderMonthCalendar(item, index)}
      // numColumns={1}


      // maxToRenderPerBatch={1}

    // style={style.current.container}
    // data={listData}
    // pagingEnabled
    // scrollEnabled
    // renderItem={renderItem}
    // keyExtractor={keyExtractor}
    // initialScrollIndex={NUMBER_OF_PAGES}
    // getItemLayout={getItemLayout}
    // viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
    // onEndReached={onEndReached}
    // onEndReachedThreshold={1/NUM_OF_ITEMS}
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
      flex: 1,
      flexDirection: 'row',
    },
    dateCell: {
      textAlign: 'center',
      fontSize: 12,
      fontFamily: theme.fonts.semiBold,
      color: theme.colors.primary,
    },
    todayDateCell : {
      textAlign: 'center',
      fontSize: 12,
      fontFamily: theme.fonts.bold,
      color: theme.colors.exceptional,
    },
    oneDayCellContainer: {
      borderColor: theme.colors.canvasInverted,
      padding: 2,
      flex: 1,
      flexDirection: 'column',
      backgroundColor: theme.colors.canvas,
      position: 'relative',
      borderRadius: 10,
      borderWidth: 1,
    },
    moreEventsContainer:{
      marginTop: 2, 
      fontFamily: theme.fonts.bold,
      fontSize: 9,
      color: theme.colors.primary,
      //TODO: fix at the bottom of the cell
    },
  });

  return styles;
};

export const CalendarBodyForMonthView = React.memo(_CalendarBodyForMonthView)
