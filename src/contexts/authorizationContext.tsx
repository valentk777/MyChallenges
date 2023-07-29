import React, {useState, ProviderProps} from 'react';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from 'react-native-google-signin';

interface IAuthorizationContext {
  isSignedIn: boolean;
  signIn: () => void;
}

export const AuthorizationContext = React.createContext<IAuthorizationContext>({
  isSignedIn: false,
  signIn: () => {},
});

export interface AppContextProviderProps
  extends Omit<ProviderProps<IAuthorizationContext>, 'value'> {}

export const AuthorizationContextProvider = (
  props: AppContextProviderProps,
) => {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const signIn = () => {
    setIsSignedIn(true);
  };
  return (
    <AuthorizationContext.Provider
      value={{
        isSignedIn,
        signIn,
      }}
      {...props}
    />
  );
};

export const useAuthorizationContext = () => {
  return React.useContext(AuthorizationContext);
};
