import firestore from '@react-native-firebase/firestore';
import {AppResponse} from '../../entities/appResponse';
import {Note} from '../../entities/note';
import timeService from '../../services/timeService';

export const notesRef = firestore().collection('notes');

export const getNotes = async (userId: string) => {
  try {
    let response = await notesRef.doc(userId).get();

    if (response.exists) {
      const notes = response.data()?.notes;

      if (notes === undefined) {
        return {isSuccessfull: true, result: [] as Note[]} as AppResponse;
      }

      return {
        isSuccessfull: true,
        result: notes as Note[],
      } as AppResponse;
    } else {
      await addNewDbNotes(userId);
      
      return {isSuccessfull: true, result: [] as Note[]} as AppResponse;
    }
  } catch (error) {
    console.error(error);

    return {isSuccessfull: false, error: error} as AppResponse;
  }
};

export const addNewDbNotes = async (userId: string) => {
  try {
    const dataWithOnlineStatus = {
      notes: [] as Note[],
      lastTimeUpdated: timeService.getCurrentDateString(),
    };

    await notesRef.doc(userId).set(dataWithOnlineStatus, {merge: true});

    return {isSuccessfull: true} as AppResponse;
  } catch (error) {
    console.log(error);

    return {isSuccessfull: false, error: error} as AppResponse;
  }
};

export const updateDbStoredNotes = async (userId: string, notes: Note[]) => {
  if (userId == undefined || userId === '' || userId == null) {
    console.log('Cannot save to remote database');

    return;
  }

  const dataWithOnlineStatus = {
    notes: notes,
    lastTimeUpdated: timeService.getCurrentDateString(),
  };

  try {
    await notesRef.doc(userId).update(dataWithOnlineStatus);

    return {isSuccessfull: true} as AppResponse;
  } catch (error) {
    console.log(error);

    return {isSuccessfull: false, error: error} as AppResponse;
  }
};

const notesDbTable = {
  getNotes,
  addNewDbNotes,
  updateDbStoredNotes,
};

export default notesDbTable;
