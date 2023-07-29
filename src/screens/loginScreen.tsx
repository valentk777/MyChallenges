import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useContext} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from '../../App';
import Icon from 'react-native-vector-icons/Feather';
import {useAuthorizationContext} from '../contexts/authorizationContext';
import {Button, ButtonTypes} from '../components/ButtonWrapper/ButtonWrapper';
import {ThemeContext} from '../contexts/themeContext';

interface LoginScreenProps
  extends NativeStackScreenProps<RootStackParamList, 'Login'> {
  setIsLoggedIn: (isAuthenticated: boolean) => void;
}

export const LoginScreen = (props: LoginScreenProps) => {
  const {signIn} = useAuthorizationContext();
  const {theme} = useContext(ThemeContext);
  const styles = createStyles(theme);

  return (
    <View style={styles.global}>
      <View style={styles.section}>
        <Icon name="lock" size={70} color="#000" />
        <Text style={styles.text}>Login</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          type={ButtonTypes.Primary}
          title="Show my challenges"
          onPress={() => {
            signIn();
          }}
        />
      </View>
    </View>
  );
};

const createStyles = (theme: typeof customTheme) => {
  const styles = StyleSheet.create({
    global: {
      backgroundColor: theme.colors.primary,
      height: '100%'
    },
    section: {
      alignItems: 'center',
      justifyContent: 'center',
      height: '60%',
    },
    text: {
      fontSize: 20,
      lineHeight: 21,
      fontFamily: theme.text.fontFamily,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginTop: 10,
    },
    buttonContainer: {
      margin: 20,
    },
  });
  return styles;
};


