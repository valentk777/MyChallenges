import groupBy from 'lodash/groupBy';
import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, Text, useWindowDimensions, SafeAreaView, TouchableOpacity } from 'react-native';
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
import { Calendar, CalendarHeaderForMonthViewProps, CalendarProps, CalendarTouchableOpacityProps, DateRangeHandler, ICalendarEventBase, Mode, MonthHeaderRenderer, ThemeInterface } from 'react-native-big-calendar';
import { useTranslations } from '../../hooks/useTranslations';
import { CircleButton } from '../ButtonWrapper/CircleButton';
import { icons } from '../../assets';
import { useTranslation } from 'react-i18next';
import { hourPickerLocales } from '../../external/i18next/translations/hourPickerLocales';
import { CustomCalendarEvent } from '../../entities/customCalendarEvent';

const StatusAndNotesCalendar2 = () => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const { currentLanguage } = useTranslations();
  const window = useWindowDimensions();

  const [mode, setMode] = useState<Mode>('month')
  const [events, setEvents] = useState<CustomCalendarEvent[]>([])
  const [currentDate, setCurrentDate] = useState(new Date());
  // const [userNotes, setUserNotes] = useState([] as Note[]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  // const [rerenderScreen, setRerenderScreen] = useState(false);

  // const [eventsByDate, setEventsByDate] = useState({} as { [key: string]: TimelineEventProps[] });
  const [initialStartDate, setInitialStartDate] = useState(new Date());
  const [initialEndDate, setInitialEndDate] = useState(new Date());
  const [selectedNote, setSelectedNote] = useState(null as Note | null);

  const { t } = useTranslation();
  const { tTime } = useTranslations();

  useEffect(() => {
    notesService.getAllNotes().then((notes) => {
      // notes.map(note => {notesService.removeNote(note.id)});
      // setUserNotes(notes);

      const events = notes.flatMap(note => {
        // temp solution
        note.color = theme.colors.tertiary;

        return [calendarEventService.noteToEvent(note)];
      });

      setEvents(events);
    });
  }, [isModalVisible, theme]);

  const onChangeDate: DateRangeHandler = useCallback(([, end]) => {
    setCurrentDate(end)
  }, [])

  const closeModalWithStateCleanUp = () => {
    setSelectedNote(null);
    setIsModalVisible(false)
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

  const updateNote = async (note: Note) => {
    await notesService.removeNote(note.id);
    await notesService.storeNote(note);

    closeModalWithStateCleanUp();
  }

  const deleteNote = async (note: Note) => {
    await notesService.removeNote(note.id);

    closeModalWithStateCleanUp();
  }

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

      setIsModalVisible(true);
    }, [events, setEvents])

  const onPressEvent = useCallback((event: CustomCalendarEvent) => {
    const selectedEvent = events.filter(_event => _event.id === event.id)[0];

    setSelectedNote(calendarEventService.eventToNote(selectedEvent));
    setIsModalVisible(true);
  }, [events, setEvents])

  const renderWeekHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.buttonRow}>
        <CircleButton
          imgUrl={icons['calendar.png']}
          onPress={() => setMode('month')}
          style={[styles.month, theme.shadows.dark]}
        />
        <View style={styles.montTitleArea}>
          <Text style={styles.montTitle}>
            {tTime(currentDate.toISOString(), 'EEEE, LLLL dd yyyy')}
          </Text>
        </View>
        <CircleButton
          imgUrl={icons['today-calendar.png']}
          onPress={() => setMode('day')}
          style={[styles.today, theme.shadows.dark]}
        />
        {/* day, 3days, week, month */}
      </View>
    </View>
  );

  const renderMonthHeader = ({ locale }: CalendarHeaderForMonthViewProps) => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.buttonRow}>
          <CircleButton
            imgUrl={icons['calendar.png']}
            onPress={() => setMode('month')}
            style={[styles.month, theme.shadows.dark]}
          />
          <View style={styles.montTitleArea}>
            <Text style={styles.montTitle}>
              {tTime(currentDate.toISOString(), 'yyyy MMMM')}
            </Text>
          </View>
          <CircleButton
            imgUrl={icons['today-calendar.png']}
            onPress={() => setMode('day')}
            style={[styles.today, theme.shadows.dark]}
          />
        </View>
        <View style={styles.weekDaysRow}>
          {[...hourPickerLocales[locale].dayNamesShort.slice(1, 7), hourPickerLocales[locale].dayNamesShort[0]].map((day, index) => (
            <Text key={day} style={styles.dayNameShortText}>{t(day)}</Text>
          ))}
        </View>
      </View>
    )
  };












  // const eventNotes = (
  //   <View style={{ marginTop: 3 }}>
  //     <Text style={{ fontSize: 10, color: 'white' }}> Phone number: 555-123-4567 </Text>
  //     <Text style={{ fontSize: 10, color: 'white' }}> Arrive 15 minutes early </Text>
  //   </View>
  // )











  // const timelineProps: Partial<TimelineProps> = {
  //   format24h: true,
  //   onBackgroundLongPress: createNewEvent,
  //   // onBackgroundLongPressOut: approveNewEvent,
  //   onEventPress: onEventPress,
  //   overlapEventsSpacing: 4,
  //   rightEdgeSpacing: 24,
  // };



  // const addLongEvent = useCallback(
  //   (start: Date) => {
  //     const title = 'new Long Event';
  //     const end = timeService2.addMinutes(start, 60 * 24 + 59);
  //     setEvents([...events, { start, end, title } as CustomCalendarEvent]);
  //   },
  //   [events, setEvents],
  // )

  // const renderEvent = useCallback(
  //   (event: CustomCalendarEvent, touchableOpacityProps: CalendarTouchableOpacityProps) => (
  //     <TouchableOpacity {...touchableOpacityProps}>
  //       <Text>{event.title}</Text>
  //     </TouchableOpacity>
  //   ),
  //   [],
  // )



  const renderCalendar = () => (
    <View style={styles.calendarContainer}>
      <Calendar
        events={events}
        height={window.height - 80} // hight of header.
        locale={currentLanguage}
        swipeEnabled={true}
        showTime={true} // rodyti ar nerodyti laika ant evento
        showAllDayEventCell={true}
        showAdjacentMonths={false} // ar rodyti kito menesio diens menesio viewe
        sortedMonthView={false} // galbut ir false gali buti, nzn
        isEventOrderingEnabled={false}
        mode={mode}
        moreLabel="+{moreCount}" // ka rasyt kai eventu per daug mont viewe




        onPressEvent={onPressEvent}
        onChangeDate={onChangeDate}
        onPressCell={addEvent} // kai paspaudi tiesiog ant kalendoriaus ploto kur nera evento
        // onLongPressCell={addLongEvent} // kai ilgai paspaudi tiesiog ant kalendoriaus ploto kur nera evento
        renderHeader={renderWeekHeader}
        renderHeaderForMonthView={(locale) => renderMonthHeader(locale)}

        // cia dalis kur regiliuoji dienos mode kaip atrodys dienos title
        // headerContentStyle={styles.headerContentStyle}
        // dayHeaderStyle={styles.dayHeaderStyle}

        // pats kalendorius
        calendarCellStyle={styles.calendarCellStyle}
        calendarCellTextStyle={styles.calendarCellTextStyle}




        eventCellStyle={styles.eventCellStyle}       // evento spalvos dalis


        hourStyle={styles.hourStyle} // valandu rodymas

      // theme={darkTheme}
      // dayHeaderStyle
      // dayHeaderHighlightColor
      // weekDayHeaderHighlightColor
      // ampm={true} // ar rodyti 24 ar 12 val ant evento. tai manau, kad ant anglu reikia true
      // overlapOffset={8} // sitas rodo kiek atitraukt nuo krasto eventams kurie persidengia. reikia patobulint sita
      // renderEvent={renderEvent} // how event shgould be rendered
      // eventMinHeightForMonthView

      // renderCustomDateForMonth={}
      // disableMonthEventCellPress={true}
      // onPressMoreLabel={(moreEvents) => {
      //   console.log(moreEvents)
      // }}
      />

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

  return (
    <View style={styles.container}>
      <SafeAreaView>
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
      // backgroundColor: theme.colors.canvasInverted
      // flex: 1,
    },
    headerContentStyle: {
      // flexDirection: 'row',
      // justifyContent: 'center',
      // alignItems: 'center',
      // backgroundColor: 'green',
      // fontFamily: theme.fonts.bold,
      // fontSize: 18,
      // color: theme.colors.secondary,
    },
    dayHeaderStyle: {
      // marginLeft: 10,
      // backgroundColor: '#f1f1f1',
      // paddingVertical: 6,
      // paddingHorizontal: 12,
      // borderRadius: 12,
    },
    calendarCellStyle: {
      // backgroundColor: theme.colors.canvas,
      // borderRadius: 3,
      borderColor: theme.colors.primary,
    },
    calendarCellTextStyle: {
      // backgroundColor: theme.colors.canvas,
      fontFamily: theme.fonts.medium,
      // fontSize: 14,
      color: theme.colors.primary,
    },
    eventCellStyle: {
      // borderWidth: 1,
      // borderColor: 'green',
      backgroundColor: theme.colors.secondary,
      // fontFamily: theme.fonts.medium,
      // fontSize: 14,
      // color: theme.colors.tertiary,
      // padding: 0,
      // margin: 0,
    },
    eventCellTextStyle: {
      // borderWidth: 1,
      // borderColor: 'green',
      // backgroundColor: theme.colors.secondary,
      fontFamily: theme.fonts.medium,
      fontSize: 14,
      color: theme.colors.tertiary,
      // padding: 0,
      // margin: 0,
    },


    hourStyle: {
      // justifyContent: 'center',
      // fontFamily: theme.fonts.medium,
      // fontSize: 14,
      // color: theme.colors.secondary,
    },
    buttonContainer: {
      // backgroundColor: '#f1f1f1',
      // borderRadius: 10,
      // paddingHorizontal: 15,
      // paddingVertical: 5,
    },
    buttonContainerActive: {
      // borderBottomColor: 'blue',
      // borderBottomWidth: 3,
    },
    // buttonRow: {
    //   flexDirection: 'row',
    //   justifyContent: 'space-between',
    //   // padding: 10,
    // },
    headline: {
      // fontSize: 16,
    },





    modalContainer: {
      flex: 1,
    },
    // calendarTheme: {
    //   palette: {
    //     primary: {
    //       main: '#4caf50',
    //       contrastText: '#fff',
    //     },
    //   },
    //   eventCellOverlappings: [
    //     {
    //       main: '#17651a',
    //       contrastText: '#fff',
    //     },
    //     {
    //       main: '#08540b',
    //       contrastText: '#fff',
    //     },
    //   ],



    //   // arrowColor: theme.colors.canvasInverted,
    //   // textDayFontFamily: theme.fonts.light,
    //   // textMonthFontFamily: theme.fonts.bold,
    //   // textDayHeaderFontFamily: theme.fonts.medium,
    //   // textDayColor: theme.colors.primary,
    //   // monthTextColor: theme.colors.primary,
    //   // indicatorColor: theme.colors.primary,

    //   // todayBackgroundColor: theme.colors.primary,
    //   // todayTextColor: theme.colors.primary,
    //   // backgroundColor: theme.colors.secondary,
    //   // calendarBackground: theme.colors.secondary,

    // } as DeepPartial<ThemeInterface>,
    eventInputArea: {
      top: 0,
      height: '50%',
      width: '100%',
      position: 'absolute',
    }
  });

  return styles;
};

export default StatusAndNotesCalendar2;