import { BluetoothDeviceStatusEnum } from "./enums/bluetoothDeviceStatusEnum";

export interface BluetoothDeviceData {
  name: string;
  id: string;
  status: BluetoothDeviceStatusEnum;
}
