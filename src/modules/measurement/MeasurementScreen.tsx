import React, { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { styles } from "../../styles/styles";
import Navigation from "../common/Navigation";
import Button from "../common/Button";
import { ColorsEnum } from "../../models/enums/ColorsEnum";
import {
  bluetoothError$,
  deviceHasDisconnected$,
  startMeasurement,
  stopMeasurement,
} from "../../services/BluetoothService";
import { useToast } from "react-native-toast-notifications";
import { ScreenNamesEnum } from "../../models/enums/ScreenNamesEnum";
import { readValue } from "../../services/StorageService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StorageKeysEnum } from "../../models/enums/StorageKeysEnum";
import { finalize, switchMap, take, tap } from "rxjs";
import { DetectorLocationData } from "../../models/DetectorLocationData";
import NavBar from "../common/NavBar";
import WavyBackground from "../common/WavyBackground";
import ActionButton from "../common/ActionButton";
import useLanguage from "../../language/LanguageHook";
import MeasurementIndicator from "./components/MeasurementIndicator";

const MeasurementScreen = ({ navigation }: any) => {
  const [measurement, setMeasurement] = useState<String>("");
  const [detectorLocations, setDetectorLocations] = useState<
    DetectorLocationData[]
  >([]);
  const LANGUAGE = useLanguage();
  const toast = useToast();
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
      .subscribe((currentMeasurement) => setMeasurement(currentMeasurement));

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const subscription = deviceHasDisconnected$.subscribe((disconnected) => {
      toast.show("Device has disconnected");
      handleStop();
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const subscription = bluetoothError$.subscribe((error) => {
      console.log(error);
      toast.show("An unexpected error occurred");
      handleStop();
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleNewMeasurement = (measurement: string) => {
    const measurementArr: string[] = measurement.split(";");
    const locations = [...detectorLocations];

    for (let i = 0; i < measurementArr.length; i++) {
      let loc = locations.find((l) => l.index && l.active && l.index === i);
      loc!.measurement = +measurementArr[i];
    }

    setDetectorLocations(locations);
  };

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
