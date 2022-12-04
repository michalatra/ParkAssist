import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { styles } from "../../../styles/styles";
import Navigation from "../../common/Navigation";
import { ScreenNamesEnum } from "../../../models/enums/ScreenNamesEnum";
import Button from "../../common/Button";
import { ColorsEnum } from "../../../models/enums/ColorsEnum";
import { useToast } from "react-native-toast-notifications";
import { GlobalVariablesEnum } from "../../../models/enums/GlobalVariablesEnum";

const DetectorsQuantitySetupScreen = ({ navigation }: any) => {
  const [detectorsCount, setDetectorsCount] = useState<string>("0");
  const toast = useToast();

  const onConfirm = () => {
    const detectorsCountValue = parseInt(detectorsCount);
    if (detectorsCountValue <= 0)
      return toast.show("The number of detectors must be greater than 0");

    if (detectorsCountValue > GlobalVariablesEnum.SOCKET_LIMIT)
      return toast.show(
        `The number of detectors mustn't be greater than ${GlobalVariablesEnum.SOCKET_LIMIT}`
      );

    navigation.navigate(ScreenNamesEnum.DETECTORS_SOCKET_SETUP, {
      detectorsCount: detectorsCountValue,
    });
  };

  return (
    <View style={styles.container}>
      <Navigation title="Setup Detectors" navigation={navigation} />
      <View style={styles.detectorsQuantityContainer}>
        <Text style={styles.detectorsQuantityTitle}>
          Enter the number of detectors
        </Text>
        <TextInput
          style={styles.detectorsQuantityInput}
          keyboardType="numeric"
          keyboardAppearance="dark"
          onChangeText={setDetectorsCount}
        />
      </View>
      <Button
        backgroundColor={ColorsEnum.BUTTON_BLUE}
        title="Confirm"
        action={onConfirm}
      />
    </View>
  );
};

export default DetectorsQuantitySetupScreen;
