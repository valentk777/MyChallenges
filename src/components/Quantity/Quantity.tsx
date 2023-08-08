import React, { useContext, useRef } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ThemeContext } from '../../contexts/themeContext';
import { customTheme } from '../../styles/customTheme';
import { ChallengeContext } from '../../views/challengeScreen';

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
    }, 150);
  };

  const increaseInterval = () => {
    intervalRef.current = setInterval(() => {
      newLocalValue = newLocalValue + 5;
      updateValue(newLocalValue);
    }, 150);
  };

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <TouchableWithoutFeedback
          onPress={() => updateValue(newLocalValue - 1)}
          onPressIn={decreaseInterval}
          onPressOut={() => clearInterval(intervalRef.current)}
          disabled={newValue <= 0}>
          <Icon name="angle-left" size={70} color="#000" />
        </TouchableWithoutFeedback>
      </View>

      <View style={styles.verticleLine}></View>
      <View style={styles.right}>
        <TouchableWithoutFeedback
          onPress={() => updateValue(newLocalValue + 1)}
          onPressIn={increaseInterval}
          onPressOut={() => clearInterval(intervalRef.current)}>
          <Icon name="angle-right" size={70} color="#000" />
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
      opacity: 0.2,
    },
    right: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      opacity: 0.2,
    },
    verticleLine: {
      height: '70%',
      width: 1,
      backgroundColor: theme.colors.tile3,
    },
  });

  return styles;
};
