import groupBy from 'lodash/groupBy';
import filter from 'lodash/filter';
import find from 'lodash/find';
import React, { Component, useCallback, useEffect, useState } from 'react';
import { Alert, View, Text, StyleSheet, TextInput } from 'react-native';
import {
  ExpandableCalendar,
  TimelineEventProps,
  TimelineList,
  CalendarProvider,
  TimelineProps,
  CalendarUtils,
} from 'react-native-calendars';
import { Theme } from "react-native-calendars/src/types";
import { Note } from '../entities/note';
import timeService2 from './timeService2';


const noteToEvent = (note: Note) => {
  return {
    id: note.id,
    start: new Date(note.startTime).toISOString(),
    end: new Date(note.endTime).toISOString(),
    title: note.title,
    summary: note.summary,
    color: note.color,
  } as TimelineEventProps;
};

const noteToEvents = (note: Note) => {
    if (note.isOneDayEvent) {
      return [noteToEvent(note)]
    }
  
    let result = [] as TimelineEventProps[];
  
    const addEntry = (startDate: Date, endDate: Date) => {
      const newEvent = {
        id: note.id,
        start: startDate.toISOString(),
        end: endDate.toISOString(),
        title: note.title,
        summary: note.summary,
        color: note.color
      } as TimelineEventProps;
  
      result = [...result, newEvent];
    };
  
    const startDate = new Date(note.startTime);
    const endDate = new Date(note.endTime);
    let nextDayDate = timeService2.getNextDayDate(startDate); // new day with 00:00
  
    addEntry(startDate, nextDayDate);
  
    // full day events
    while (timeService2.getLocalDayStringFromDate(nextDayDate) < timeService2.getLocalDayStringFromDate(endDate)) {
      const newNextDayDate = timeService2.getNextDayDate(nextDayDate);
  
      addEntry(nextDayDate, newNextDayDate);
  
      nextDayDate = newNextDayDate;
    }
  
    addEntry(nextDayDate, endDate);
  
    return result;
  }

const calendarEventService = {
  noteToEvent,
  noteToEvents,
};

export default calendarEventService;
