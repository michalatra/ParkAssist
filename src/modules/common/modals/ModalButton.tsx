import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ModalButtonTypeEnum } from "../../../models/enums/ModalButtonTypeEnum";
import { styles } from "../../../styles/styles";
import { ModalButtonData } from "../../../models/ModalButtonData";

const ModalButton = ({ text, type, onClick }: ModalButtonData) => {
  const getButtonClasses = () => {
    const buttonClasses = [];
    buttonClasses.push(styles.modalButton);
    switch (type) {
      case ModalButtonTypeEnum.ACCEPT:
        buttonClasses.push(styles.modalButtonAccept);
        break;
      case ModalButtonTypeEnum.REJECT:
        buttonClasses.push(styles.modalButtonReject);
        break;
      case ModalButtonTypeEnum.DEFAULT:
        buttonClasses.push(styles.modalButtonDefault);
        break;
      default:
        buttonClasses.push(styles.modalButtonDefault);
    }

    return buttonClasses;
  };

  return (
    <TouchableOpacity onPress={onClick}>
      <View style={getButtonClasses()}>
        <Text style={styles.modalButtonText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ModalButton;
