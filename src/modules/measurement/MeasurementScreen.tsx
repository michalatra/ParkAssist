import React, { useEffect } from "react";
import { View } from "react-native";
import { styles } from "../../styles/styles";
import { ColorsEnum } from "../../models/enums/ColorsEnum";
import {
  bluetoothError$,
  deviceHasDisconnected$,
  startMeasurement,
  stopMeasurement,
} from "../../services/BluetoothService";
import { ScreenNamesEnum } from "../../models/enums/ScreenNamesEnum";
import { readValue } from "../../services/StorageService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StorageKeysEnum } from "../../models/enums/StorageKeysEnum";
import { race, switchMap, take } from "rxjs";
import NavBar from "../common/NavBar";
import WavyBackground from "../common/WavyBackground";
import ActionButton from "../common/ActionButton";
import useLanguage from "../../language/LanguageHook";
import MeasurementIndicator from "./components/MeasurementIndicator";
import { ToastType } from "../../models/enums/ToastType";
import { showToast } from "../../services/ToastService";
import { ErrorEnum } from "../../models/enums/ErrorEnum";

const MeasurementScreen = ({ navigation }: any) => {
  const LANGUAGE = useLanguage();
  const onStop = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: ScreenNamesEnum.CONTROLLER }],
    });
  };

  const handleStop = () => {
    stopMeasurement()
      .pipe(take(1))
      .subscribe(() => onStop());
  };

  useEffect(() => {
    const subscription = readValue(
      AsyncStorage,
      StorageKeysEnum.WIRED_DETECTORS_LOCATIONS
    )
      .pipe(switchMap((_) => startMeasurement()))
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const subscription = race(
      deviceHasDisconnected$,
      bluetoothError$
    ).subscribe((disconnected) => {
      showToast(ErrorEnum.DEVICE_HAS_DISCONNECTED, ToastType.DANGER);
      handleStop();
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <WavyBackground color={ColorsEnum.CORAL} />
      <NavBar
        navigation={navigation}
        showSettings={false}
        showHelp={false}
        showLanguage={false}
      />
      <View style={styles.measurementContainer}>
        <MeasurementIndicator />
      </View>
      <ActionButton
        title={LANGUAGE ? LANGUAGE.MEASUREMENT.STOP_MEASUREMENT : ""}
        action={handleStop}
      />
    </View>
  );
};

export default MeasurementScreen;
