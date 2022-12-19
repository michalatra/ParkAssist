import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { styles } from "../../../styles/styles";
import Navigation from "../../common/Navigation";
import { DetectorData } from "../../../models/DetectorData";
import { useToast } from "react-native-toast-notifications";
import { GlobalVariablesEnum } from "../../../models/enums/GlobalVariablesEnum";
import { ColorsEnum } from "../../../models/enums/ColorsEnum";
import Button from "../../common/Button";
import { setupWiredDetectors } from "../../../services/BluetoothService";
import { ScreenNamesEnum } from "../../../models/enums/ScreenNamesEnum";
import { saveValue } from "../../../services/StorageService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StorageKeysEnum } from "../../../models/enums/StorageKeysEnum";
import { catchError, empty, switchMap, take } from "rxjs";

const generateDetectorsList = (detectorsCount: string): DetectorData[] => {
  const detectors = [];
  const detectorsCountValue = parseInt(detectorsCount);
  for (let i = 0; i < detectorsCountValue; i++) {
    detectors.push({ id: i, socketIndex: "", hasError: false });
  }

  return detectors;
};

const DetectorsSocketSetupScreen = ({ navigation, route }: any) => {
  const returnScreen: string = !!route.params?.returnScreen
    ? route.params.returnScreen
    : ScreenNamesEnum.CONTROLLER;

  const [detectors, setDetectors] = useState(
    generateDetectorsList(route.params.detectorsCount)
  );

  const toast = useToast();

  const onConfirm = () => {
    const detectorWithError = detectors.find((detector) => detector.hasError);

    const detectorWithoutSocket = detectors.find(
      (detector) => detector.socketIndex === ""
    );

    if (detectorWithError || detectorWithoutSocket)
      return toast.show("Assign correct socket index to all detectors");

    setupWiredDetectors(detectors)
      .pipe(
        take(1),
        switchMap(() =>
          saveValue(AsyncStorage, StorageKeysEnum.WIRED_DETECTORS, detectors)
        ),
        catchError((_) => {
          toast.show("An error occurred while setting up detectors", {
            type: "danger",
          });
          navigation.goBack();
          return empty();
        })
      )
      .subscribe((_) =>
        navigation.navigate(ScreenNamesEnum.DETECTORS_LOCATION_SETUP, {
          detectorsCount: detectors.length,
          returnScreen,
        })
      );

    saveValue(AsyncStorage, StorageKeysEnum.WIRED_DETECTORS, detectors);
  };

  const handleAssignInputValue = (socketIndex: string, id: number) => {
    const socketValue = parseInt(socketIndex);

    const updatedDetectors = [...detectors];

    updatedDetectors.map((detector) => {
      if (detector.socketIndex === socketIndex) {
        detector.socketIndex = "";
        detector.hasError = false;
      }
    });

    updatedDetectors[id].hasError = false;
    updatedDetectors[id].socketIndex = socketIndex;

    if (socketValue > GlobalVariablesEnum.SOCKET_LIMIT) {
      updatedDetectors[id].hasError = true;
      toast.show("Socket index mustn't be greater than number of sockets.");
    }

    if (socketValue <= 0) {
      updatedDetectors[id].hasError = true;
      toast.show("Socket index mustn't be les than 0.");
    }

    setDetectors(updatedDetectors);
  };

  return (
    <View style={styles.container}>
      <Navigation
        title="Setup Detectors"
        navigation={navigation}
        showSettings={false}
      />
      <View style={styles.detectorsSocketContainer}>
        <Text style={styles.detectorsSocketTitle}>
          Enter socket ids corresponding with your detectors
        </Text>
        <View style={styles.detectorsSocketInputContainer}>
          {detectors.map((detector) => (
            <TextInput
              key={detector.id}
              value={detector.socketIndex}
              style={[
                styles.detectorsSocketInput,
                detector.hasError ? styles.detectorsSocketInputError : null,
              ]}
              onChangeText={(text) => handleAssignInputValue(text, detector.id)}
              keyboardType="numeric"
              keyboardAppearance="dark"
            />
          ))}
        </View>
      </View>
      <Button
        backgroundColor={ColorsEnum.BUTTON_BLUE}
        title="Confirm"
        action={onConfirm}
      />
    </View>
  );
};

export default DetectorsSocketSetupScreen;
