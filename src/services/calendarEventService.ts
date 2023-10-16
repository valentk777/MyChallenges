import {CustomCalendarEvent} from '../entities/customCalendarEvent';
import {Note} from '../entities/note';

const noteToEvent = (note: Note): CustomCalendarEvent => {
  return {
    id: note.id,
    start: new Date(note.startTime),
    end: new Date(note.endTime),
    title: note.title,
    summary: note.summary,
    color: note.color,
    isFullDayEvent: note.isFullDayEvent,
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
  } as Note;
};

const calendarEventService = {
  noteToEvent,
  eventToNote,
};

export default calendarEventService;
