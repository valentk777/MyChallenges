import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import BlackScreenModal from '../Modals/BlackScreenModal';
import { AppTheme } from '../../styles/themeModels';
import { useTheme } from '../../hooks/useTheme';
import CalendarEventModal from './CalendarEventModal';
import { Note } from '../../entities/note';
import notesService from '../../services/notesService';
import timeService2 from '../../services/timeService2';
import calendarEventService from '../../services/calendarEventService';
import { DateRangeHandler } from 'react-native-big-calendar';
import { CustomCalendarEvent } from '../../entities/customCalendarEvent';
import MoreEventsModal from './MoreEventsModal';
import { MyCalendar } from '../_NewCalendar/MyCalendar';

const today = new Date();

const StatusAndNotesCalendar = () => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [isAddOrUpdateModalVisible, setIsAddOrUpdateModalVisible] = useState(false);
  const [isMoreEventsModalVisible, setIsMoreEventsModalVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState(today);
  const [events, setEvents] = useState<CustomCalendarEvent[]>([])
  const [initialStartDate, setInitialStartDate] = useState(today);
  const [initialEndDate, setInitialEndDate] = useState(today);
  const [oneDayEventsDate, setOneDayEventsDate] = useState<Date | null>(null)
  const [oneDayEvents, setOneDayEvents] = useState<CustomCalendarEvent[]>([])
  const [selectedNote, setSelectedNote] = useState(null as Note | null);

  useEffect(() => {
    notesService.getAllNotes().then((notes) => {

      const events = notes.flatMap(note => {
        note.color = theme.colors.tertiary;
        return [calendarEventService.noteToEvent(note)];
      });

      setEvents(events);
    });
  }, [isAddOrUpdateModalVisible, theme]);

  const editEvent = useCallback((event: CustomCalendarEvent) => {
    const selectedEvent = events.filter(_event => _event.id === event.id)[0];

    setSelectedNote(calendarEventService.eventToNote(selectedEvent));
    setIsAddOrUpdateModalVisible(true);
  }, [events])

  const updateDate: DateRangeHandler = useCallback(([, end]) => {
    setCurrentDate(end)
  }, [])

  const addEvent = useCallback(
    (start: Date) => {

      const updateFullDayDate = timeService2.setUtcTimeToDate(start, 0, 0);

      setInitialStartDate(updateFullDayDate);
      setInitialEndDate(updateFullDayDate);

      setIsAddOrUpdateModalVisible(true);
    }, [events, setEvents])


  const findIntersectDate = (moreEvents: CustomCalendarEvent[]) => {
    for (const element of moreEvents) {

      if (element.isFullDayEvent) {
        return element.start;
      }

      console.log(timeService2.setUtcTimeToDate(element.start, 0, 0));

      if (timeService2.isSameDay(element.start, element.end)) {
        return timeService2.setUtcTimeToDate(element.start, 0, 0);
      }
    }

    // NOTE: if we have case that all days is in the middle, then we have a bug.
    return today;
  }

  const displayMoreEventsModal = useCallback((moreEvents: CustomCalendarEvent[]) => {
    const sortedEvents = [...moreEvents].sort((a, b) => a.timeCreated.getTime() - b.timeCreated.getTime());
    const date = findIntersectDate(sortedEvents);

    setIsMoreEventsModalVisible(true);
    setOneDayEvents(sortedEvents);
    setOneDayEventsDate(date);
  }, [events, setEvents])

  const displayMoreEventsModalOnLongPress = useCallback((date: Date) => {
    const dateDayString = timeService2.getLocalDayStringFromDate(date);
    const onlyThisDayEvents = [...events.filter(x =>
      timeService2.getLocalDayStringFromDate(x.start) <= dateDayString
      && dateDayString <= timeService2.getLocalDayStringFromDate(x.end))
    ];
    const sortedEvents = onlyThisDayEvents.sort((a, b) => a.timeCreated.getTime() - b.timeCreated.getTime());

    setIsMoreEventsModalVisible(true);
    setOneDayEvents(sortedEvents);
    setOneDayEventsDate(date);
  }, [events, setEvents])

  const closeAddOrUpdateModalWithStateCleanUp = () => {
    setSelectedNote(null);
    setIsAddOrUpdateModalVisible(false)
  }

  const closeMoreEventsModalWithStateCleanUp = () => {
    setOneDayEvents([]);
    setIsMoreEventsModalVisible(false)
    setOneDayEventsDate(null);
  }

  const saveNoteChanges = async (note: Note) => {
    const isAddNewNote = selectedNote == null;

    if (isAddNewNote) {
      await notesService.storeNote(note);
    }
    else {
      await updateNote(note);
    }

    if (isMoreEventsModalVisible) {

      const leftOneDayEvents = oneDayEvents.filter(e => e.id !== note.id);
      let updatedNotes = [...leftOneDayEvents, calendarEventService.noteToEvent(note)];
      updatedNotes = updatedNotes.sort((a, b) => a.timeCreated.getTime() - b.timeCreated.getTime());

      setOneDayEvents(updatedNotes);
    }

    closeAddOrUpdateModalWithStateCleanUp();
  }

  const updateNote = async (note: Note) => {
    await notesService.removeNote(note.id);
    await notesService.storeNote(note);

    closeAddOrUpdateModalWithStateCleanUp();
  }

  const deleteNote = async (note: Note) => {
    await notesService.removeNote(note.id);

    if (isMoreEventsModalVisible) {

      const updatedNotes = oneDayEvents.filter(e => e.id !== note.id);

      setOneDayEvents(updatedNotes);
    }

    closeAddOrUpdateModalWithStateCleanUp();
  }

  const renderAddOrUpdateModal = () => (
    <View style={styles.modalAddOrUpdateContainer}>
      <BlackScreenModal isModalVisible={isAddOrUpdateModalVisible} onHideModal={closeAddOrUpdateModalWithStateCleanUp}>
        <View style={styles.eventInputArea}>
          <CalendarEventModal
            onBack={closeAddOrUpdateModalWithStateCleanUp}
            onSave={saveNoteChanges}
            onDelete={deleteNote}
            initialStartTime={initialStartDate}
            initialEndTime={initialEndDate}
            oldNote={selectedNote}
          />
        </View>
      </BlackScreenModal>
    </View>
  );

  const onToday = () => {
    setCurrentDate(today);
  }

  const renderCalendar = () => (
    <MyCalendar
      events={events}
      date={currentDate}
      weekStartsOn={1}
      onToday={onToday}
      onChangeDate={updateDate}
      onPressCell={addEvent}
      onLongPressCell={displayMoreEventsModalOnLongPress}
      onPressEvent={editEvent}
      onPressMoreLabel={displayMoreEventsModal}
    />
  );

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <MoreEventsModal
          date={oneDayEventsDate == null ? today : oneDayEventsDate}
          events={oneDayEvents}
          isModalVisible={isMoreEventsModalVisible}
          onHideModal={closeMoreEventsModalWithStateCleanUp}
          onItemPress={editEvent}
          onBackgroundPress={() => addEvent(oneDayEventsDate == null ? today : oneDayEventsDate)}
        />
        {renderAddOrUpdateModal()}
        {renderCalendar()}
      </SafeAreaView>
    </View>
  );
}

const createStyles = (theme: AppTheme) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    modalAddOrUpdateContainer: {
      flex: 1,
    },
    eventInputArea: {
      top: 0,
      height: '50%',
      width: '100%',
      position: 'absolute',
    },
  });

  return styles;
};

export default StatusAndNotesCalendar;