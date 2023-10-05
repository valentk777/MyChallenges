import React, { createContext } from 'react'
import { Challenge } from '../entities/challenge';

interface ChallengeContextProvider {
  challenge: Challenge;
  newValue: number;
  updateValue: (value: number) => void;
}

export const ChallengeContext = createContext<ChallengeContextProvider>({
  challenge: {} as Challenge,
  newValue: 0,
  updateValue: (value: number) => { },
});
