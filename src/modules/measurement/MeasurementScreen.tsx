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
import { switchMap, tap } from "rxjs";
import { DetectorLocationStorageData } from "../../models/DetectorLocationStorageData";
import { DetectorLocationData } from "../../models/DetectorLocationData";

const MeasurementScreen = ({ navigation }: any) => {
  const [measurement, setMeasurement] = useState<String>("");
  const [detectorLocations, setDetectorLocations] = useState<
    DetectorLocationData[]
  >([]);
  const toast = useToast();
  const onStop = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: ScreenNamesEnum.CONTROLLER }],
    });
  };

  useEffect(() => {
    const subscription = readValue(
      AsyncStorage,
      StorageKeysEnum.WIRED_DETECTORS_LOCATIONS
    )
      .pipe(
        tap((locations) => {
          setDetectorLocations(locations);
          locations.forEach((location: DetectorLocationData) => {
            toast.show(
              `Detector: ${location.index}, Location type: ${location.locationType}, Location: ${location.location} `
            );
          });
        }),
        switchMap((_) => startMeasurement())
      )
      .subscribe((currentMeasurement) => setMeasurement(currentMeasurement));

    return () => {
      subscription.unsubscribe();
      stopMeasurement();
    };
  }, []);

  useEffect(() => {
    const subscription = deviceHasDisconnected$.subscribe((disconnected) => {
      if (disconnected) {
        toast.show("Device has disconnected");
        onStop();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const subscription = bluetoothError$.subscribe((error) => {
      console.log(error);
      toast.show("An unexpected error occurred");
      onStop();
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
    console.log(locations);
  };

  return (
    <View style={styles.container}>
      <Navigation
        title="Park Assist"
        navigation={navigation}
        showSettings={false}
      />
      <View style={styles.measurementContainer}>
        <View style={styles.measurementRowContainer}></View>
        <Image
          style={styles.measurementCarImage}
          source={require("../../assets/icons/top_shot.png")}
        />
        <View style={styles.measurementRowContainer}></View>
        <View style={styles.instructionContainerStandalone}>
          <Text style={styles.instructionText}>{measurement}</Text>
        </View>
      </View>
      <Button
        backgroundColor={ColorsEnum.CORAL}
        title="Stop Measurement"
        action={onStop}
      />
    </View>
  );
};

export default MeasurementScreen;
