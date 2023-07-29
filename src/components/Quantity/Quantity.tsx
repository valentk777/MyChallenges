import React, {useContext} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {ThemeContext} from '../../contexts/themeContext';

interface QuantityProps {
  count: number;
  setCount: (newCount: number) => void;
}

export const Quantity = (props: QuantityProps) => {
  const {count, setCount} = props;

  const {theme} = useContext(ThemeContext);
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Pressable onPress={() => setCount(count - 1)} disabled={count <= 0}>
        <Icon name="minus" size={70} color="#000" />
      </Pressable>
      <View style={styles.number}>
        <Text style={styles.text}>{count}</Text>
      </View>
      <Pressable onPress={() => setCount(count + 1)}>
        <Icon name="plus" size={70} color="#000" />
      </Pressable>
    </View>
  );
};

const createStyles = (theme: typeof customTheme) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    number: {
      height: '80%',
      width: '50%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 40,
      lineHeight: 50,
      fontWeight: 'bold',
    },
  });
  return styles;
};
