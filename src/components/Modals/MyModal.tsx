import React from "react";
import { View, Modal, TouchableWithoutFeedback, StyleSheet } from "react-native";
import { AppTheme } from "../../styles/themeModels";
import { useTheme } from "../../hooks/useTheme";

interface MyModalProps {
  children?: React.ReactNode | undefined;
  isModalVisible: boolean;
  hideModal: () => void;
}

const MyModal = (props: MyModalProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const { children, isModalVisible, hideModal } = props;

  return (
    <View style={styles.container}>
      <Modal
        transparent={true}
        animationType='fade'
        visible={isModalVisible}
        onRequestClose={hideModal}
      >
        <TouchableWithoutFeedback onPress={hideModal}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              {children}
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  )
}

const createStyles = (theme: AppTheme) => {
  const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    }
  });

  return styles;
};

export default MyModal;
