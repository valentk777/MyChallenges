import { Alert } from 'react-native';
import uuid from 'react-native-uuid';
import { Challenge } from '../entities/challenge';
import { ProgressStatus } from '../entities/progressStatus';

const createNewChallenge = (title: string, description: string, targetValue: number, image: string) => {
    if (title === "") {
        Alert.alert("Title cannot be empty");
        throw new Error("Title cannot be empty");
    }

    if (targetValue === undefined || targetValue === 0) {
        Alert.alert("Target value cannot be 0");
        throw new Error("Target value cannot be 0");
    }

    const currentUtcTime = new Date().toISOString();
    const challengeCandidate = {} as Challenge;

    challengeCandidate.id = uuid.v4().toString();
    challengeCandidate.title = title;
    challengeCandidate.description = description;
    challengeCandidate.currentValue = 0;
    challengeCandidate.targetValue = targetValue;
    challengeCandidate.image = image;
    challengeCandidate.timeCreated = currentUtcTime;
    challengeCandidate.lastTimeUpdated = currentUtcTime;
    challengeCandidate.favorite = false;
    challengeCandidate.status = ProgressStatus.NotStarted;

    return challengeCandidate;
}

export default createNewChallenge;
