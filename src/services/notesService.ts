import {Alert} from 'react-native';
import {getData, storeData} from './dataStorageService';
import userService from './userService';
// import notesDbTable from '../external/database/notesDbTable';
import uuid from 'react-native-uuid';
import timeService from './timeService';
import {Note} from '../entities/note';

const initNotesList = async (userId: string) => {
  // const response = await notesDbTable.getNotes(userId);
  // let notes = [] as Note[];
  // if (response.isSuccessfull) {
  //   notes = response.result as Note[];
  // }
  // await storeData('notes', notes);
  // return notes;
};

const getNotesKey = (userId: string) => {
  return `notes/${userId}`;
};

// const getAllNotes = async () => {
//   try {
//     const user = await userService.getCurrentUser();

//     if (user === null || user.id === '' || user.id === null) {
//       return [] as Note[];
//     }

//     const notes = await getData(getNotesKey(user.id));

//     if (notes === null) {
//       return await initNotesList(user.id);
//     }

//     return notes as Note[];
//   } catch (error) {
//     Alert.alert(`Issues getting all notes: Error: ${error}`);
//     return [] as Note[];
//   }
// };

// const getNoteById = (notes: Note[], challengeId: string) => {
//   if (notes.length == 0) {
//     return null;
//   }

//   const selectedNote = notes.filter(
//     challenge => challenge.id === challengeId,
//   );

//   if (selectedNote.length === 0) {
//     return null;
//   }

//   if (selectedNote.length > 1) {
//     Alert.alert('More than one challege with same id found');
//   }

//   return selectedNote[0];
// };

// const storeNote = async (challenge: Note) => {
//   try {
//     const user = await userService.getCurrentUser();

//     if (user === null || user.id === '' || user.id === null) {
//       console.error('Cannot store challenge because user does not exist');
//       return false;
//     }

//     let notes = await getAllNotes();
//     const selectedNote = getNoteById(notes, challenge.id);

//     if (selectedNote != null) {
//       // remove challenge to prevent from duplicates
//       notes = notes.filter(
//         localNote => challenge.id !== localNote.id,
//       );
//     }

//     notes.push(challenge);

//     storeData(getNotesKey(user.id), notes);
//     notesDbTable.updateDbStoredNotes(user.id, notes);

//     return true;
//   } catch (error) {
//     Alert.alert(`Issues adding new challenge: Error: ${error}`);
//     return false;
//   }
// };

// const removeNote = async (challengeId: string) => {
//   try {
//     const user = await userService.getCurrentUser();

//     if (user === null || user.id === '' || user.id === null) {
//       console.log('Cannot remove challenge because user does not exist');
//       return false;
//     }

//     const notes = await getAllNotes();

//     const updatedNotes = notes.filter(
//       challenge => challenge.id !== challengeId,
//     );

//     storeData(getNotesKey(user.id), updatedNotes);
//     notesDbTable.updateDbStoredNotes(user.id, updatedNotes);

//     return true;
//   } catch (error) {
//     Alert.alert(`Issues removing challenge: Error: ${error}`);
//     return false;
//   }
// };

const createNewNote = (
  title: string,
  description: string,
  startDate: Date,
  endDate: Date,
) => {
  if (title === '') {
    Alert.alert('Title cannot be empty');
    return null;
  }

  if (title.length > 25) {
    Alert.alert('Title too long. Max 25 symbols allowed');
    return null;
  }

  if (description.length > 90) {
    Alert.alert('Description too long. Max 90 symbols allowed');
    return null;
  }

  const noteCandidate = {} as Note;

  noteCandidate.id = uuid.v4().toString();
  noteCandidate.title = title;
  noteCandidate.description = description;
  noteCandidate.startDate = startDate;
  noteCandidate.endDate = endDate;

  return noteCandidate;
};

const notesService = {
  // getAllNotes,
  // storeNote,
  // removeNote,
  createNewNote,
};

export default notesService;
