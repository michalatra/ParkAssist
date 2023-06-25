// @ts-ignore
import { decode, encode } from "base-64";
import {
  BleManager,
  Characteristic,
  ConnectionPriority,
  Device,
  State,
} from "react-native-ble-plx";
import {
  BehaviorSubject,
  catchError,
  delay,
  EMPTY,
  filter,
  from,
  interval,
  map,
  Observable,
  of,
  retry,
  Subject,
  switchMap,
  take,
  takeUntil,
  tap,
} from "rxjs";
import { PermissionsAndroid, Platform } from "react-native";
import { DetectorData } from "../models/DetectorData";
import { BluetoothErrorEnum } from "../models/enums/BluetoothErrorEnum";
import { DetectorTypeEnum } from "../models/enums/DetectorTypeEnum";
import { BluetoothCommandMessage } from "../models/BluetoothCommandMessage";
import { BluetoothCommandEnum } from "../models/enums/BluetoothCommandEnum";
import { BluetoothResponse } from "../models/BluetoothResponse";
import { CommandResultEnum } from "../models/enums/CommandResultEnum";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { readValue } from "./StorageService";
import { StorageKeysEnum } from "../models/enums/StorageKeysEnum";
import { BluetoothDeviceData } from "../models/BluetoothDeviceData";
import { getDetectors } from "./DetectorsService";

const bluetoothManager = new BleManager();

const bluetoothInitialized = new BehaviorSubject<boolean>(false);
export const bluetoothInitialized$ = bluetoothInitialized.asObservable();

const scanningFinished = new Subject<boolean>();
export const scanningFinished$ = scanningFinished.asObservable();

const bluetoothDevices = new BehaviorSubject<Device[]>([]);
export const bluetoothDevices$ = bluetoothDevices.asObservable();

const connectingFinishedSuccessfully = new Subject<void>();
export const connectingFinishedSuccessfully$ =
  connectingFinishedSuccessfully.asObservable();

const deviceHasDisconnected = new Subject<void>();
export const deviceHasDisconnected$ = deviceHasDisconnected.asObservable();

const connectedDeviceCharacteristic =
  new BehaviorSubject<Characteristic | null>(null);
export const connectedDeviceCharacteristic$ =
  connectedDeviceCharacteristic.asObservable();

const connectedDevice = new BehaviorSubject<Device | null>(null);
export const connectedDevice$ = connectedDevice.asObservable();

const currentMeasurement = new Subject<BluetoothResponse>();
export const currentMeasurement$ = currentMeasurement.asObservable();

const measurementFinished = new Subject<void>();
export const measurementFinished$ = measurementFinished.asObservable();

const measurementActive = new BehaviorSubject<boolean>(false);
export const measurementActive$ = measurementActive.asObservable();

const readFinished = new Subject<void>();
export const readFinished$ = readFinished.asObservable();

const bluetoothError = new Subject<BluetoothErrorEnum>();
export const bluetoothError$ = bluetoothError.asObservable();

export const initializeBluetooth = (): Observable<any> => {
  return from(bluetoothManager.state()).pipe(
    switchMap((state) =>
      state === State.PoweredOn
        ? from(bluetoothManager.disable()).pipe(
            take(1),
            switchMap(() => from(bluetoothManager.enable()))
          )
        : from(bluetoothManager.enable())
    ),
    switchMap((_) => requestLocationPermission()),
    switchMap((_) => scanBluetoothDevices(15000)),
    delay(3000),
    take(1),
    switchMap((_) => restoreSavedDevice()),
    switchMap((_) => setupWiredDetectors()),
    tap(() => bluetoothInitialized.next(true)),
    catchError((error) => {
      console.log("Error while initializing bluetooth: ", error);
      bluetoothInitialized.next(false);
      return of(null);
    })
  );
};

const restoreSavedDevice = (): Observable<Device | null> => {
  return readValue(AsyncStorage, StorageKeysEnum.DEVICE).pipe(
    switchMap((device: BluetoothDeviceData) =>
      device
        ? connectDeviceById(device.id).pipe(
            retry({ count: 5, delay: 3000 }),
            catchError((error) => {
              console.log("Error while connecting to saved device: ", error);
              return of(null);
            })
          )
        : of(null)
    )
  );
};

export const reconnectDevice = (): Observable<boolean> => {
  return scanBluetoothDevices(15000).pipe(
    delay(3000),
    take(1),
    switchMap((_) => restoreSavedDevice()),
    switchMap((_) => setupWiredDetectors())
  );
};

const isDuplicate = (device: Device): boolean => {
  return (
    bluetoothDevices.getValue().findIndex((d) => d.id === device.id) !== -1
  );
};

const isValid = (device: Device): boolean => {
  return !!device.name;
};

const scan = () => {
  console.log("Scanning...");
  bluetoothManager.startDeviceScan(null, null, (error, device) => {
    if (error) return bluetoothError.next(BluetoothErrorEnum.SCAN_ERROR);

    if (device) {
      if (!isDuplicate(device) && isValid(device)) {
        bluetoothDevices.next([...bluetoothDevices.getValue(), device]);
      }
    }
  });
};

export const scanBluetoothDevices = (
  duration: number
): Observable<Device[]> => {
  setTimeout(() => {
    bluetoothManager.stopDeviceScan();
    scanningFinished.next(true);
  }, duration);

  scan();

  return bluetoothDevices$;
};

const requestLocationPermission = (): Observable<boolean> => {
  console.log("Requesting location permission...");

  if (Platform.OS === "android" && Platform.Version >= 23) {
    return from(
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      )
    ).pipe(
      tap((enabled) =>
        console.log("Permission status: ", enabled ? "enabled" : "disabled")
      ),
      switchMap((enabled) =>
        enabled
          ? of(true)
          : from(
              PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
              )
            ).pipe(
              map(
                (permission) =>
                  permission === PermissionsAndroid.RESULTS.GRANTED
              ),
              tap((result) => {
                result
                  ? console.log(
                      "Location permission for bluetooth scanning granted"
                    )
                  : console.log(
                      "Location permission for bluetooth scanning revoked"
                    );
              }),
              tap(
                (result) =>
                  !result &&
                  bluetoothError.next(BluetoothErrorEnum.PERMISSION_ERROR)
              )
            )
      )
    );
  }
  console.log("Location permission for bluetooth scanning granted");
  return from(
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    )
  ).pipe(
    map((permission) => permission === PermissionsAndroid.RESULTS.GRANTED),
    tap((result) => {
      result
        ? console.log("Location permission for bluetooth scanning granted")
        : console.log("Location permission for bluetooth scanning revoked");
    }),
    tap(
      (result) =>
        !result && bluetoothError.next(BluetoothErrorEnum.PERMISSION_ERROR)
    )
  );
};

export const connectDeviceById = (
  deviceId: string
): Observable<Device | null> => {
  console.log("Connecting device: ", deviceId);
  return from(bluetoothManager.devices([deviceId])).pipe(
    take(1),
    map((devices) => {
      if (devices.length > 0) return devices[0];
      else {
        bluetoothError.next(BluetoothErrorEnum.CONNECTING_ERROR);
        throw new Error(BluetoothErrorEnum.CONNECTING_ERROR);
      }
    }),
    switchMap((device) => connectDevice(device))
  );
};

const connectDevice = (device: Device): Observable<Device | null> => {
  return from(device.isConnected()).pipe(
    take(1),
    tap((isConnected) => isConnected && connectingFinishedSuccessfully.next()),
    switchMap((isConnected) =>
      isConnected
        ? of(device)
        : from(device.connect()).pipe(
            switchMap((d) => from(d.discoverAllServicesAndCharacteristics())),
            switchMap((d) =>
              from(
                d.readCharacteristicForService(
                  "4fafc201-1fb5-459e-8fcc-c5c9c331914b",
                  "beb5483e-36e1-4688-b7f5-ea07361b26a8"
                )
              )
            ),
            tap((characteristic) => {
              connectedDevice.next(device);
              connectedDeviceCharacteristic.next(characteristic);
              connectingFinishedSuccessfully.next();
              device.onDisconnected(() => {
                connectedDevice.next(null);
                deviceHasDisconnected.next();
              });
            }),
            switchMap((_) =>
              bluetoothManager.requestConnectionPriorityForDevice(
                device.id,
                ConnectionPriority.High
              )
            ),
            map((_) => device),
            catchError((_) => {
              bluetoothError.next(BluetoothErrorEnum.CONNECTING_ERROR);
              connectedDevice.next(null);
              return of(null);
            })
          )
    )
  );
};

export const disconnectBluetoothDevice = (
  deviceId: string | undefined
): Observable<any> => {
  if (!deviceId) return of(null);
  return from(bluetoothManager.devices([deviceId])).pipe(
    take(1),
    map((devices) => {
      if (devices.length > 0) return devices[0];
      else throw new Error(BluetoothErrorEnum.DISCONNECTING_ERROR);
    }),
    switchMap((device) => from(device.cancelConnection())),
    tap((_) => {
      connectedDevice.next(null);
      connectedDeviceCharacteristic.next(null);
      deviceHasDisconnected.next();
    }),
    catchError((_) => {
      bluetoothError.next(BluetoothErrorEnum.DISCONNECTING_ERROR);
      return EMPTY;
    })
  );
};

export const setupWiredDetectors = (): Observable<boolean> => {
  return connectedDevice$.pipe(
    take(1),
    switchMap((device) =>
      device && device.id
        ? getDetectors(AsyncStorage).pipe(
            switchMap((detectors) =>
              detectors
                ? setupUltrasonicDetectors(
                    detectors[DetectorTypeEnum.ULTRA_SONIC]
                  ).pipe(
                    switchMap((_) =>
                      setupSinglePointLidarDetectors(
                        detectors[DetectorTypeEnum.SINGLE_POINT_LIDAR]
                      )
                    ),
                    switchMap((_) =>
                      setupMultiPointLidarDetectors(
                        detectors[DetectorTypeEnum.MULTI_POINT_LIDAR]
                      )
                    ),
                    map((_) => true),
                    catchError((_) => {
                      bluetoothError.next(
                        BluetoothErrorEnum.DETECTOR_SETUP_ERROR
                      );
                      return of(false);
                    })
                  )
                : of(false)
            )
          )
        : of(false)
    )
  );
};

const setupUltrasonicDetectors = (
  ultrasonicDetectors: DetectorData[]
): Observable<BluetoothResponse | null> => {
  const command: BluetoothCommandMessage = {
    command:
      ultrasonicDetectors.length > 0
        ? BluetoothCommandEnum.ENABLE_ULTRASONIC_DETECTORS
        : BluetoothCommandEnum.DISABLE_ULTRASONIC_DETECTORS,
    detectorCount: ultrasonicDetectors.length,
    socketIndices: ultrasonicDetectors.map((d) => d.socketIndex - 1),
    detectorIds: ultrasonicDetectors.map((d) => d.id),
  };

  return sendCommand(command);
};

const setupSinglePointLidarDetectors = (
  singlePointLidarDetectors: DetectorData[]
): Observable<BluetoothResponse | null> => {
  if (singlePointLidarDetectors.length === 0) return of(null);

  const command: BluetoothCommandMessage = {
    command:
      singlePointLidarDetectors.length > 0
        ? BluetoothCommandEnum.ENABLE_LUNA
        : BluetoothCommandEnum.DISABLE_LUNA,
  };

  return sendCommand(command);
};

const setupMultiPointLidarDetectors = (
  multiPointLidarDetectors: DetectorData[]
): Observable<BluetoothResponse | null> => {
  const command: BluetoothCommandMessage = {
    command:
      multiPointLidarDetectors.length > 0
        ? BluetoothCommandEnum.ENABLE_LIDAR
        : BluetoothCommandEnum.DISABLE_LIDAR,
  };

  return sendCommand(command);
};

export const startMeasurement = (): Observable<any> => {
  const command: BluetoothCommandMessage = {
    command: BluetoothCommandEnum.START_MEASUREMENT,
  };

  return sendCommand(command).pipe(
    filter((response) => response.result === CommandResultEnum.SUCCESS),
    tap((_) => measurementActive.next(true)),
    switchMap((_) => connectedDeviceCharacteristic$),
    tap((characteristic) => {
      measure(characteristic!);

      readFinished$
        .pipe(
          tap((_) => console.log("interval")),
          takeUntil(measurementFinished$),
          tap((_) => measure(characteristic!))
        )
        .subscribe();
    }),
    switchMap((_) => currentMeasurement$)
  );
};

export const stopMeasurement = (): Observable<any> => {
  if (!measurementActive.getValue()) return of(null);

  measurementFinished.next();

  return sendStopCommand().pipe(
    take(1),
    tap((_) => measurementActive.next(false))
  );
};

const measure = (characteristic: Characteristic): void => {
  console.log("measure");
  // characteristic
  //   .read()
  //   .then((c) => {
  //     console.log("read");
  //     if (c.value !== null) {
  //       currentMeasurement.next(
  //         JSON.parse(decode(c.value)) as BluetoothResponse
  //       );
  //     }
  //     readFinished.next();
  //   })
  //   .catch((_) => {
  //     measurementFinished.next();
  //   });
  from(characteristic.read())
    .pipe(
      take(1),
      tap((_) => console.log("read")),
      filter((c) => c.value !== null),
      map((c) => decode(c.value)),
      map((reading) => {
        try {
          return JSON.parse(reading) as BluetoothResponse;
        } catch (e) {
          return null;
        }
      }),
      catchError((_) => {
        measurementFinished.next();
        return of(null);
      })
    )
    .subscribe((res) => {
      if (res) {
        currentMeasurement.next(res);
      }
      readFinished.next();
    });
};

const sendStopCommand = (): Observable<BluetoothResponse> => {
  const command: BluetoothCommandMessage = {
    command: BluetoothCommandEnum.STOP_MEASUREMENT,
  };

  return sendCommand(command).pipe(
    tap(
      (response: BluetoothResponse) =>
        response.result !== CommandResultEnum.SUCCESS &&
        bluetoothError.next(BluetoothErrorEnum.STOP_MEASUREMENT_ERROR)
    )
  );
};

const sendCommand = (
  command: BluetoothCommandMessage
): Observable<BluetoothResponse> => {
  if (!connectedDeviceCharacteristic.getValue()) {
    bluetoothError.next(BluetoothErrorEnum.CONNECTION_ERROR);
    return of({
      command: command.command,
      result: CommandResultEnum.BLUETOOTH_ERROR,
    });
  }

  const message = encode(JSON.stringify(command));
  console.log("Sending command: ", command);

  return from(
    connectedDeviceCharacteristic.getValue()!.writeWithResponse(message)
  ).pipe(
    take(1),
    tap((_) => console.log("Command sent")),
    switchMap((characteristic) => characteristic!.read()),
    map((characteristic) => decode(characteristic!.value)),
    map((response) => JSON.parse(response) as BluetoothResponse),
    catchError((_) => {
      bluetoothError.next(BluetoothErrorEnum.WRITING_ERROR);
      return of({
        command: command.command,
        result: CommandResultEnum.BLUETOOTH_ERROR,
      });
    }),
    tap((response) => console.log("Received response: ", response))
  );
};
