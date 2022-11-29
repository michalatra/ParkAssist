import {View} from "react-native";
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
  const [scanningState, setScanningState] = useState(true);
  const [bluetoothDevices, setBluetoothDevices] = useState<Device[]>([]);
  const [refreshCount, setRefreshCount] = useState(0);

  useEffect(() => {
    const subscription = scanningFinished$.subscribe((_) =>
      setScanningState(false)
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
  }, [refreshCount]);

  const handleDeviceSelect = (device: Device) => {
    navigation.navigate(ScreenNamesEnum.BLUETOOTH_CONNECTION_ATTEMPT, {
      deviceId: device.id,
    });
  };

  const handleScanReload = () => {
    console.log("Refreshing");
    setScanningState(true);
    setRefreshCount(refreshCount + 1);
  }

  return (

    <View style={styles.container}>
      <Navigation title="Find Detectors Nearby" navigation={navigation} />
      <DeviceList devices={bluetoothDevices} onSelect={handleDeviceSelect} refreshing={scanningState} onRefresh={handleScanReload} />
    </View>
  );
};

export default BluetoothSearchResultsScreen;
