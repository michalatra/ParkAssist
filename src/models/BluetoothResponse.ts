import { BluetoothCommandEnum } from "./enums/BluetoothCommandEnum";
import { CommandResultEnum } from "./enums/CommandResultEnum";

export interface BluetoothResponse {
  command: BluetoothCommandEnum;
  result: CommandResultEnum;
}
