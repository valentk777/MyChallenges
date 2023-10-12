import groupBy from 'lodash/groupBy';
import filter from 'lodash/filter';
import find from 'lodash/find';

import React, { Component, useEffect, useState } from 'react';
import { Alert, View, Text, StyleSheet, TextInput } from 'react-native';
import {
  ExpandableCalendar,
  TimelineEventProps,
  TimelineList,
  CalendarProvider,
  TimelineProps,
  CalendarUtils,
} from 'react-native-calendars';
import challengesService from '../../services/challengesService';
import { Challenge, DailyCalendarChallenge } from '../../entities/challenge';
import timeService from '../../services/timeService';
import MyModal from '../Modals/MyModal';
import { AppTheme } from '../../styles/themeModels';
import { useTheme } from '../../hooks/useTheme';
import TimePicker from '../TimePickers/TimePicker';
import AddEventInputArea from './AddEventInputArea';
import { Theme } from "react-native-calendars/src/types";

// ------------ TODO: DELETE
const EVENT_COLOR = '#e6add8';
const today = new Date();
const getDate = (offset = 0) => CalendarUtils.getCalendarDateString(new Date().setDate(today.getDate() + offset));
const timelineEvents: TimelineEventProps[] = [
  {
    start: `${getDate(-1)} 09:20:00`,
    end: `${getDate(-1)} 12:00:00`,
    title: 'Merge Request to React Native Calendars',
    summary: 'Merge Timeline Calendar to React Native Calendars'
  },
  {
    start: `${getDate()} 01:15:00`,
    end: `${getDate()} 02:30:00`,
    title: 'Meeting A',
    summary: 'Summary for meeting A',
    color: EVENT_COLOR
  },
  {
    start: `${getDate()} 01:30:00`,
    end: `${getDate()} 02:30:00`,
    title: 'Meeting B',
    summary: 'Summary for meeting B',
    color: EVENT_COLOR
  },
];
const INITIAL_TIME = { hour: 9, minutes: 0 };
const EVENTS: TimelineEventProps[] = timelineEvents;
// ------------ TODO: DELETE




const StatusAndNotesCalendar = () => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  // const [challenges, setChallenges] = useState([] as Challenge[]);
  const [eventsByDate, setEventsByDate] = useState({} as { [key: string]: TimelineEventProps[] });
  const [currentDate] = useState(timeService.getCurrentDateString());
  const [isModalVisible, setIsModalVisible] = useState(false);



  // useEffect(() => {
  //   challengesService.getAllChallenges().then((challenges) => {
  //     setChallenges(challenges);
  //     updateEventsByDate(challenges);
  //   });
  // }, [challenges]);

  // useEffect(() => {
  //   challengesService.getAllChallenges().then((challenges) => {
  //     setChallenges(challenges);
  //     setEventsByDate(challenges);
  //   });
  // }, [challenges]);

  const getMarkedDaysFromChallenges = (challenges: Challenge[]) => {
    challenges.map(challenge => {
      const calendarChallenge = challenge as DailyCalendarChallenge;

      // if (calendarChallenge)


      // if (typeof(challenge) == DailyCalendarChallenge){

      // }


      // challenge.timeCreated
    })
  }

  // const updateEventsByDate = (challenges : Challenge[]) => {

  // }


  // const state = {
  //   currentDate: getDate(),
  //   events: EVENTS,
  //   eventsByDate: groupBy(EVENTS, e => CalendarUtils.getCalendarDateString(e.start)) as {
  //     [key: string]: TimelineEventProps[];
  //   }
  // };

  // const marked = {
  //   // [`${getDate(-1)}`]: { marked: true },
  //   // [`${getDate()}`]: { marked: true },
  //   // [`${getDate(1)}`]: { marked: true },
  //   // [`${getDate(2)}`]: { marked: true },
  //   // [`${getDate(4)}`]: { marked: true },
  //   [`${getDate()}`]: {
  //     marked: true,
  //     periods: [
  //       {startingDay: true, endingDay: false, color: 'green'},
  //       {startingDay: true, endingDay: false, color: 'orange'}
  //     ]
  //   },
  //   [`${getDate(1)}`]: {
  //     periods: [
  //       {startingDay: false, endingDay: true, color: 'green'},
  //       {startingDay: false, endingDay: false, color: 'orange'},
  //       {startingDay: true, endingDay: false, color: 'pink'}
  //     ]
  //   },
  //   [`${getDate(2)}`]: {
  //     periods: [
  //       {startingDay: true, endingDay: true, color: 'orange'},
  //       // {color: 'transparent'},
  //       {startingDay: false, endingDay: false, color: 'pink'}
  //     ]
  //   }
  // };

  const onDateChanged = (date: string, source: string) => {
    console.log('TimelineCalendarScreen onDateChanged: ', date, source);
    // setState({ currentDate: date });
  };

  const onMonthChange = (month: any, updateSource: any) => {
    console.log('TimelineCalendarScreen onMonthChange: ', month, updateSource);
  };

  const createNewEvent: TimelineProps['onBackgroundLongPress'] = (timeString, timeObject) => {
    console.log('TimelineProps onBackgroundLongPress: ', timeString, timeObject);

    setIsModalVisible(true);

    // const { eventsByDate } = this.state;
    // const hourString = `${(timeObject.hour + 1).toString().padStart(2, '0')}`;
    // const minutesString = `${timeObject.minutes.toString().padStart(2, '0')}`;

    // const newEvent = {
    //   id: 'draft',
    //   start: `${timeString}`,
    //   end: `${timeObject.date} ${hourString}:${minutesString}:00`,
    //   title: 'New Event',
    //   color: 'white'
    // };

    // if (timeObject.date) {
    //   if (eventsByDate[timeObject.date]) {
    //     eventsByDate[timeObject.date] = [...eventsByDate[timeObject.date], newEvent];
    //     setState({ eventsByDate });
    //   } else {
    //     eventsByDate[timeObject.date] = [newEvent];
    //     setState({ eventsByDate: { ...eventsByDate } });
    //   }
    // }
  };

  const approveNewEvent: TimelineProps['onBackgroundLongPressOut'] = (_timeString, timeObject) => {
    console.log('TimelineProps onBackgroundLongPressOut: ', _timeString, timeObject);

    // const { eventsByDate } = this.state;

    // Alert.prompt('New Event', 'Enter event title', [
    //   {
    //     text: 'Cancel',
    //     onPress: () => {
    //       if (timeObject.date) {
    //         eventsByDate[timeObject.date] = filter(eventsByDate[timeObject.date], e => e.id !== 'draft');

    //         this.setState({
    //           eventsByDate
    //         });
    //       }
    //     }
    //   },
    //   {
    //     text: 'Create',
    //     onPress: eventTitle => {
    //       if (timeObject.date) {
    //         const draftEvent = find(eventsByDate[timeObject.date], { id: 'draft' });
    //         if (draftEvent) {
    //           draftEvent.id = undefined;
    //           draftEvent.title = eventTitle ?? 'New Event';
    //           draftEvent.color = 'lightgreen';
    //           eventsByDate[timeObject.date] = [...eventsByDate[timeObject.date]];

    //           this.setState({
    //             eventsByDate
    //           });
    //         }
    //       }
    //     }
    //   }
    // ]);
  };


  const onEventPress: TimelineProps['onEventPress'] = (event) => {
    console.log('TimelineProps onBackgroundLongPressOut: ', event);
  };

  const timelineProps: Partial<TimelineProps> = {
    format24h: true,
    onBackgroundLongPress: createNewEvent,
    onBackgroundLongPressOut: approveNewEvent,
    onEventPress: onEventPress,
    // unavailableHours: [{ start: 0, end: 6 }, { start: 22, end: 24 }],
    // overlapEventsSpacing: 8,
    // rightEdgeSpacing: 24,
  };

  // const { currentDate, eventsByDate } = this.state;

  return (
    <View style={styles.container}>
      <CalendarProvider
        date={currentDate}
        onDateChanged={onDateChanged}
        onMonthChange={onMonthChange}
        disabledOpacity={0}
        numberOfDays={1}
        style={styles.calendarContainer}
        theme={styles.calendarTheme}
        showTodayButton={false}
      >
        <ExpandableCalendar
          firstDay={1}
          theme={styles.calendarTheme}
          allowShadow={true}
        // style={styles.calendarContainer}
        showScrollIndicator={true}

        // markingType={'multi-period'}
        // leftArrowImageSource={require('../img/previous.png')}
        // rightArrowImageSource={require('../img/next.png')}
        // markedDates={marked} // todo: change to state data
        />
        {/* <View 
        style={styles.calendarContainer}
        > */}
        <TimelineList
          events={eventsByDate}
          timelineProps={timelineProps}
          showNowIndicator
          scrollToNow

        // scrollToFirst
        // initialTime={INITIAL_TIME}
        />
        {/* </View> */}
      </CalendarProvider>
      <View style={styles.modalContainer}>
        <MyModal isModalVisible={isModalVisible} hideModal={() => setIsModalVisible(false)}>
          <View style={styles.eventInputArea}>
          <AddEventInputArea />
          </View>
        </MyModal>
      </View>
    </View>
  );
}

const createStyles = (theme: AppTheme) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    calendarContainer: {
      flex: 4,
    },
    modalContainer: {
      flex: 1,
    },
    calendarTheme: {
      arrowColor: theme.colors.canvasInverted,
      textDayFontFamily: theme.fonts.light,
      textMonthFontFamily: theme.fonts.bold,
      textDayHeaderFontFamily: theme.fonts.medium,
      todayTextColor: theme.colors.tertiary,
    } as Theme,
    eventInputArea: {
      top: 0,
      height: '50%',
      width: '100%',
      position: 'absolute',
      // justifyContent: 'center',
      // alignItems: 'center',
      // backgroundColor: 'green'
    }
  });

  return styles;
};

export default StatusAndNotesCalendar;