import { useNavigation, useFocusEffect } from "@react-navigation/native"
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useLayoutEffect, useCallback } from "react"
import { Alert, Keyboard, View } from "react-native"
import { useAuth } from "../hooks/useAuth";
import { RootStackParamList } from "../navigators/RootNavigator";

type LoadScreenProps = NativeStackScreenProps<RootStackParamList, 'LoadScreen'>;

const LoadScreen =({ navigation }: LoadScreenProps) => {
    // const dispatch = useDispatch()
    const authManager = useAuth()
  
    // const { config } = useOnboardingConfig()
  
    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: false,
      })
    }, [navigation])
  
    useFocusEffect(
      useCallback(() => {
        setAppState()
      }, []),
    )
  
    const setAppState = async () => {



    //   const shouldShowOnboardingFlow = await deviceStorage.getShouldShowOnboardingFlow()
      
      if (!authManager.isSignedIn) {
        // if (config?.isDelayedLoginEnabled) {
        //   fetchPersistedUserIfNeeded()
        //   return
        // }
        Alert.alert("login");
        navigation.navigate('AuthStack')
      } else {
        Alert.alert("alreadylogedIn");
        navigation.navigate('MainStack')
      }
    }
  
    // const fetchPersistedUserIfNeeded = async () => {
    //   if (!authManager?.retrievePersistedAuthUser) {
    //     return navigation.navigate('DelayedHome')
    //   }
    //   authManager
    //     ?.retrievePersistedAuthUser(config)
    //     .then(response => {
    //       if (response?.user) {
    //         dispatch(
    //           setUserData({
    //             user: response.user,
    //           }),
    //         )
    //         Keyboard.dismiss()
    //       }
    //       navigation.navigate('DelayedHome')
    //     })
    //     .catch(error => {
    //       console.log(error)
    //       navigation.navigate('DelayedHome')
    //     })
    // }

    return <View />
  }
  
  export default LoadScreen
  