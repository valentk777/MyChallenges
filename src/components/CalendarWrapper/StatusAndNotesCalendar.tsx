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
import timeService from '../../services/timeService';
import MyModal from '../Modals/MyModal';
import { AppTheme } from '../../styles/themeModels';
import { useTheme } from '../../hooks/useTheme';
import CalendarEventModal from './CalendarEventModal';
import { Theme } from "react-native-calendars/src/types";
import { Note } from '../../entities/note';
import notesService from '../../services/notesService';
import timeService2 from '../../services/timeService2';

//TODO: move to calendarEventsService

const noteToEvent = (note: Note) => {
  return {
    id: note.id,
    start: new Date(note.startTime).toISOString(),
    end: new Date(note.endTime).toISOString(),
    title: note.title,
    summary: note.summary,
    color: note.color
  } as TimelineEventProps;
}

// todo: refactor
const eventToOneDayEvents = (event) => {
  let result = [] as TimelineEventProps[];

  const addEntry = (date, startTime, endTime) => {
    const newEvent = {
      id: event.id,
      start: date + 'T' + startTime,
      end: date + 'T' + endTime,
      title: event.title,
      summary: event.summary,
      color: event.color
    } as TimelineEventProps;

    result = [...result, newEvent];
  };

  // Handle the start date
  addEntry(timeService.getDate(event.start), timeService.getTime(event.start), '23:59:59.000Z');

  // Handle the end date
  let nextDay = timeService.getNextDayDateString(event.start);

  while (nextDay < timeService.getDate(event.end)) {
    addEntry(nextDay, '00:00:00.000Z', '23:59:59.000Z');

    nextDay = timeService.getNextDayDateString(nextDay);
  }

  addEntry(nextDay, '00:00:00.000Z', timeService.getTime(event.end));

  return result;
}

const noteToEvents = (note: Note) => {
  return [noteToEvent(note)];
  // v1 support only one day event
  // return eventToOneDayEvents(noteToEvent(note));
}



// --------------------------------------




const StatusAndNotesCalendar = () => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [userNotes, setUserNotes] = useState([] as Note[]);
  const [eventsByDate, setEventsByDate] = useState({} as { [key: string]: TimelineEventProps[] });
  const [currentDate] = useState(timeService.getCurrentDateString());
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [initialStartDate, setInitialStartDate] = useState(new Date());
  const [initialEndDate, setInitialEndDate] = useState(new Date());

  const [rerenderScreen, setRerenderScreen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null as Note | null);


  useEffect(() => {
    notesService.getAllNotes().then((notes) => {
      // notes.map(note => {notesService.removeNote(note.id)});
      setUserNotes(notes);

      const events = notes.flatMap(note => {
        return noteToEvents(note);
      });

      const _eventsByDate = groupBy(events, e => CalendarUtils.getCalendarDateString(e.start)) as {
        [key: string]: TimelineEventProps[];
      }

      setEventsByDate(_eventsByDate);
    });
  }, [isModalVisible, rerenderScreen]);

  const addEvetsByDate = (events: TimelineEventProps[]) => {
    events.forEach(event => {
      const startDate = timeService.getDate(event.start);
      if (eventsByDate[startDate]) {
        eventsByDate[startDate] = [...eventsByDate[startDate], event];

      } else {
        eventsByDate[startDate] = [event];
      }

      // TODO: think about performance here later.
      setEventsByDate(eventsByDate);
    });
  }

  const addNote = (note: Note) => {
    addEvetsByDate(noteToEvents(note));
  }

  const updateNote = async (note: Note) => {
    await notesService.removeNote(note.id);
    await notesService.storeNote(note);

    // todo: update event list
    const oldEvents = noteToEvents(note);
    const newEvents = noteToEvents(note);

    setRerenderScreen(!rerenderScreen);

    closeModalWithStateCleanUp();
  }

  const deleteNote = async (note: Note) => {
    await notesService.removeNote(note.id);

    // todo: update event list
    setRerenderScreen(!rerenderScreen);

    closeModalWithStateCleanUp();
  }

  const saveNoteChanges = async (note: Note) => {
    const isAddNewNote = selectedNote == null;

    if (isAddNewNote) {
      await notesService.storeNote(note);
      // addNote(newNote);
    }
    else {
      await updateNote(note);
    }

    closeModalWithStateCleanUp();
  }

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
    // console.log('TimelineCalendarScreen onDateChanged: ', date, source);
  };

  const onMonthChange = (month: any, updateSource: any) => {
    // console.log('TimelineCalendarScreen onMonthChange: ', month, updateSource);
  };

  const createNewEvent: TimelineProps['onBackgroundLongPress'] = (timeString, timeObject) => {
    const hourString = `${(timeObject.hour).toString().padStart(2, '0')}`;
    const minutesString = `${timeObject.minutes.toString().padStart(2, '0')}`;
    const eventDate = new Date(`${timeObject.date}T${hourString}:${minutesString}:00Z`);
    const utcEventDate = timeService2.getUtcDateFromLocalDate(eventDate);

    setInitialStartDate(utcEventDate);
    setInitialEndDate(timeService2.addMinutes(utcEventDate, 30));
    setIsModalVisible(true);
  };

  const onEventPress: TimelineProps['onEventPress'] = (event: TimelineEventProps) => {
    const note = userNotes.filter(note => note.id === event.id)[0];

    setSelectedNote(note);
    setIsModalVisible(true);
  };

  const closeModalWithStateCleanUp = () => {
    setSelectedNote(null);
    setIsModalVisible(false)
  }

  const timelineProps: Partial<TimelineProps> = {
    format24h: true,
    onBackgroundLongPress: createNewEvent,
    // onBackgroundLongPressOut: approveNewEvent,
    onEventPress: onEventPress,
    overlapEventsSpacing: 4,
    rightEdgeSpacing: 24,
  };

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
          // events={}
          events={eventsByDate}
          timelineProps={timelineProps}
          showNowIndicator
          scrollToNow
        // renderItem={renderItem}
        // scrollToFirst
        // initialTime={INITIAL_TIME}
        />
        {/* </View> */}
      </CalendarProvider>
      <View style={styles.modalContainer}>
        <MyModal isModalVisible={isModalVisible} hideModal={closeModalWithStateCleanUp}>
          <View style={styles.eventInputArea}>
            <CalendarEventModal
              onBack={closeModalWithStateCleanUp}
              onSave={saveNoteChanges}
              onDelete={deleteNote}
              initialStartTime={initialStartDate}
              initialEndTime={initialEndDate}
              oldNote={selectedNote}
            />
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
    }
  });

  return styles;
};

export default StatusAndNotesCalendar;