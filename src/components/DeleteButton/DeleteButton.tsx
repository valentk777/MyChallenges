import React, {useContext} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {ThemeContext} from '../../contexts/themeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Challenge } from '../../entities/challenge';
import { customTheme } from '../../styles/customTheme';

interface DeleteButtonProps {
  challenge: Challenge;
}

removeValueOnPress = async (challenge : Challenge, redirect) => {
  try {
    await AsyncStorage.removeItem(challenge.id);
    redirect();
  } catch(e) {
    alert("Error removing item");
    alert(e);
  }
}

export const DeleteButton = (props: DeleteButtonProps) => {
  const {challenge, onPress} = props;

  const {theme} = useContext(ThemeContext);
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Pressable>
        {/* <Icon name="delete" onPress={async () => removeValueOnPress(challenge, onPress)} size={40} /> */}
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
      color: theme.colors.primary
    }
  });
  return styles;
};
