import React from "react";
import { View, Modal, TouchableWithoutFeedback, StyleSheet, useWindowDimensions } from "react-native";
import { AppTheme } from "../../styles/themeModels";
import { useTheme } from "../../hooks/useTheme";

interface BlackScreenModalProps {
  children?: React.ReactNode | undefined;
  isModalVisible: boolean;
  onHideModal: () => void;
  onBackgroundPress?: () => void;
}

const BlackScreenModal = (props: BlackScreenModalProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const window = useWindowDimensions();

  const { children, isModalVisible, onHideModal, onBackgroundPress } = props;

  return (
    <Modal
      transparent={true}
      animationType='fade'
      visible={isModalVisible}
      onRequestClose={onHideModal}
    >
      <TouchableWithoutFeedback onPress={onHideModal}>
        <View style={{ ...styles.modalBackground, height: window.height }}>
          <TouchableWithoutFeedback onPress={onBackgroundPress}>
            {children}
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

const createStyles = (theme: AppTheme) => {
  const styles = StyleSheet.create({
    modalBackground: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
  });

  return styles;
};

export default BlackScreenModal;
