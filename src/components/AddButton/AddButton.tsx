import React, {useContext} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ThemeContext} from '../../contexts/themeContext';
import { customTheme } from '../../styles/customTheme';

interface AddButtonProps { }

export const AddButton = (props: AddButtonProps) => {
  const {onPress} = props;

  const {theme} = useContext(ThemeContext);
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Pressable>
        <Icon name="user-plus" onPress={onPress} size={20} />
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
