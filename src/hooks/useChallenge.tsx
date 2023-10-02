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

//   interface IChallengeContext {
//     challenge: Challenge;
//     newValue: number;
//     updateValue: (value: number) => void;
// }

// interface AppContextProviderProps
//     extends Omit<ProviderProps<IChallengeContext>, 'value'> {
// }

// export const ChallengeProvider = ({ children }: AppContextProviderProps) => {

//     return (
//         <ChallengeContext.Provider
//         value={{
//             challenge: challenge,
//             newValue: newCount,
//             updateValue: updateValue,
//           }}>
//             {children}
//         </ChallengeContext.Provider>
//     );
// }

// export const useAuth = () => useContext(ChallengeContext);