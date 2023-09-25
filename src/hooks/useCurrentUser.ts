import {UserAccount} from '../entities/user';
import {useAuth} from './useAuth';

export const useCurrentUser = (): UserAccount | null => {
  const {state} = useAuth();

  return state.user;
};
