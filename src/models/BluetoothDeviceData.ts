import { ConnectionStatus } from "./enums/ConnectionStatus";

export interface BluetoothDeviceData {
  name: string;
  id: string;
  status?: ConnectionStatus;
}
