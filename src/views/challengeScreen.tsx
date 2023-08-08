import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState, useContext, createContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { HomeStackParamList } from '../../App';
import { SaveButton } from '../components/ButtonWrapper/ButtonWrapper';
import { Quantity } from '../components/Quantity/Quantity';
import { NumericProgressTile } from '../components/Tile/NumericProgressTile';
import { ThemeContext } from '../contexts/themeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Challenge } from '../entities/challenge';
import { customTheme } from '../styles/customTheme';
import LinearGradient from 'react-native-linear-gradient'

type ChallengeScreenProps = NativeStackScreenProps<HomeStackParamList, 'Challenge'>;

interface ChallengeContextProvider {
  challenge: Challenge;
  newValue: number;
  updateValue: (value: number) => void;
}

export const ChallengeContext = createContext<ChallengeContextProvider>({
  challenge: null,
  newValue: 0,
  updateValue: (value: number) => { },
});

// TODO: move to shared component
const storeData = async (value: Challenge) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(value.id, jsonValue);
    return true;
  } catch (e) {
    alert("error saving to storage");
    alert(e);
    return false;
  }
};

// todo: remove and update or up
const onSave = async (challenge: Challenge, newCount: number, props) => {
  challenge.currentValue = newCount;
  
  const result = await storeData(challenge);

  if (result) {
    props.navigation.navigate('Challenges');
  }
}

export const ChallengeScreen = (props: ChallengeScreenProps) => {
  const challenge = props.route.params.challenge;

  const [newCount, setCount] = useState(challenge.currentValue);
  const { theme } = useContext(ThemeContext);
  const styles = createStyles(theme);

  const updateValue = (value: number) => {
    setCount(value);
  }

  return (
    <View style={styles.container}>
      <ChallengeContext.Provider
        value={{
          challenge: challenge,
          newValue: newCount,
          updateValue: updateValue,
        }}>
        <View style={styles.animationContainer}>
          <LinearGradient
            start={{ x: 0.9, y: 0 }}
            colors={styles.linearGradient.colors}
            locations={[0, 0.6, 1]}
            style={styles.linearGradient}
          >
            <NumericProgressTile/>
          </LinearGradient>
        </View>
        <View style={styles.dataContainer}>
          <Quantity />
        </View>
        <View style={styles.saveContainer}>
          <SaveButton
            title="Save"
            onPress={async () => onSave(challenge, newCount, props)}
          />
        </View>
      </ChallengeContext.Provider>

    </View >
  );
};

const createStyles = (theme: typeof customTheme) => {
  const styles = StyleSheet.create({
    container: {
      // paddingTop: 20,
      backgroundColor: theme.colors.white,
      height: '100%',
    },
    animationContainer: {
      alignItems: 'center',
      // height: '60%',
      width: '100%',
      flex: 6,
    },
    linearGradient: {
      height: '100%',
      width: '100%',
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
      colors: [theme.colors.primary, theme.colors.secondary, theme.colors.primary],
    },
    dataContainer: {
      // paddingTop: 10,
      alignItems: 'center',
      // height: '32%',
      flex: 5
    },
    // text: {
    //   fontSize: 25,
    //   fontFamily: theme.text.fontFamily,
    //   fontWeight: 'bold',
    //   color: theme.colors.text,
    // },
    saveContainer: {
      // marginRight: 20,
      // marginLeft: 20,
      // height: '8%',
      flex: 1
    },
  });
  return styles;
};
