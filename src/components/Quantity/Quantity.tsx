import React, { useContext } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ThemeContext } from '../../contexts/themeContext';
import { customTheme } from '../../styles/customTheme';
import LinearGradient from 'react-native-linear-gradient';

interface QuantityProps {
  count: number;
  setCount: (newCount: number) => void;
}

export const Quantity = (props: QuantityProps) => {
  const { count, setCount } = props;

  const { theme } = useContext(ThemeContext);
  const styles = createStyles(theme);

  //TODO: fix linear gradient
  return (
    <View style={styles.container}>
      <LinearGradient
        start={{ x: 1, y: 1 }}
        colors={[theme.colors.white, theme.colors.white]}
        locations={[0.9, 1]}
        style={styles.linearGradient}
      >
        <Pressable onPress={() => setCount(count - 1)} disabled={count <= 0} style={styles.left}>
          <Icon name="angle-left" size={70} color="#000" />
        </Pressable>
      </LinearGradient>
      <View style={styles.verticleLine}></View>
      <LinearGradient
        start={{ x: 0, y: 1 }}
        colors={[theme.colors.white, theme.colors.white]}
        locations={[0, 0.1]}
        style={styles.linearGradient}
      >
        <Pressable onPress={() => setCount(count + 1)} style={styles.right}>
          <Icon name="angle-right" size={70} color="#000" />
        </Pressable>
      </LinearGradient>
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
      // backgroundColor: theme.colors.white,
      // justifyContent: 'center',
      // alignItems: 'center',
      // opacity: 0.2,
    },
    right: {
      // // backgroundColor: theme.colors.tile1,
      // justifyContent: 'center',
      // alignItems: 'center',
      // opacity: 0.2,
            // borderBottomLeftRadius: 30,
      // borderBottomRightRadius: 30,
    },
    linearGradient: {
      height: '70%',
      width: '50%',
      justifyContent: 'center',
      alignItems: 'center',
      opacity: 0.2,

    },
    verticleLine: {
      height: '70%',
      width: 1,
      backgroundColor: theme.colors.tile3,
    },
    // number: {
    //   height: '80%',
    //   width: '50%',
    //   justifyContent: 'center',
    //   alignItems: 'center',
    // },
    // text: {
    //   fontSize: 40,
    //   lineHeight: 50,
    //   fontWeight: 'bold',
    //   fontFamily: theme.text.fontFamily,
    //   color: 'green',
    // },
  });
  return styles;
};
