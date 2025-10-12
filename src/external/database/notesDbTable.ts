import { getApp } from '@react-native-firebase/app';
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from '@react-native-firebase/firestore';
import { AppResponse } from '../../entities/appResponse';
import { Note } from '../../entities/note';
import timeService from '../../services/timeService';

export type NoteDoc = {
  notes: Note[];
  lastTimeUpdated: string;
};

const db = getFirestore(getApp());
const notesCollection = collection(db, 'notes');

export const getNotes = async (userId: string): Promise<AppResponse> => {
  try {
    const userDocRef = doc(notesCollection, userId);
    const response = await getDoc<NoteDoc>(userDocRef);

    if (response.exists()) {
      const data = response.data();
      const notes = data?.notes ?? [];

      return { isSuccessfull: true, result: notes, error: null };
    } else {
      await addNewDbNotes(userId);
      return { isSuccessfull: true, result: [], error: null };
    }
  } catch (error) {
    console.error(error);
    return { isSuccessfull: false, result: null, error };
  }
};

export const addNewDbNotes = async (userId: string): Promise<AppResponse> => {
  try {
    const newData: NoteDoc = {
      notes: [],
      lastTimeUpdated: timeService.getCurrentDateString(),
    };

    const userDocRef = doc(notesCollection, userId);
    await setDoc(userDocRef, newData, { merge: true });

    return { isSuccessfull: true, result: null, error: null };
  } catch (error) {
    console.log(error);
    return { isSuccessfull: false, result: null, error };
  }
};

export const updateDbStoredNotes = async (
  userId: string,
  notes: Note[],
): Promise<AppResponse | void> => {
  if (!userId) {
    console.log('Cannot save to remote database');
    return;
  }

  const newData: NoteDoc = {
    notes,
    lastTimeUpdated: timeService.getCurrentDateString(),
  };

  try {
    const userDocRef = doc(notesCollection, userId);
    await updateDoc(userDocRef, newData);
    return { isSuccessfull: true, result: null, error: null };
  } catch (error) {
    console.log(error);
    return { isSuccessfull: false, result: null, error };
  }
};

const notesDbTable = {
  getNotes,
  addNewDbNotes,
  updateDbStoredNotes,
};

export default notesDbTable;
