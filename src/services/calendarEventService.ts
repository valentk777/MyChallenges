import {CustomCalendarEvent} from '../entities/customCalendarEvent';
import {Note} from '../entities/note';
import timeService2 from './timeService2';

const noteToEvent = (note: Note): CustomCalendarEvent => {
  return {
    id: note.id,
    start: new Date(note.startTime),
    end: new Date(note.endTime),
    title: note.title,
    summary: note.summary,
    color: note.color,
    isFullDayEvent: note.isFullDayEvent,
    timeCreated: new Date(note.timeCreated),
  } as CustomCalendarEvent;
};

const eventToNote = (event: CustomCalendarEvent): Note => {
  return {
    id: event.id,
    startTime: event.start.getTime(),
    endTime: event.end.getTime(),
    title: event.title,
    summary: event.summary,
    color: event.color,
    isFullDayEvent: event.isFullDayEvent,
    timeCreated: event.timeCreated.getTime(),
  } as Note;
};

// const noteToEvents = (note: Note): CustomCalendarEvent[] => {
//   const event = noteToEvent(note);

//   if (timeService2.getLocalDayStringFromDate(event.start) == timeService2.getLocalDayStringFromDate(event.end)) {
//     return [event]
//   }

//   let result = [] as CustomCalendarEvent[];

//   const addEntry = (startDate: Date, endDate: Date) => {
//     const newEvent = {
//       id: note.id,
//       start: startDate,
//       end: endDate,
//       title: note.title,
//       summary: note.summary,
//       color: note.color,
//       isFullDayEvent: note.isFullDayEvent,
//       timeCreated: new Date(note.timeCreated),
//     } as CustomCalendarEvent;

//     result = [...result, newEvent];
//   };

//   const startDate = event.start;
//   const endDate = event.end;

//   if (event.isFullDayEvent) {
//     // need to create new full day events with UTC 0, 0, not local
//     addEntry(startDate, timeService2.setUtcTimeToDate(startDate, 0, 0));

//     let nextDayDate = timeService2.getNextUtcDayDate(startDate); // new day with 00:00

//     while (
//       timeService2.getLocalDayStringFromDate(nextDayDate) <
//       timeService2.getLocalDayStringFromDate(endDate)
//     ) {
//       const newNextDayDate = timeService2.getNextUtcDayDate(nextDayDate);

//       addEntry(nextDayDate, newNextDayDate);

//       nextDayDate = newNextDayDate;
//     }

//     addEntry(nextDayDate, endDate);
//   } else {
//     let nextDayDate = timeService2.getNextDayDate(startDate); // new day with 00:00

//     addEntry(startDate, timeService2.addMinutes(nextDayDate, -1));

//     while (
//       timeService2.getLocalDayStringFromDate(nextDayDate) <
//       timeService2.getLocalDayStringFromDate(endDate)
//     ) {
//       const newNextDayDate = timeService2.getNextDayDate(nextDayDate);

//       addEntry(nextDayDate, timeService2.addMinutes(newNextDayDate, -1));

//       nextDayDate = newNextDayDate;
//     }

//     addEntry(nextDayDate, endDate);
//   }

//   return result;
// }

const calendarEventService = {
  noteToEvent,
  eventToNote,
  // noteToEvents,
};

export default calendarEventService;
