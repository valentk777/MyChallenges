import firestore from '@react-native-firebase/firestore';
import {AppResponse} from '../../entities/appResponse';
import {Challenge} from '../../entities/challenge';

export const challengesRef = firestore().collection('challenges');

// TODO: rename, improve
const getUnixTimeStamp = () => {
  return new Date().toISOString();
};

export const getChallenges = async (userId: string) => {
  try {
    let response = await challengesRef.doc(userId).get();

    if (response.exists) {
      const challeges = response.data()?.challenges;

      if (challeges === undefined) {
        return {isSuccessfull: true, result: [] as Challenge[]} as AppResponse;
      }

      return {
        isSuccessfull: true,
        result: challeges as Challenge[],
      } as AppResponse;
    } else {
      await addNewDbChallenges(userId);
      return {isSuccessfull: true, result: [] as Challenge[]} as AppResponse;
    }
  } catch (error) {
    console.error(error);
    return {isSuccessfull: false, error: error} as AppResponse;
  }
};

export const addNewDbChallenges = async (userId: string) => {
  try {
    const dataWithOnlineStatus = {
      challenges: [] as Challenge[],
      lastTimeUpdated: getUnixTimeStamp(),
    };

    await challengesRef.doc(userId).set(dataWithOnlineStatus, {merge: true});
    return {isSuccessfull: true} as AppResponse;
  } catch (error) {
    console.log(error);
    return {isSuccessfull: false, error: error} as AppResponse;
  }
};

export const updateDbStoredChallenges = async (
  userId: string,
  challenges: Challenge[],
) => {
  if (userId == undefined || userId === '' || userId == null) {
    console.log('Cannot save to remote database');
    return;
  }

  const dataWithOnlineStatus = {
    challenges: challenges,
    lastTimeUpdated: getUnixTimeStamp(),
  };

  try {
    await challengesRef.doc(userId).update(dataWithOnlineStatus);
    return {isSuccessfull: true} as AppResponse;
  } catch (error) {
    console.log(error);
    return {isSuccessfull: false, error: error} as AppResponse;
  }
};

// export const updateProfilePhoto = async (
//   userID: string,
//   profilePictureURL: string,
// ) => {
//   try {
//     await challengesRef.doc(userID).update({profilePictureURL: profilePictureURL});
//     return {success: true};
//   } catch (error) {
//     console.log(error);
//     return {error: error};
//   }
// };

const challengesDbTable = {
  getChallenges,
  addNewDbChallenges,
  updateDbStoredChallenges,
};

export default challengesDbTable;
