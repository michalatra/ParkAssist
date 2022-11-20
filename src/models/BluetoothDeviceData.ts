import { BluetoothDeviceStatusEnum } from "./enums/BluetoothDeviceStatusEnum";

export interface BluetoothDeviceData {
  name: string;
  id: string;
  status: BluetoothDeviceStatusEnum;
}
