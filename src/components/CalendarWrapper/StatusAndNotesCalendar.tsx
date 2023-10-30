import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, Text, useWindowDimensions, SafeAreaView, ScrollView } from 'react-native';
import BlackScreenModal from '../Modals/BlackScreenModal';
import { AppTheme } from '../../styles/themeModels';
import { useTheme } from '../../hooks/useTheme';
import CalendarEventModal from './CalendarEventModal';
import { Note } from '../../entities/note';
import notesService from '../../services/notesService';
import timeService2 from '../../services/timeService2';
import calendarEventService from '../../services/calendarEventService';
import { Calendar, CalendarHeaderForMonthViewProps, DateRangeHandler, Mode } from 'react-native-big-calendar';
import { useTranslations } from '../../hooks/useTranslations';
import { CircleButton } from '../ButtonWrapper/CircleButton';
import { icons } from '../../assets';
import { useTranslation } from 'react-i18next';
import { hourPickerLocales } from '../../external/i18next/translations/hourPickerLocales';
import { CustomCalendarEvent } from '../../entities/customCalendarEvent';
import MoreEventsModal from './MoreEventsModal';

const today = new Date();

const StatusAndNotesCalendar = () => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const { t } = useTranslation('status-calendar-screen');
  const { currentLanguage, tTime } = useTranslations();

  const window = useWindowDimensions();

  const [isAddOrUpdateModalVisible, setIsAddOrUpdateModalVisible] = useState(false);
  const [isMoreEventsModalVisible, setIsMoreEventsModalVisible] = useState(false);
  const [mode, setMode] = useState<Mode>('month')
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
  }, [isAddOrUpdateModalVisible, theme, mode]);

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

      if (mode == 'month') {
        const updateFullDayDate = timeService2.setUtcTimeToDate(start, 0, 0);

        setInitialStartDate(updateFullDayDate);
        setInitialEndDate(updateFullDayDate);
      }
      else {
        const updateFullDayDate = timeService2.setLocalTimeToDate(start, start.getHours(), start.getMinutes());

        setInitialStartDate(updateFullDayDate);
        setInitialEndDate(timeService2.addMinutes(updateFullDayDate, 30));
      }

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

  const onMonthView = () => {
    setMode('month');
    setCurrentDate(today);
  }

  const renderMonthHeader = ({ locale }: CalendarHeaderForMonthViewProps) => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.buttonRow}>
          <CircleButton
            imgUrl={icons['today-calendar.png']}
            onPress={onMonthView}
            style={[styles.month, theme.shadows.dark]}
          />
          <View style={styles.montTitleArea}>
            <Text style={styles.montTitle}>
              {tTime(currentDate.toISOString(), 'yyyy MMMM')}
            </Text>
          </View>
        </View>
        <View style={styles.weekDaysRow}>
          {[...hourPickerLocales[locale].dayNamesShort.slice(1, 7), hourPickerLocales[locale].dayNamesShort[0]].map((day, index) => (
            <Text key={day} style={styles.dayNameShortText}>{t(day)}</Text>
          ))}
        </View>
      </View>
    )
  };

  const renderCalendar = () => (
    <ScrollView style={styles.calendarContainer}>
      <Calendar
        height={window.height - 80 - 149} // hight of header
        // height={525} // hight of header
        date={currentDate}
        events={events}
        locale={currentLanguage}
        mode={mode}
        onPressEvent={editEvent}
        onChangeDate={updateDate}
        onPressCell={addEvent}
        moreLabel={t("more-events")}
        onPressMoreLabel={displayMoreEventsModal}
        swipeEnabled={true}
        showAdjacentMonths={false}
        isEventOrderingEnabled={true}
        renderHeaderForMonthView={(locale) => renderMonthHeader(locale)}
        eventCellStyle={(event) => {
          return event.isFullDayEvent ? styles.fullDayEventCellStyle : styles.eventCellStyle;
        }}
        calendarCellStyle={styles.calendarCellStyle}
        calendarCellTextStyle={(date) => {
          return timeService2.isSameDay(date, today) ? styles.todayCalendarCellTextStyle : styles.calendarCellTextStyle
        }}
        // calendarContainerStyle={{height: 525, backgroundColor: 'green'}}
        // bodyContainerStyle={{height: 525}}
        onLongPressCell={displayMoreEventsModalOnLongPress}
      />
    </ScrollView>
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
    headerContainer: {
      height: 80,
      backgroundColor: theme.colors.primary
    },
    buttonRow: {
      height: 55,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    montTitleArea: {
      justifyContent: 'center',
      alignContent: 'center',
    },
    montTitle: {
      fontFamily: theme.fonts.medium,
      fontSize: 18,
      color: theme.colors.tertiary,
    },
    today: {
      right: 15,
      top: 10,
    },
    month: {
      left: 15,
      top: 10,
    },
    weekDaysRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    dayNameShortText: {
      fontFamily: theme.fonts.medium,
      fontSize: 14,
      color: theme.colors.tertiary,
    },
    calendarContainer: {
      backgroundColor: theme.colors.canvas,
    },
    calendarCellStyle: {
      borderColor: theme.colors.primary,
    },
    calendarCellTextStyle: {
      fontFamily: theme.fonts.medium,
      color: theme.colors.primary,
    },
    todayCalendarCellTextStyle: {
      fontFamily: theme.fonts.bold,
      color: theme.colors.exceptional,
    },
    fullDayEventCellStyle: {
      backgroundColor: theme.colors.primary,
      paddingBottom: 1,
    },
    eventCellStyle: {
      backgroundColor: theme.colors.secondary,
      paddingBottom: 1,
    },
    eventCellTextStyle: {
      fontFamily: theme.fonts.medium,
      fontSize: 14,
      color: theme.colors.tertiary,
    },
    modalAddOrUpdateContainer: {
      flex: 1,
    },
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