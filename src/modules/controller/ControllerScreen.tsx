import { Text, View } from "react-native";
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
  disconnectBluetoothDevice,
  scanBluetoothDevices,
  setupWiredDetectors,
} from "../../services/BluetoothService";
import { BluetoothDeviceData } from "../../models/BluetoothDeviceData";
import DeviceInfo from "./components/DeviceInfo";
import { ConnectionStatus } from "../../models/enums/ConnectionStatus";
import { DetectorData } from "../../models/DetectorData";
import { useToast } from "react-native-toast-notifications";
import NavBar from "../common/NavBar";
import WavyBackground from "../common/WavyBackground";
import { ColorsEnum } from "../../models/enums/ColorsEnum";
import ActionButton from "../common/ActionButton";
import useLanguage from "../../language/LanguageHook";
import { getDetectors } from "../../services/DetectorsService";

const ControllerScreen = ({ navigation }: any) => {
  const LANGUAGE = useLanguage();
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
    };
  }, []);

  useEffect(() => {
    const subscription = bluetoothError$.subscribe((_) => {
      console.log("Handling bluetoothError$ signal - controller");
      setConnectionStatus(ConnectionStatus.DISCONNECTED);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleConnectionResult = (device: any | null) => {
    console.log("Handling connection result");
    setLoading(false);

    if (device) {
      console.log("Handling connection result inside");
      setBluetoothDevice(device as BluetoothDeviceData);
      setConnectionStatus(ConnectionStatus.CONNECTED);
      setupSockets().pipe(first()).subscribe();
    } else {
      setConnectionStatus(ConnectionStatus.DISCONNECTED);
    }
  };

  const setupSockets = () => {
    console.log("Setting up sockets");
    return getDetectors(AsyncStorage).pipe(
      first(),
      tap((detectors) => console.log("Wired detectors", detectors)),
      filter(Boolean),
      map((detectors) => setupWiredDetectors(detectors as DetectorData[])),
      tap((_) => setSocketsInitialized(true)),
      tap((_) => setLoading(false))
    );
  };

  const handleMeasure = () => {
    setupSockets()
      .pipe(first())
      .subscribe((_) => {
        if (
          bluetoothDevice &&
          connectionStatus === ConnectionStatus.CONNECTED
        ) {
          navigation.navigate(ScreenNamesEnum.MEASUREMENT);
        } else {
          toast.show("Please connect to device first", { type: "danger" });
        }
      });
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

  const handleDisconnect = () => {
    disconnectBluetoothDevice().subscribe((_) => {
      setConnectionStatus(ConnectionStatus.DISCONNECTED);
    });
  };

  const handleFindNewDevice = () => {};

  return (
    <View style={styles.initContainer}>
      <WavyBackground color={ColorsEnum.YELLOW_DARK} />
      <NavBar navigation={navigation} showSettings={true} showHelp={true} />
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
            !bluetoothDevice || connectionStatus !== ConnectionStatus.CONNECTED
          }
        />
      </View>
    </View>
  );
};

export default ControllerScreen;
