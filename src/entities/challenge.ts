import {ProgressStatus} from './progressStatus';

export interface Challenge {
  id: string;
  title: string;
  description: string;
  currentValue: number;
  targetValue: number;
  image: string;
  timeCreated: string;
  lastTimeUpdated: string;
  favorite: boolean;
  status: ProgressStatus;
}

