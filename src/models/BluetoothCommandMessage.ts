import { BluetoothCommandEnum } from "./enums/BluetoothCommandEnum";

export interface BluetoothCommandMessage {
  command: BluetoothCommandEnum;
  detectorCount?: number;
  socketIndices?: number[];
  detectorIds?: number[];
}
