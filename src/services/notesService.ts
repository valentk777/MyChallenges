import {Alert} from 'react-native';
import {getData, storeData} from './dataStorageService';
import userService from './userService';
// import notesDbTable from '../external/database/notesDbTable';
import uuid from 'react-native-uuid';
import timeService from './timeService';
import {Note} from '../entities/note';

const initNotesList = async (userId: string) => {
  // const response = await notesDbTable.getNotes(userId);

  let notes = [] as Note[];

  // if (response.isSuccessfull) {
  //   notes = response.result as Note[];
  // }

  await storeData('notes', notes);

  return notes;
};

const getNotesKey = (userId: string) => {
  return `notes/${userId}`;
};

const getAllNotes = async () => {
  try {
    const user = await userService.getCurrentUser();

    if (user === null || user.id === '' || user.id === null) {
      return [] as Note[];
    }

    const notes = await getData(getNotesKey(user.id));

    if (notes === null) {
      return await initNotesList(user.id);
    }

    return notes as Note[];
  } catch (error) {
    Alert.alert(`Issues getting all notes: Error: ${error}`);
    return [] as Note[];
  }
};

const getNoteById = (notes: Note[], noteId: string) => {
  if (notes.length == 0) {
    return null;
  }

  const selectedNotes = notes.filter(note => note.id === noteId);

  if (selectedNotes.length === 0) {
    return null;
  }

  if (selectedNotes.length > 1) {
    Alert.alert('More than one note with same id found');
  }

  return selectedNotes[0];
};

const storeNote = async (note: Note) => {
  try {
    const user = await userService.getCurrentUser();

    if (user === null || user.id === '' || user.id === null) {
      console.error('Cannot store note because user does not exist');
      return false;
    }

    let notes = await getAllNotes();
    const selectedNote = getNoteById(notes, note.id);

    if (selectedNote != null) {
      // remove note to prevent from duplicates
      notes = notes.filter(localNote => note.id !== localNote.id);
    }

    notes.push(note);

    storeData(getNotesKey(user.id), notes);
    // notesDbTable.updateDbStoredNotes(user.id, notes);

    return true;
  } catch (error) {
    Alert.alert(`Issues adding new note: Error: ${error}`);
    return false;
  }
};

const removeNote = async (noteId: string) => {
  try {
    const user = await userService.getCurrentUser();

    if (user === null || user.id === '' || user.id === null) {
      console.log('Cannot remove note because user does not exist');
      return false;
    }

    const notes = await getAllNotes();

    const updatedNotes = notes.filter(note => note.id !== noteId);

    storeData(getNotesKey(user.id), updatedNotes);
    // notesDbTable.updateDbStoredNotes(user.id, updatedNotes);

    return true;
  } catch (error) {
    Alert.alert(`Issues removing note: Error: ${error}`);
    return false;
  }
};

const createNewNote = (
  title: string,
  summary: string,
  startDate: Date,
  endDate: Date,
  color: string,
) => {
  if (title === '') {
    Alert.alert('Title cannot be empty');
    return null;
  }

  if (title.length > 25) {
    Alert.alert('Title too long. Max 25 symbols allowed');
    return null;
  }

  if (summary.length > 90) {
    Alert.alert('Summary too long. Max 90 symbols allowed');
    return null;
  }

  const currentTime = new Date().getTime();

  const noteCandidate = {} as Note;

  noteCandidate.id = uuid.v4().toString();
  noteCandidate.title = title;
  noteCandidate.summary = summary;
  noteCandidate.startTime = startDate.getTime();
  noteCandidate.endTime = endDate.getTime();
  noteCandidate.timeCreated = currentTime;
  noteCandidate.lastTimeUpdated = currentTime;
  noteCandidate.color = color;

  return noteCandidate;
};

const notesService = {
  getAllNotes,
  storeNote,
  removeNote,
  createNewNote,
};

export default notesService;
