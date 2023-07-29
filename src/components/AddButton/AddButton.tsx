import React, {useContext} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {ThemeContext} from '../../contexts/themeContext';

interface AddButtonProps { }

export const AddButton = (props: AddButtonProps) => {
  const {onPress} = props;

  const {theme} = useContext(ThemeContext);
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Pressable>
        <Icon name="plus" onPress={onPress} size={40} />
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
