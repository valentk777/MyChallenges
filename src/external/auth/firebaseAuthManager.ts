import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {AppResponse} from '../../entities/appResponse';
import {LoginUser, UserAccount} from '../../entities/user';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {ErrorCode} from '../../entities/errorCodes';
import userDbTable from '../database/userDbTable';
import {Alert} from 'react-native';

export const usersRef = firestore().collection('users');

// TODO: rename, improve
const getUnixTimeStamp = () => {
  return new Date().toISOString();
};

const registerWithEmail = (user: LoginUser) => {
  return new Promise(function (resolve, _reject) {
    auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(async response => {
        const newUser = {
          id: response.user.uid,
          email: user.email,
          createdAt: getUnixTimeStamp(),
        } as UserAccount;

        // Store user info to database. We do not await here.
        userDbTable.addNewUser(newUser);

        resolve({isSuccessfull: true, result: newUser} as AppResponse);
      })
      .catch(error => {
        console.log('_error:', error);

        var errorCode = ErrorCode.serverError;

        if (error.code === 'auth/email-already-in-use') {
          errorCode = ErrorCode.emailInUse;
        }

        resolve({isSuccessfull: false, error: errorCode} as AppResponse);
      });
  });
};

const handleSuccessfulLogin = (user: UserAccount) => {
  const onlineUser = {...user, isOnline: true} as UserAccount;

  // After a successful login, we fetch & store the device token for push notifications, location, online status, etc.
  // we don't wait for fetching & updating the location or push token, for performance reasons (especially on Android)
  userDbTable.updateUser(onlineUser);

  return new Promise(resolve => {
    resolve({isSuccessfull: true, result: onlineUser} as AppResponse);
  });
};

const createAccountWithEmailAndPassword = (loginUser: LoginUser) => {
  return new Promise(function (resolve, _reject) {
    registerWithEmail(loginUser)
      .then(async response => {
        if (response.isSuccessfull) {
          // We signed up successfully, so we are logging the user in (as well as updating push token, persisting credential,s etc.)
          handleSuccessfulLogin(response.result as UserAccount).then(
            response => {
              resolve(response as AppResponse);
            },
          );
        } else {
          resolve(response as AppResponse);
        }
      })
      .catch(error => {
        resolve(response as AppResponse);
      });
  });
};

const loginWithEmailAndPassword = (user: LoginUser) => {
  return new Promise(function (resolve, _reject) {
    auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then(response => {
        const uid = response.user.uid;

        userDbTable
          .getUserByID(uid)
          .then(function (firestoreUser) {
            if (firestoreUser) {
              handleSuccessfulLogin(firestoreUser).then(response => {
                resolve(response as AppResponse);
              });
            } else {
              resolve({
                isSuccessfull: false,
                error: ErrorCode.noUser,
              } as AppResponse);
            }
          })
          .catch(function (_error) {
            console.log('_error:', _error);
            resolve({
              isSuccessfull: false,
              error: ErrorCode.serverError,
            } as AppResponse);
          });
      })
      .catch(error => {
        var errorCode = ErrorCode.serverError;

        switch (error.code) {
          case 'auth/wrong-password':
            errorCode = ErrorCode.invalidPassword;
            break;
          case 'auth/network-request-failed':
            errorCode = ErrorCode.serverError;
            break;
          case 'auth/user-not-found':
            errorCode = ErrorCode.noUser;
            break;
          default:
            errorCode = ErrorCode.serverError;
        }

        resolve({isSuccessfull: false, error: errorCode} as AppResponse);
      });
  });
};

const logout = async (userId: string) => {
  const userData = {
    id: userId,
    isOnline: false,
  } as UserAccount;

  await userDbTable.updateUser(userData);
  await auth().signOut();
};

const retrievePersistedAuthUser = (listener: any): (() => void) => {
  return auth().onAuthStateChanged(listener);
};

const signInWithCredential = (credential: any, socialAuthType: string) => {
  return new Promise((resolve, _reject) => {
    auth()
      .signInWithCredential(credential)
      .then(async response => {
        Alert.alert('3');

        const isNewUser = response.additionalUserInfo.isNewUser;
        // const { first_name, last_name, family_name, given_name } = response.additionalUserInfo.profile;
        const {uid, email, phoneNumber, photoURL} = response.user;

        const timestamp = getUnixTimeStamp();
        const userData = {
          id: uid,
          email: email || '',
          // firstName: first_name || given_name || socialAuthType || '',
          // lastName: last_name || family_name || 'User',
          // phone: phoneNumber || '',
          // profilePictureURL: photoURL || defaultProfilePhotoURL,
          createdAt: timestamp,
          // ...(socialAuthType ? { socialAuthType } : {}),
        } as UserAccount;

        if (isNewUser) {
          // do not await here.

          Alert.alert('4');

          userDbTable.addNewUser(userData);

          resolve({isSuccessfull: true, result: userData} as AppResponse);
        }

        Alert.alert('5');

        userDbTable
          .getUserByID(uid)
          .then(function (firestoreUser) {
            if (firestoreUser) {
              handleSuccessfulLogin(firestoreUser).then(response => {
                resolve(response as AppResponse);
              });
            } else {
              resolve({
                isSuccessfull: false,
                error: ErrorCode.noUser,
              } as AppResponse);
            }
          })
          .catch(function (_error) {
            console.log('_error:', _error);
            resolve({
              isSuccessfull: false,
              error: ErrorCode.serverError,
            } as AppResponse);
          });
      })
      .catch(_error => {
        console.log(_error);
        resolve({error: ErrorCode.serverError});
      });
  });
};

// const loginWithFacebook = (accessToken, appIdentifier) => {
//   const credential = auth.FacebookAuthProvider.credential(accessToken);

//   return new Promise((resolve, _reject) => {
//     signInWithCredential(credential, appIdentifier, 'Facebook').then(
//       response => {
//         resolve(response);
//       },
//     )
//   })
// }

const loginOrSignUpWithGoogle = () => {
  GoogleSignin.configure({
    webClientId:
      '270930206979-5g92jrri5aa6ef56t892diu9p5hgmi2o.apps.googleusercontent.com',
  });

  return new Promise(async (resolve, _reject) => {
    try {
      const {idToken} = await GoogleSignin.signIn();
      const credential = auth.GoogleAuthProvider.credential(idToken);

      Alert.alert(`${idToken}`);

      signInWithCredential(credential, 'Google').then(async response => {
        if (response.isSuccessfull) {
          handleSuccessfulLogin(response.result as UserAccount).then(
            response => {
              resolve(response as AppResponse);
            },
          );
        } else {
          resolve({
            isSuccessfull: false,
            error: ErrorCode.googleSigninFailed,
          } as AppResponse);
        }
      });
    } catch (error) {
      console.log(error);
      resolve({
        isSuccessfull: false,
        error: ErrorCode.googleSigninFailed,
      } as AppResponse);
    }
  });
};

export interface IAuthManager {
  createAccountWithEmailAndPassword: (user: LoginUser) => Promise<AppResponse>;
  loginWithEmailAndPassword: (user: LoginUser) => Promise<AppResponse>;
  logout: (userId: string) => void;
  retrievePersistedAuthUser: (listener: any) => () => void;
  loginOrSignUpWithGoogle: () => void;
  // logout: (user: UserAccount) => void;

  // onAuthStateChanged: (callback: any) => any;
}

export const authManager: IAuthManager = {
  createAccountWithEmailAndPassword,
  loginWithEmailAndPassword,
  logout,
  retrievePersistedAuthUser,

  loginOrSignUpWithGoogle,
  // validateUsernameFieldIfNeeded,
  // sendPasswordResetEmail,
  // deleteUser,
};
