import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState, useContext } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { HomeStackParamList } from '../../App';
import { SaveButton, ButtonTypes } from '../components/ButtonWrapper/ButtonWrapper';
import { Quantity } from '../components/Quantity/Quantity';
import { NumericProgressTile } from '../components/Tile/NumericProgressTile';
import { ThemeContext } from '../contexts/themeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Challenge } from '../entities/challenge';
import { customTheme } from '../styles/customTheme';
import LinearGradient from 'react-native-linear-gradient'

type ChallengeScreenProps = NativeStackScreenProps<HomeStackParamList, 'Challenge'>;

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
const onSave = async (challenge: Challenge, props) => {
  const result = await storeData(challenge);

  if (result) {
    props.navigation.navigate('Challenges');
  }
}

export const ChallengeScreen = (props: ChallengeScreenProps) => {
  const [newCount, setCount] = useState(props.route.params.challenge.currentValue);
  const { theme } = useContext(ThemeContext);
  const styles = createStyles(theme);

  function setCounterWithUpdate(value: number) {
    setCount(value);
    props.route.params.challenge.currentValue = value;
  }

  return (
    <View style={styles.container}>
      <View style={styles.animationContainer}>
        <LinearGradient
        start={{ x: 0.9, y: 0 }}
          colors={styles.linearGradient.colors}
          locations={[0, 0.6, 1]}
          style={styles.linearGradient}
        >
          <NumericProgressTile challenge={props.route.params.challenge} />
        </LinearGradient>
      </View>
      <View style={styles.dataContainer}>
        <Quantity count={newCount} setCount={setCounterWithUpdate} />
      </View>
      <View style={styles.saveContainer}>
        <SaveButton
          title="Save"
          onPress={async () => onSave(props.route.params.challenge, props)}
        />
      </View>
    </View>
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
      height: '60%',
      width: '100%',
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
      height: '32%',
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
      height: '8%',
    },
  });
  return styles;
};
