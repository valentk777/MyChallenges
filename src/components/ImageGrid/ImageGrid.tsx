import React, { useContext } from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { customTheme } from '../../styles/customTheme';
import { ThemeContext } from '../../contexts/themeContext';
import LinearGradient from 'react-native-linear-gradient'

interface ChallengesListProps {
  visible: boolean;
  imagesToDisplay: any[];
  onClose: (imageLocation: string) => void;
  currentIndex: number;
}

const ImageGalleryModal = ({ visible, imagesToDisplay, onClose, currentIndex }: ChallengesListProps) => {
  const { theme } = useContext(ThemeContext);
  const styles = createStyles(theme);

  const imagesToDisplayLenght = imagesToDisplay.length;

  const currentIndexLocation = imagesToDisplay[currentIndex % imagesToDisplayLenght].location;

  const renderItem = ({ item }) => {
    const Component = item.component;

    return (
      <TouchableOpacity onPress={() => onClose(item.location)} style={item.location == currentIndexLocation ? styles.selectedImage : styles.image}>
        <Component />
      </TouchableOpacity>
    )
  };

  return (
    <Modal visible={visible} animationType="slide">
      <LinearGradient
        colors={styles.linearGradient.colors}
        style={styles.linearGradient}
      >
        <View style={styles.container}>
          <View style={styles.modalContent}>
            <FlatList
              data={imagesToDisplay}
              renderItem={renderItem}
              keyExtractor={(item) => item.location}
              numColumns={3}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
      </LinearGradient>
    </Modal>
  );
};

const createStyles = (theme: typeof customTheme) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    linearGradient: {
      flex: 15,
      colors: [theme.colors.primary, theme.colors.secondary]
    },
    modalContent: {
      width: '80%',
      height: '90%',
      backgroundColor: theme.colors.white,
      borderRadius: 10,
      overflow: 'hidden',
    },
    image: {
      width: '33.3%',
      aspectRatio: 1,
      resizeMode: 'contain',
    },
    selectedImage: {
      width: '33.3%',
      aspectRatio: 1,
      resizeMode: 'contain',
      backgroundColor: 'blue'
      // ...theme.shadows.dark
    },
  });

  return styles;
};

export default ImageGalleryModal;
