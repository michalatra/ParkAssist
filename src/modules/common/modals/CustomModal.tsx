import React from "react";
import { Image, Modal, View, Text } from "react-native";
import { styles } from "../../../styles/styles";
import { ModalTypeEnum } from "../../../models/enums/ModalTypeEnum";
import ModalButton from "./ModalButton";
import { ModalButtonData } from "../../../models/ModalButtonData";

interface ErrorScreenProps {
  title: string;
  description: string;
  visible: boolean;
  type: ModalTypeEnum;
  onClose?: any;
  modalButtonsData?: ModalButtonData[];
}

const CustomModal = ({
  title,
  description,
  visible,
  type,
  onClose,
  modalButtonsData,
}: ErrorScreenProps) => {
  const getModalIcon = () => {
    switch (type) {
      case ModalTypeEnum.INFO:
        return require("../../../assets/icons/info.png");
      case ModalTypeEnum.SUCCESS:
        return require("../../../assets/icons/success.png");
      case ModalTypeEnum.ERROR:
        return require("../../../assets/icons/error.png");
      default:
        return require("../../../assets/icons/info.png");
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalIconContainer}>
            <Image style={styles.modalIcon} source={getModalIcon()} />
          </View>
          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalDescription}>{description}</Text>
          <View style={styles.modalButtonsContainer}>
            {modalButtonsData?.map((button) => (
              <ModalButton
                key={button.text}
                text={button.text}
                type={button.type}
                onClick={button.onClick}
              />
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
