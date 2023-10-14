import groupBy from 'lodash/groupBy';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
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
import calendarEventService from '../../services/calendarEventService';

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
        // temp solution
        note.color = theme.colors.tertiary;
        return calendarEventService.noteToEvents(note);
      });

      const _eventsByDate = groupBy(events, e => CalendarUtils.getCalendarDateString(e.start)) as {
        [key: string]: TimelineEventProps[];
      }

      setEventsByDate(_eventsByDate);
    });
  }, [isModalVisible, rerenderScreen, theme]);

  const updateNote = async (note: Note) => {
    await notesService.removeNote(note.id);
    await notesService.storeNote(note);

    setRerenderScreen(!rerenderScreen);

    closeModalWithStateCleanUp();
  }

  const deleteNote = async (note: Note) => {
    await notesService.removeNote(note.id);

    // TODO: Think about more performant way to do that.
    setRerenderScreen(!rerenderScreen);

    closeModalWithStateCleanUp();
  }

  const saveNoteChanges = async (note: Note) => {
    const isAddNewNote = selectedNote == null;

    if (isAddNewNote) {
      await notesService.storeNote(note);
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

  // const onDateChanged = (date: string, source: string) => {
  // };

  // const onMonthChange = (month: any, updateSource: any) => {
  // };

  const createNewEvent: TimelineProps['onBackgroundLongPress'] = (_, timeObject) => {
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
        // onDateChanged={onDateChanged}
        // onMonthChange={onMonthChange}
        disabledOpacity={0}
        numberOfDays={1}
        style={styles.calendarContainer}
        // theme={styles.calendarTheme}
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
        <TimelineList
          events={eventsByDate}
          timelineProps={timelineProps}
          showNowIndicator
          scrollToNow
        />
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
      textDayColor: theme.colors.primary,
      monthTextColor: theme.colors.primary,
      indicatorColor: theme.colors.primary,

      // todayBackgroundColor: theme.colors.primary,
      // todayTextColor: theme.colors.primary,
      // backgroundColor: theme.colors.secondary,
      // calendarBackground: theme.colors.secondary,

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