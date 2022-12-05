import { Image, Text, TouchableOpacity, View } from "react-native";
import Navigation from "../common/Navigation";
import { styles } from "../../styles/styles";
import { ScreenNamesEnum } from "../../models/enums/ScreenNamesEnum";
import { useEffect, useState } from "react";
import { readValue } from "../../services/StorageService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StorageKeysEnum } from "../../models/enums/StorageKeysEnum";
import {
  catchError,
  empty,
  filter,
  finalize,
  first,
  map,
  retry,
  switchMap,
  tap,
} from "rxjs";
import {
  connectDeviceById,
  connectedDevice$,
  scanBluetoothDevices,
  setupWiredDetectors,
} from "../../services/BluetoothService";
import { BluetoothDeviceData } from "../../models/BluetoothDeviceData";
import DeviceInfo from "./components/DeviceInfo";
import { ConnectionStatus } from "../../models/enums/ConnectionStatus";
import { Device } from "react-native-ble-plx";
import { DetectorData } from "../../models/DetectorData";

const ControllerScreen = ({ navigation }: any) => {
  const [connectedDevice, setConnectedDevice] = useState<BluetoothDeviceData>();
  const [socketsInitialized, setSocketsInitialized] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const subscription = connectedDevice$
      .pipe(
        first(),
        tap((device) => updateDeviceState(device, ConnectionStatus.CONNECTED)),
        filter((device) => device === null),
        tap((_) => setLoading(true)),
        tap((_) => scanBluetoothDevices(15000)),
        switchMap((_) => readValue(AsyncStorage, StorageKeysEnum.DEVICE)),
        tap((device) => updateDeviceState(device, ConnectionStatus.CONNECTING)),
        filter(Boolean),
        switchMap((device) => connectDeviceById(device.id)),
        retry({ count: 5, delay: 3000 }),
        catchError(handleConnectingError),
        finalize(() => setLoading(false))
      )
      .subscribe(handleConnectionResult);

    return () => subscription.unsubscribe();
  }, []);

  const updateDeviceState = (
    device: BluetoothDeviceData | Device | null,
    status: ConnectionStatus
  ) => {
    if (device)
      setConnectedDevice({
        name: device.name!,
        id: device.id,
        status: status,
      });
  };

  const handleConnectionResult = (device: any | null) => {
    setLoading(true);

    if (device) {
      updateDeviceState(device as Device, ConnectionStatus.CONNECTED);
      setupSockets();
    }
  };

  const setupSockets = () => {
    readValue(AsyncStorage, StorageKeysEnum.WIRED_DETECTORS)
      .pipe(
        first(),
        filter(Boolean),
        map((detectors) => setupWiredDetectors(detectors as DetectorData[])),
        tap((_) => setSocketsInitialized(true))
      )
      .subscribe(() => setLoading(false));
  };

  const handleConnectingError = () => {
    if (connectedDevice)
      updateDeviceState(connectedDevice, ConnectionStatus.DISCONNECTED);

    return empty();
  };

  const handleMeasure = () => {
    navigation.navigate(ScreenNamesEnum.MEASUREMENT);
  };

  return (
    <View style={styles.container}>
      <Navigation navigation={navigation} title="Park Assist" />
      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={styles.circleContainer}
          onPress={handleMeasure}
        >
          <View style={[styles.outerCircle, styles.outerCircleYellow]}>
            <View style={[styles.innerCircle, styles.innerCircleYellow]}>
              <Image
                style={styles.circleIcon}
                source={require("../../assets/icons/ruler.png")}
              />
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.instructionContainer}>
          <Text style={styles.instructionText}>
            Tap to begin the measurement
          </Text>
        </View>
      </View>
      <DeviceInfo device={connectedDevice} loading={loading} />
    </View>
  );
};

export default ControllerScreen;
