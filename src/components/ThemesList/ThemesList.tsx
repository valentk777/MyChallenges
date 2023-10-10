import React from 'react';
import { Image, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { AppTheme } from '../../styles/themeModels';
import { useTheme } from '../../hooks/useTheme';
import { icons } from '../../assets';

interface ThemesListProps {
}

const ThemesList = (props: ThemesListProps) => {
  const { theme, getAllThemes, setTheme } = useTheme();
  const styles = createStyles(theme);

  const renderItem = ({ item }) => {

    return (
      <TouchableOpacity
        onPress={async () => await setTheme(item)}
        style={{ ...styles.button, backgroundColor: item.color }}
      >
        <Image
          source={icons[item.iconName]}
          resizeMode='contain'
          style={styles.icon} />
      </TouchableOpacity>
    )
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={getAllThemes()}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        horizontal={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const createStyles = (theme: AppTheme) => {
  const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 5,
      borderRadius: 10,
      marginHorizontal: 5,
      borderColor: theme.colors.canvasInverted,
      borderWidth: 3,
      width: 60,
      aspectRatio: 1,
    },
    icon: {
      width: 35,
      height: 35,
      tintColor: 'black',
    },
  });

  return styles;
};

export default ThemesList;
