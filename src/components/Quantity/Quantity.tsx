import React, { useContext, useRef } from 'react';
import { Image, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { AppTheme } from '../../styles/themeModels';
import { icons } from '../../assets';
import { ChallengeContext } from '../../hooks/useChallenge';

interface QuantityProps {
}

export const Quantity = (props: QuantityProps) => {
  const { challenge, newValue, updateValue } = useContext(ChallengeContext);
  let newLocalValue = newValue;

  const { theme } = useTheme();
  const styles = createStyles(theme);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  const isDetailedCount = () => {
    let isDetailedCount = challenge?.isDetailedCount;

    if (isDetailedCount == undefined) {
      return false;
    }

    return isDetailedCount;
  }
  const decreaseInterval = () => {
    const interval = isDetailedCount() ? 1 : 5;

    intervalRef.current = setInterval(() => {
      newLocalValue = newLocalValue - interval;
      updateValue(newLocalValue);
    }, 250);
  };

  const increaseInterval = () => {
    const interval = isDetailedCount() ? 1 : 5;

    intervalRef.current = setInterval(() => {
      newLocalValue = newLocalValue + interval;
      updateValue(newLocalValue);
    }, 250);
  };

  const onShortDecreasePress = () => {
    let value = newLocalValue - (isDetailedCount() ? 0.1 : 1);
    value = parseFloat(value.toLocaleString(undefined, { maximumFractionDigits: 2 }));
    updateValue(value);
  }

  const onShortIncreasePress = () => {
    let value = newLocalValue + (isDetailedCount() ? 0.1 : 1);
    value = parseFloat(value.toLocaleString(undefined, { maximumFractionDigits: 2 }));
    updateValue(value);
  }

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <TouchableWithoutFeedback
          onPress={onShortDecreasePress}
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
          onPress={onShortIncreasePress}
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

const createStyles = (theme: AppTheme) => {
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
    },
    right: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    verticleLine: {
      height: '70%',
      width: 1,
      backgroundColor: theme.colors.canvasInverted,
    },
    icon: {
      flex: 1,
      width: 60,
      tintColor: theme.colors.canvasInverted,
    },
  });

  return styles;
};
