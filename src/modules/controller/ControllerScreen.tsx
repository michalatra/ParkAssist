import { Text, View } from "react-native";
import { styles } from "../../styles/styles";
import { ScreenNamesEnum } from "../../models/enums/ScreenNamesEnum";
import React, { useEffect, useState } from "react";
import { readValue } from "../../services/StorageService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StorageKeysEnum } from "../../models/enums/StorageKeysEnum";
import { filter, switchMap, take, tap } from "rxjs";
import {
  bluetoothError$,
  bluetoothInitialized$,
  connectedDevice$,
  deviceHasDisconnected$,
  disconnectBluetoothDevice,
  reconnectDevice,
} from "../../services/BluetoothService";
import { BluetoothDeviceData } from "../../models/BluetoothDeviceData";
import DeviceInfo from "./components/DeviceInfo";
import { ConnectionStatus } from "../../models/enums/ConnectionStatus";
import NavBar from "../common/NavBar";
import WavyBackground from "../common/WavyBackground";
import { ColorsEnum } from "../../models/enums/ColorsEnum";
import ActionButton from "../common/ActionButton";
import useLanguage from "../../language/LanguageHook";
import { showToast } from "../../services/ToastService";
import { ErrorEnum } from "../../models/enums/ErrorEnum";
import { ToastType } from "../../models/enums/ToastType";

const ControllerScreen = ({ navigation }: any) => {
  const LANGUAGE = useLanguage();
  const [bluetoothDevice, setBluetoothDevice] =
    useState<BluetoothDeviceData | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>(
    ConnectionStatus.DISCONNECTED
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const subscription = bluetoothInitialized$
      .pipe(
        filter(Boolean),
        switchMap((_) => readValue(AsyncStorage, StorageKeysEnum.DEVICE)),
        tap((device: BluetoothDeviceData) => {
          if (device) {
            setBluetoothDevice(device);
            setConnectionStatus(ConnectionStatus.CONNECTING);
          } else {
            setConnectionStatus(ConnectionStatus.DISCONNECTED);
            setBluetoothDevice(null);
          }
        }),
        filter(Boolean),
        switchMap((_) => connectedDevice$),
        take(1),
        tap((device) => {
          setConnectionStatus((oldStatus) =>
            oldStatus === ConnectionStatus.CONNECTING && !!device
              ? ConnectionStatus.CONNECTED
              : ConnectionStatus.DISCONNECTED
          );
        })
      )
      .subscribe((_) => setLoading(false));

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const subscription = deviceHasDisconnected$.subscribe(() => {
      setConnectionStatus(ConnectionStatus.DISCONNECTED);
    });

    return () => subscription.unsubscribe();
  }, [connectionStatus]);

  useEffect(() => {
    const subscription = bluetoothError$.subscribe((error) => {
      setConnectionStatus(ConnectionStatus.DISCONNECTED);
    });

    return () => subscription.unsubscribe();
  }, [connectionStatus]);

  const handleMeasure = () => {
    if (bluetoothDevice && connectionStatus === ConnectionStatus.CONNECTED) {
      navigation.navigate(ScreenNamesEnum.MEASUREMENT);
    } else {
      showToast(ErrorEnum.DEVICE_NOT_CONNECTED, ToastType.DANGER);
    }
  };

  const handleConnect = () => {
    setLoading(true);
    setConnectionStatus(ConnectionStatus.CONNECTING);
    reconnectDevice()
      .pipe(
        take(1),
        switchMap((_) => connectedDevice$),
        take(1),
        tap((device) => {
          setConnectionStatus((oldStatus) =>
            oldStatus === ConnectionStatus.CONNECTING && !!device
              ? ConnectionStatus.CONNECTED
              : ConnectionStatus.DISCONNECTED
          );
        })
      )
      .subscribe((_) => setLoading(false));
  };

  const handleDisconnect = () => {
    disconnectBluetoothDevice(bluetoothDevice?.id).subscribe(() => {
      setConnectionStatus(ConnectionStatus.DISCONNECTED);
    });
  };

  const handleFindNewDevice = () => {};

  return (
    <View style={styles.initContainer}>
      <WavyBackground color={ColorsEnum.YELLOW_DARK} />
      <NavBar
        navigation={navigation}
        showSettings={true}
        showHelp={true}
        showLanguage={false}
      />
      <View style={styles.layoutContainer}>
        <View style={styles.instructionContainer}>
          <Text style={styles.instructionText}>
            {LANGUAGE ? LANGUAGE.CONTROLLER.INSTRUCTION : ""}
          </Text>
        </View>
        <DeviceInfo
          device={bluetoothDevice}
          loading={loading}
          connectionStatus={connectionStatus}
          onFindNewDevice={handleFindNewDevice}
          onConnect={handleConnect}
          onDisconnect={handleDisconnect}
        />
        <ActionButton
          title={LANGUAGE ? LANGUAGE.CONTROLLER.BEGIN_PARKING : ""}
          action={handleMeasure}
          disabled={
            !bluetoothDevice ||
            connectionStatus !== ConnectionStatus.CONNECTED ||
            loading
          }
        />
      </View>
    </View>
  );
};

export default ControllerScreen;
