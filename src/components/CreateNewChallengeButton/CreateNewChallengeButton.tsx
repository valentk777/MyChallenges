import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { ThemeContext } from '../../contexts/themeContext';
import { customTheme } from '../../styles/customTheme';
import { useNavigation } from '@react-navigation/native';

interface CreateNewChallengeButtonProps extends TouchableOpacityProps {
}

export const CreateNewChallengeButton = (props: CreateNewChallengeButtonProps) => {
  const { children } = props;
  const { theme } = useContext(ThemeContext);
  const styles = createStyles(theme);
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{ ...styles.container, ...styles.shadow }}
      onPress={() => navigation.navigate('CreateNewChallenge')}
    >
      <View style={styles.childrenContainer}>
        {children}
      </View>
    </TouchableOpacity>
  );
};

const createStyles = (theme: typeof customTheme) => {
  const styles = StyleSheet.create({
    container: {
      top: -30,
      justifyContent: 'center',
      alignItems: 'center',
    },
    shadow: {
      shadowColor: theme.colors.input,
      shadowOpacity: 0.25,
      shadowRadius: 3.5,
      elevation: 5,
      shadowOffset: {
        width: 0,
        height: 10,
      }
    },
    childrenContainer: {
      width: 70,
      height: 70,
      borderRadius: 35,
      backgroundColor: theme.colors.input,
    }
  });
  return styles;
};
