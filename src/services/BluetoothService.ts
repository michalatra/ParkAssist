import { encode, decode } from "base-64";
import { BleManager, Characteristic, Device } from "react-native-ble-plx";
import { BehaviorSubject, Subject } from "rxjs";
import { PermissionsAndroid } from "react-native";

export const bluetoothManager = new BleManager();

const scanningFinished = new Subject<boolean>();
export const scanningFinished$ = scanningFinished.asObservable();

const bluetoothDevices = new BehaviorSubject<Device[]>([]);
export const bluetoothDevices$ = bluetoothDevices.asObservable();

const connectingFinishedSuccessfully = new Subject<boolean>();
export const connectingFinishedSuccessfully$ =
  connectingFinishedSuccessfully.asObservable();

const connectedDeviceCharacteristic =
  new BehaviorSubject<Characteristic | null>(null);
export const connectedDeviceCharacteristic$ =
  connectedDeviceCharacteristic.asObservable();

const currentMeasurement = new Subject<String>();
export const currentMeasurement$ = currentMeasurement.asObservable();

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
  const permission = requestLocationPermission();

  if (permission) {
    scan();
    setTimeout(() => {
      bluetoothManager.stopDeviceScan();
      scanningFinished.next(true);
    }, duration);
  }
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

export const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      {
        title: "Location permission for bluetooth scanning",
        message: "wahtever",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("Location permission for bluetooth scanning granted");
      return true;
    } else {
      console.log("Location permission for bluetooth scanning revoked");
      return false;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
};

export const connectDevice = (deviceId: string) => {
  bluetoothManager
    .devices([deviceId])
    .then((devices) => devices[0].connect())
    .then((d) => d.discoverAllServicesAndCharacteristics())
    .then((d) =>
      d.readCharacteristicForService(
        "4fafc201-1fb5-459e-8fcc-c5c9c331914b",
        "beb5483e-36e1-4688-b7f5-ea07361b26a8"
      )
    )
    .then((characteristic) => {
      connectedDeviceCharacteristic.next(characteristic);
      connectingFinishedSuccessfully.next(true);
    });
};

export const startMeasurement = () => {
  connectedDeviceCharacteristic
    .getValue()
    ?.writeWithoutResponse(encode("START"))
    .then((characteristic) =>
      setInterval(() => {
        measure(characteristic);
      }, 500)
    );
};

const measure = (characteristic: Characteristic) => {
  characteristic
    .read()
    .then((characteristic) => console.log(decode(characteristic.value)));
};
