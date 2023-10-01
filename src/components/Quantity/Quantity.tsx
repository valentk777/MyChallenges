import React, { useContext, useRef } from 'react';
import { Image, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { ThemeContext } from '../../contexts/themeContext';
import { customTheme } from '../../styles/customTheme';
import { ChallengeContext } from '../../screens/challengeScreen';
import { icons } from '../../assets';

interface QuantityProps {
}

export const Quantity = (props: QuantityProps) => {
  const { newValue, updateValue } = useContext(ChallengeContext);
  let newLocalValue = newValue;

  const { theme } = useContext(ThemeContext);
  const styles = createStyles(theme);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  const decreaseInterval = () => {
    intervalRef.current = setInterval(() => {
      newLocalValue = newLocalValue - 5;
      updateValue(newLocalValue);
    }, 250);
  };

  const increaseInterval = () => {
    intervalRef.current = setInterval(() => {
      newLocalValue = newLocalValue + 5;
      updateValue(newLocalValue);
    }, 250);
  };

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <TouchableWithoutFeedback
          onPress={() => updateValue(newLocalValue - 1)}
          onPressIn={decreaseInterval}
          onPressOut={() => clearInterval(intervalRef.current)}
          disabled={newValue <= 0}>
          <Image
            source={icons['angle-left.png']}
            resizeMode="contain"
            style={styles.icon}
          />
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.verticleLine}></View>
      <View style={styles.right}>
        <TouchableWithoutFeedback
          onPress={() => updateValue(newLocalValue + 1)}
          onPressIn={increaseInterval}
          onPressOut={() => clearInterval(intervalRef.current)}>
          <Image
            source={icons['angle-right.png']}
            resizeMode="contain"
            style={styles.icon}
          />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const createStyles = (theme: typeof customTheme) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    },
    left: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      opacity: 0.3,
    },
    right: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      opacity: 0.3,
    },
    verticleLine: {
      height: '70%',
      width: 1,
      backgroundColor: theme.colors.tile3,
    },
    icon: {
      flex: 1,
      width: 60,
      tintColor: theme.colors.black,
    },
  });

  return styles;
};
