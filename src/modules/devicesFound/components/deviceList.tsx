import { ScrollView } from "react-native";
import { BluetoothDeviceData } from "../../../models/bluetoothDeviceData";
import DeviceTile from "./deviceTile";

const DeviceList = (props: {
  devices: BluetoothDeviceData[];
  onSelect: any;
}) => {
  return (
    <ScrollView>
      {props.devices.map((device) => (
        <DeviceTile
          key={device.id}
          device={device}
          onSelect={() => props.onSelect(device)}
        />
      ))}
    </ScrollView>
  );
};

export default DeviceList;
