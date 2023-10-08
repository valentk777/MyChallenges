import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {AppResponse} from '../../entities/appResponse';
import {LoginUser, UserAccount} from '../../entities/user';
import auth from '@react-native-firebase/auth';
import {ErrorCode} from '../../entities/errorCodes';
import userDbTable from '../database/userDbTable';
import {Alert} from 'react-native';
import timeService from '../../services/timeService';

const defaultProfilePhotoURL =
  'https://www.iosapptemplates.com/wp-content/uploads/2019/06/empty-avatar.jpg';

const registerWithEmail = (user: LoginUser) => {
  return new Promise(function (resolve, _reject) {
    auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(async response => {
        const newUser = {
          id: response.user.uid,
          email: user.email,
          createdAt: timeService.getCurrentDateString(),
          profilePictureURL: defaultProfilePhotoURL,
        } as UserAccount;

        // Store user info to database. We do not await here.
        userDbTable.addNewUser(newUser);

        resolve({isSuccessfull: true, result: newUser} as AppResponse);
      })
      .catch(error => {
        console.log('_error:', error);

        var errorCode = ErrorCode.serverError;

        switch (error.code) {
          case 'auth/email-already-in-use':
            errorCode = ErrorCode.emailInUse;
            break;
          case 'auth/invalid-email':
            errorCode = ErrorCode.badEmailFormat;
            break;
          case 'auth/network-request-failed':
            errorCode = ErrorCode.serverError;
            break;
          case 'auth/weak-password':
            errorCode = ErrorCode.invalidPassword;
            break;
          default:
            errorCode = ErrorCode.serverError;
        }

        Alert.alert(errorCode);

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
        console.log(error);
        resolve({isSuccessfull: false, error: error.message} as AppResponse);
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
          .catch(function (error) {
            console.log('_error', error);
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

        Alert.alert(errorCode);

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

  try{
    await GoogleSignin?.signOut();
  } catch (error) {
    // do nothing. Maybe not a google loggin.
  }
};

const retrievePersistedAuthUser = (listener: any): (() => void) => {
  return auth().onAuthStateChanged(listener);
};

const signInWithCredential = (credential: any, socialAuthType: string) => {
  return new Promise(function (resolve, _reject) {
    auth()
      .signInWithCredential(credential)
      .then(async response => {
        const isNewUser = response.additionalUserInfo.isNewUser;
        const {uid, email, photoURL} = response.user;

        const timestamp = timeService.getCurrentDateString();
        const userData = {
          id: uid,
          email: email || '',
          profilePictureURL: photoURL || defaultProfilePhotoURL,
          createdAt: timestamp,
        } as UserAccount;

        if (isNewUser) {
          // do not await here.
          userDbTable.addNewUser(userData);

          handleSuccessfulLogin(userData).then(response => {
            resolve(response as AppResponse);
          });
        } else {
          userDbTable
            .getUserByID(uid)
            .then(function (firestoreUser) {
              if (firestoreUser) {
                handleSuccessfulLogin(firestoreUser).then(response => {
                  resolve(response as AppResponse);
                });
              } else {
                Alert.alert(ErrorCode.noUser);

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
        }
      })
      .catch(_error => {
        console.log(_error);
        resolve({error: ErrorCode.serverError});
      });
  });
};

const loginOrSignUpWithGoogle = () => {
  GoogleSignin.configure({
    webClientId:
      '270930206979-d65g9932hbh9v7p3ifrgmk2eeb0gvrnh.apps.googleusercontent.com',
  });

  return new Promise(async function (resolve, _reject) {
    try {
      const {idToken} = await GoogleSignin.signIn();
      const credential = auth.GoogleAuthProvider.credential(idToken);

      signInWithCredential(credential, 'Google').then(async response => {
        if (response.isSuccessfull) {
          handleSuccessfulLogin(response.result as UserAccount).then(
            response => {
              resolve(response as AppResponse);
            },
          );
        } else {
          Alert.alert(ErrorCode.googleSigninFailed);

          resolve({
            isSuccessfull: false,
            error: ErrorCode.googleSigninFailed,
          } as AppResponse);
        }
      });
    } catch (error) {
      Alert.alert(ErrorCode.googleSigninFailed);

      resolve({
        isSuccessfull: false,
        error: ErrorCode.googleSigninFailed,
      } as AppResponse);
    }
  });
};

const signInAnonymously = () => {
  return new Promise(async function (resolve, _reject) {
    try {
      auth()
        .signInAnonymously()
        .then(response => {
          const isNewUser = response.additionalUserInfo.isNewUser;
          const {uid, email} = response.user;

          const timestamp = timeService.getCurrentDateString();
          const userData = {
            id: uid,
            email: email || '',
            createdAt: timestamp,
          } as UserAccount;

          if (isNewUser) {
            // do not await here.
            userDbTable.addNewUser(userData);

            handleSuccessfulLogin(userData).then(response => {
              resolve(response as AppResponse);
            });
          } else {
            userDbTable.getUserByID(uid).then(function (firestoreUser) {
              if (firestoreUser) {
                handleSuccessfulLogin(firestoreUser).then(response => {
                  resolve(response as AppResponse);
                });
              } else {
                Alert.alert(ErrorCode.noUser);

                resolve({
                  isSuccessfull: false,
                  error: ErrorCode.noUser,
                } as AppResponse);
              }
            });
          }
        })
        .catch(error => {
          console.log(error);

          resolve({
            isSuccessfull: false,
            error: ErrorCode.anonymousSigninFailed,
          } as AppResponse);
        });
    } catch (error) {
      Alert.alert('cia');

      Alert.alert(ErrorCode.anonymousSigninFailed);

      resolve({
        isSuccessfull: false,
        error: ErrorCode.anonymousSigninFailed,
      } as AppResponse);
    }
  });
};

// const loginWithFacebook = (accessToken, appIdentifier) => {
//   const credential = auth.FacebookAuthProvider.credential(accessToken);

//   return new Promise((resolve, _reject) => {
//     signInWithCredential(credential, 'Facebook').then(
//       response => {
//         resolve(response);
//       },
//     )
//   })
// }

// const loginOrSignUpWithFacebook = appConfig => {
//   Facebook.initializeAsync(appConfig.facebookIdentifier)

//   return new Promise(async (resolve, _reject) => {
//     try {
//       const { type, token, expires, permissions, declinedPermissions } =
//         await Facebook.logInWithReadPermissionsAsync({
//           permissions: ['public_profile', 'email'],
//         })

//       if (type === 'success') {
//         // Get the user's name using Facebook's Graph API
//         // const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
//         // Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
//         loginWithFacebook(token, appConfig.appIdentifier)
//           .then(async response => {
//             if (response?.user) {
//               const newResponse = {
//                 user: { ...response.user },
//                 accountCreated: response.accountCreated,
//               }
//               handleSuccessfulLogin(
//                 newResponse.user,
//                 response.accountCreated,
//               ).then(response => {
//                 // resolve(response);
//                 resolve({
//                   ...response,
//                 })
//               })
//             } else {
//               resolve({ error: ErrorCode.fbAuthFailed })
//             }
//           })
//       } else {
//         resolve({ error: ErrorCode.fbAuthCancelled })
//       }
//     } catch (error) {
//       resolve({ error: ErrorCode.fbAuthFailed })
//     }
//   })
// }

export interface IAuthManager {
  createAccountWithEmailAndPassword: (user: LoginUser) => Promise<AppResponse>;
  loginWithEmailAndPassword: (user: LoginUser) => Promise<AppResponse>;
  logout: (userId: string) => void;
  retrievePersistedAuthUser: (listener: any) => () => void;
  loginOrSignUpWithGoogle: () => Promise<AppResponse>;
  signInAnonymously: () => Promise<AppResponse>;
  // loginOrSignUpWithFacebook: () => Promise<AppResponse>;
}

export const authManager: IAuthManager = {
  createAccountWithEmailAndPassword,
  loginWithEmailAndPassword,
  logout,
  retrievePersistedAuthUser,
  loginOrSignUpWithGoogle,
  signInAnonymously,
  // loginOrSignUpWithFacebook,
};
