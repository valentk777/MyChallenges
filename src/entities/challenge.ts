import { ChallengeTypes } from './challengeTypes';
import {ProgressStatus} from './progressStatus';

export interface Challenge {
  id: string;
  title: string;
  description: string;
  image: string;
  timeCreated: string;
  lastTimeUpdated: string;
  currentValue: number;
  targetValue: number;
  favorite: boolean;
  status: ProgressStatus;
  type: ChallengeTypes;
}

export interface TotalCounterChallenge extends Challenge {

}

export interface DailyCalendarChallenge extends Challenge {
  endDate: string;
  datesCompleted: string[];
}