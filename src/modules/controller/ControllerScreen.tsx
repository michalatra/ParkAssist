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
  first,
  from,
  map,
  of,
  retry,
  switchMap,
  tap,
  withLatestFrom,
} from "rxjs";
import {
  bluetoothError$,
  connectDeviceById,
  connectedDevice$,
  deviceHasDisconnected$,
  scanBluetoothDevices,
  setupWiredDetectors,
} from "../../services/BluetoothService";
import { BluetoothDeviceData } from "../../models/BluetoothDeviceData";
import DeviceInfo from "./components/DeviceInfo";
import { ConnectionStatus } from "../../models/enums/ConnectionStatus";
import { DetectorData } from "../../models/DetectorData";
import { useToast } from "react-native-toast-notifications";

const ControllerScreen = ({ navigation }: any) => {
  const [bluetoothDevice, setBluetoothDevice] =
    useState<BluetoothDeviceData | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>(
    ConnectionStatus.DISCONNECTED
  );
  const [socketsInitialized, setSocketsInitialized] = useState(false);
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  useEffect(() => {
    const subscription = connectedDevice$
      .pipe(
        first(),
        switchMap((device) =>
          device ? from(device.isConnected()) : of(false)
        ),
        withLatestFrom(connectedDevice$.pipe(first())),
        tap(([isConnected, device]) => {
          if (device)
            setBluetoothDevice({ id: device?.id, name: device?.name! });

          setConnectionStatus(
            isConnected
              ? ConnectionStatus.CONNECTED
              : ConnectionStatus.DISCONNECTED
          );
        }),
        filter(([connected, _]) => !connected),
        tap((_) => setLoading(true)),
        tap((_) => scanBluetoothDevices(15000)),
        switchMap((_) => readValue(AsyncStorage, StorageKeysEnum.DEVICE)),
        tap((device) => {
          setBluetoothDevice(device);
          setConnectionStatus(ConnectionStatus.CONNECTING);
        }),
        filter(Boolean),
        switchMap((device) => connectDeviceById(device.id)),
        retry({ count: 5, delay: 3000 }),
        catchError((_) => {
          setLoading(false);
          if (connectionStatus !== ConnectionStatus.CONNECTED)
            setConnectionStatus(ConnectionStatus.DISCONNECTED);

          return empty();
        })
      )
      .subscribe(handleConnectionResult);

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const subscription = deviceHasDisconnected$.subscribe((disconnected) => {
      console.log("Handling deviceHasDisconnected$ signal - controller");
      if (disconnected) {
        setConnectionStatus(ConnectionStatus.DISCONNECTED);
      }
    });

    return () => {
      subscription.unsubscribe();
      console.log("Unsub Disconnected");
    };
  }, []);

  useEffect(() => {
    const subscription = bluetoothError$.subscribe((_) => {
      console.log("Handling bluetoothError$ signal - controller");
      setConnectionStatus(ConnectionStatus.DISCONNECTED);
    });

    return () => {
      subscription.unsubscribe();
      console.log("Unsub error");
    };
  }, []);

  const handleConnectionResult = (device: any | null) => {
    console.log("Handling connection result");
    setLoading(false);

    if (device) {
      console.log("Handling connection result inside");
      setBluetoothDevice(device as BluetoothDeviceData);
      setConnectionStatus(ConnectionStatus.CONNECTED);
      setupSockets();
    } else {
      setConnectionStatus(ConnectionStatus.DISCONNECTED);
    }
  };

  const setupSockets = () => {
    console.log("Setting up sockets");
    readValue(AsyncStorage, StorageKeysEnum.WIRED_DETECTORS)
      .pipe(
        first(),
        tap((detectors) => console.log("Wired detectors", detectors)),
        filter(Boolean),
        map((detectors) => setupWiredDetectors(detectors as DetectorData[])),
        tap((_) => setSocketsInitialized(true))
      )
      .subscribe(() => setLoading(false));
  };

  const handleMeasure = () => {
    console.log(bluetoothDevice);
    if (bluetoothDevice && connectionStatus === ConnectionStatus.CONNECTED) {
      navigation.navigate(ScreenNamesEnum.MEASUREMENT);
    } else {
      toast.show("Please connect to device first", { type: "danger" });
    }
  };

  const handleConnect = () => {
    of(bluetoothDevice)
      .pipe(
        first(),
        tap((_) => setLoading(true)),
        tap((_) => scanBluetoothDevices(15000)),
        tap((device) => {
          setBluetoothDevice(device);
          setConnectionStatus(ConnectionStatus.CONNECTING);
        }),
        filter(Boolean),
        switchMap((device) => connectDeviceById(device.id)),
        retry({ count: 5, delay: 3000 }),
        catchError((_) => {
          setLoading(false);
          if (connectionStatus !== ConnectionStatus.CONNECTED)
            setConnectionStatus(ConnectionStatus.DISCONNECTED);
          return empty();
        })
      )
      .subscribe(handleConnectionResult);
  };

  const handleFindNewDevice = () => {};

  return (
    <View style={styles.container}>
      <Navigation
        navigation={navigation}
        title="Park Assist"
        showSettings={true}
      />
      <View style={styles.actionContainer}>
        <View style={styles.circleContainer}>
          <View style={styles.instructionContainer}>
            <Text style={styles.instructionText}>
              Tap to start the measurement{" "}
            </Text>
          </View>
          <TouchableOpacity onPress={handleMeasure}>
            <View style={[styles.outerCircle, styles.outerCircleYellow]}>
              <View style={[styles.innerCircle, styles.innerCircleYellow]}>
                <Image
                  style={styles.circleIcon}
                  source={require("../../assets/icons/ruler.png")}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <DeviceInfo
        device={bluetoothDevice}
        loading={loading}
        connectionStatus={connectionStatus}
        onFindNewDevice={handleFindNewDevice}
        onConnect={handleConnect}
      />
    </View>
  );
};

export default ControllerScreen;
