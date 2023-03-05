import { Text, View } from "react-native";
import DeviceList from "./components/DeviceList";
import React, { useEffect, useState } from "react";
import { styles } from "../../../../styles/styles";
import { Device } from "react-native-ble-plx";
import {
  scanBluetoothDevices,
  scanningFinished$,
} from "../../../../services/BluetoothService";
import { ScreenNamesEnum } from "../../../../models/enums/ScreenNamesEnum";
import NavBar from "../../../common/NavBar";
import WavyBackground from "../../../common/WavyBackground";
import { ColorsEnum } from "../../../../models/enums/ColorsEnum";
import ActionButton from "../../../common/ActionButton";
import useLanguage from "../../../../language/LanguageHook";

const BluetoothScanResultsScreen = ({ navigation, route }: any) => {
  const LANGUAGE = useLanguage();

  const returnScreen: string = !!route.params?.returnScreen
    ? route.params.returnScreen
    : ScreenNamesEnum.CONTROLLER;

  const [scanningState, setScanningState] = useState(true);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
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

  const handleConnect = () => {
    navigation.navigate(ScreenNamesEnum.BLUETOOTH_CONNECTION_ATTEMPT, {
      deviceId: selectedDevice?.id,
      returnScreen,
    });
  };

  const handleDeviceSelect = (device: Device) => {
    setSelectedDevice(device);
  };

  const handleScanReload = () => {
    setScanningState(true);
    setRefreshCount(refreshCount + 1);
  };

  return (
    <View style={styles.initContainer}>
      <WavyBackground color={ColorsEnum.BACKGROUND_MEDIUM} />
      <NavBar navigation={navigation} showSettings={false} showHelp={false} />
      <View style={styles.layoutContainer}>
        <View style={styles.instructionContainer}>
          <Text style={styles.instructionText}>
            {LANGUAGE ? LANGUAGE.BLUETOOTH_SETUP.SCAN_RESULT.INSTRUCTION : ""}
          </Text>
        </View>
        <DeviceList
          devices={bluetoothDevices}
          onSelect={handleDeviceSelect}
          selectedDevice={selectedDevice}
          refreshing={scanningState}
          onRefresh={handleScanReload}
        />
        <ActionButton
          title={LANGUAGE ? LANGUAGE.BLUETOOTH_SETUP.SCAN_RESULT.CONNECT : ""}
          action={handleConnect}
          disabled={!selectedDevice}
        />
      </View>
    </View>
  );
};

export default BluetoothScanResultsScreen;
