import {Alert} from 'react-native';
import {Challenge} from '../entities/challenge';
import {getData, storeData} from './dataStorageService';

const initChallengesList = async () => {
  const challenges = [] as Challenge[];
  await storeData('challenges', challenges);

  return challenges;
};

const getAllChalenges = async () => {
  try {
    const challenges = await getData('challenges');

    if (challenges === null) {
      return await initChallengesList();
    }

    return challenges as Challenge[];
  } catch (error) {
    Alert.alert(`Issues getting all challenges: Error: ${error}`);
    return [] as Challenge[];
  }
};

const getChallengeById = (challenges: Challenge[], challengeId: string) => {
  if (challenges.length == 0) {
    return null;
  }

  const selectedChallenge = challenges.filter(
    challenge => challenge.id === challengeId,
  );

  if (selectedChallenge.length === 0) {
    return null;
  }

  if (selectedChallenge.length > 1) {
    Alert.alert('More than one challege with same id found');
  }

  return selectedChallenge[0];
};

const storeChallenge = async (challenge: Challenge) => {
  try {
    let challenges = await getAllChalenges();
    const selectedChallenge = getChallengeById(challenges, challenge.id);

    if (selectedChallenge != null) {
      // remove challenge to prevent from duplicates
      challenges = challenges.filter(
        localChallenge => challenge.id !== localChallenge.id,
      );
    } 

    challenges.push(challenge);

    storeData('challenges', challenges);
    
    return true;
  } catch (error) {
    Alert.alert(`Issues adding new challenge: Error: ${error}`);
    return false;
  }
};

const removeChallenge = async (challengeId: string) => {
  try {
    const challenges = await getAllChalenges();

    const updatedChallenges = challenges.filter(
      challenge => challenge.id !== challengeId,
    );

    storeData('challenges', updatedChallenges);
    return true;
  } catch (error) {
    Alert.alert(`Issues removing challenge: Error: ${error}`);
    return false;
  }
};

const challengesService = {
  getAllChalenges,
  storeChallenge,
  removeChallenge,
};

export default challengesService;
