// @ts-ignore
import { encode, decode } from "base-64";
import { BleManager, Characteristic, Device } from "react-native-ble-plx";
import {
  BehaviorSubject,
  filter,
  finalize,
  from,
  interval,
  Subject,
  take,
  takeUntil,
  tap,
} from "rxjs";
import {PermissionsAndroid, Platform} from "react-native";
import { DetectorData } from "../models/DetectorData";
import { BluetoothMessagesEnum } from "../models/enums/BluetoothMessagesEnum";
import { BluetoothErrorEnum } from "../models/enums/BluetoothErrorEnum";

export const bluetoothManager = new BleManager();

const scanningFinished = new Subject<boolean>();
export const scanningFinished$ = scanningFinished.asObservable();

const bluetoothDevices = new BehaviorSubject<Device[]>([]);
export const bluetoothDevices$ = bluetoothDevices.asObservable();

const connectingFinishedSuccessfully = new Subject<boolean>();
export const connectingFinishedSuccessfully$ =
  connectingFinishedSuccessfully.asObservable();

const deviceHasDisconnected = new Subject<boolean>();
export const deviceHasDisconnected$ = deviceHasDisconnected.asObservable();

const connectedDeviceCharacteristic =
  new BehaviorSubject<Characteristic | null>(null);
export const connectedDeviceCharacteristic$ =
  connectedDeviceCharacteristic.asObservable();

const connectedDevice = new BehaviorSubject<Device | null>(null);
export const connectedDevice$ = connectedDevice.asObservable();

const currentMeasurement = new Subject<String>();
export const currentMeasurement$ = currentMeasurement.asObservable();

const measurementFinished = new Subject<boolean>();
export const measurementFinished$ = measurementFinished.asObservable();

const bluetoothError = new Subject<BluetoothErrorEnum>();
export const bluetoothError$ = bluetoothError.asObservable();

const isDuplicate = (device: Device): boolean => {
  return (
    bluetoothDevices.getValue().findIndex((d) => d.id === device.id) !== -1
  );
};

const isValid = (device: Device): boolean => {
  return !!device.name;
};

const scan = () => {
  bluetoothManager.startDeviceScan(null, null, (error, device) => {
    if (error) console.log(error);
    if (device) {
      if (!isDuplicate(device) && isValid(device)) {
        bluetoothDevices.next([...bluetoothDevices.getValue(), device]);
      }
    }
  });
};

const handleScan = (duration: number) => {
  requestLocationPermission()
    .pipe(
      take(1),
      filter((permission) => permission === PermissionsAndroid.RESULTS.GRANTED)
    )
    .subscribe((_) => {
      scan();
      setTimeout(() => {
        bluetoothManager.stopDeviceScan();
        scanningFinished.next(true);
      }, duration);
    });
};

export const scanBluetoothDevices = (duration: number) => {
  const subscription = bluetoothManager.onStateChange((state) => {
    if (state === "PoweredOn") {
      handleScan(duration);
      subscription.remove();
    }
  }, true);

  return bluetoothDevices$;
};

export const requestLocationPermission = () => {
  if (Platform.OS === "android" && Platform.Version >= 23) {
    // Scanning: Checking permissions...
    const enabled = PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    if (!enabled) {
      // Scanning: Permissions disabled, showing...
      const granted = PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        // Scanning: Permissions not granted, aborting...
        return;
      }
    }
  }
  return from(
    // if (Platform.OS === "android" && Platform.Version >= 23) {
    //   // Scanning: Checking permissions...
    //   const enabled = PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    //   if (!enabled) {
    //     // Scanning: Permissions disabled, showing...
    //     const granted = PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    //     if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
    //       // Scanning: Permissions not granted, aborting...
    //       return;
    //     }
    //   }
    // }
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Location permission for bluetooth scanning",
        message: "wahtever",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    )
  ).pipe(
    tap((result) => {
      result === PermissionsAndroid.RESULTS.GRANTED
        ? console.log("Location permission for bluetooth scanning granted")
        : console.log("Location permission for bluetooth scanning revoked");
    })
  );
};

export const connectDeviceById = (deviceId: string) => {
  console.log("Connecting device...");
  return from(
    bluetoothManager
      .devices([deviceId])
      .then((devices) =>
        devices.length > 0 ? connectDevice(devices[0]) : Promise.reject()
      )
  );
};

const connectDevice = (device: Device) => {
  return device
    .isConnected()
    .then((isConnected) => {
      if (isConnected) {
        connectingFinishedSuccessfully.next(true);
        return device;
      } else {
        return device
          .connect()
          .then((d) => d.discoverAllServicesAndCharacteristics())
          .then((d) =>
            d.readCharacteristicForService(
              "4fafc201-1fb5-459e-8fcc-c5c9c331914b",
              "beb5483e-36e1-4688-b7f5-ea07361b26a8"
            )
          )
          .then((characteristic) => {
            connectedDevice.next(device);
            connectedDeviceCharacteristic.next(characteristic);
            connectingFinishedSuccessfully.next(true);
            device.onDisconnected(() => {
              connectedDevice.next(null);
              deviceHasDisconnected.next(true);
            });
            return device;
          })
          .catch((_) =>
            bluetoothError.next(BluetoothErrorEnum.CONNECTING_ERROR)
          );
      }
    })
    .catch((_) => bluetoothError.next(BluetoothErrorEnum.CONNECTING_ERROR));
};

export const setupWiredDetectors = (detectors: DetectorData[]) => {
  let message = BluetoothMessagesEnum.SET_WIRED.toString();
  detectors.forEach(
    (detector) =>
      (message += (parseInt(detector.socketIndex) - 1).toString() + ",")
  );

  console.log("Writing: ", message);

  return from(
    connectedDeviceCharacteristic.getValue()
      ? connectedDeviceCharacteristic
          .getValue()!
          .writeWithoutResponse(encode(message))
          .catch((_) => bluetoothError.next(BluetoothErrorEnum.WRITING_ERROR))
      : Promise.reject()
  );
};

export const startMeasurement = () => {
  connectedDeviceCharacteristic
    .getValue()
    ?.writeWithoutResponse(encode(BluetoothMessagesEnum.START.toString()))
    .then((characteristic) =>
      interval(200)
        .pipe(
          takeUntil(measurementFinished$),
          finalize(() => stop(characteristic))
        )
        .subscribe((_) => measure(characteristic))
    )
    .catch((_) => bluetoothError.next(BluetoothErrorEnum.WRITING_ERROR));

  return currentMeasurement$;
};

export const stopMeasurement = () => {
  measurementFinished.next(true);
};

const measure = (characteristic: Characteristic) => {
  characteristic
    .read()
    .then((characteristic) =>
      currentMeasurement.next(decode(characteristic.value))
    )
    .catch((_) => bluetoothError.next(BluetoothErrorEnum.READING_ERROR));
};

const stop = (characteristic: Characteristic) => {
  characteristic
    .writeWithoutResponse(encode(BluetoothMessagesEnum.STOP.toString()))
    .catch((_) => bluetoothError.next(BluetoothErrorEnum.WRITING_ERROR));
};
