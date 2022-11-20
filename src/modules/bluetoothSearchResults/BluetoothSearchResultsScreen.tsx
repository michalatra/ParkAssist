import { View, Text } from "react-native";
import Navigation from "../common/Navigation";
import DeviceList from "./components/DeviceList";
import React, { useEffect, useState } from "react";
import { styles } from "../../styles/styles";
import { Device } from "react-native-ble-plx";
import {
  scanBluetoothDevices,
  scanningFinished$,
} from "../../services/BluetoothService";
import { ScreenNamesEnum } from "../../models/enums/ScreenNamesEnum";

const BluetoothSearchResultsScreen = ({ navigation }: any) => {
  const [bluetoothState, setBluetoothState] = useState("Scanning...");
  const [bluetoothDevices, setBluetoothDevices] = useState<Device[]>([]);

  useEffect(() => {
    const subscription = scanningFinished$.subscribe((_) =>
      setBluetoothState("")
    );

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const subscription = scanBluetoothDevices(15000).subscribe((devices) =>
      setBluetoothDevices(devices)
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleDeviceSelect = (device: Device) => {
    navigation.navigate(ScreenNamesEnum.BLUETOOTH_CONNECTION_ATTEMPT, {
      deviceId: device.id,
    });
  };

  return (
    <View style={styles.container}>
      <Navigation title="Find Detectors Nearby" navigation={navigation} />
      <DeviceList devices={bluetoothDevices} onSelect={handleDeviceSelect} />
      <View style={styles.instructionContainer}>
        <Text style={styles.instructionText}>{bluetoothState}</Text>
      </View>
    </View>
  );
};

export default BluetoothSearchResultsScreen;
