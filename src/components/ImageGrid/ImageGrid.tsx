import React from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { AppTheme } from '../../styles/themeModels';
import { useTheme } from '../../hooks/useTheme';
import MyModal from '../Modals/MyModal';

interface ImageGalleryModalProps {
  visible: boolean;
  imagesToDisplay: any[];
  onClose: (imageLocation: string) => void;
  currentIndex: number;
}

const ImageGalleryModal = ({ visible, imagesToDisplay, onClose, currentIndex }: ImageGalleryModalProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const imagesToDisplayLenght = imagesToDisplay.length;

  const currentIndexLocation = imagesToDisplay[currentIndex % imagesToDisplayLenght].location;

  const renderItem = ({ item }) => {
    const Component = item.component;

    return (
      <TouchableOpacity onPress={() => onClose(item.location)} style={styles.image}>
        <Component
          backgroundColor={item.location == currentIndexLocation ? theme.colors.secondary : theme.colors.tertiary}
          primaryColor={theme.colors.tertiary}
          secondaryColor={theme.colors.canvas}
          borderColor={theme.colors.primary}
        />
      </TouchableOpacity>
    )
  };

  return (
    <MyModal isModalVisible={visible} hideModal={() => onClose(currentIndexLocation)} >
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
    </MyModal>
  );
};

const createStyles = (theme: AppTheme) => {
  const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      width: '90%',
      height: '90%',
      backgroundColor: theme.colors.canvas,
      borderRadius: 10,
      overflow: 'hidden',
    },
    image: {
      width: '33.33%',
      padding: 5,
      aspectRatio: 1,
      resizeMode: 'contain',
    },
    selectedImage: {
      backgroundColor: 'rgba(0, 0, 0, 0.15)',
    },
  });

  return styles;
};

export default ImageGalleryModal;
