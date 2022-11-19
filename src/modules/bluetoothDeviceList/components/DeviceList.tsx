import { ScrollView } from "react-native";
import DeviceTile from "./DeviceTile";
import { Device } from "react-native-ble-plx";

const DeviceList = (props: { devices: Device[]; onSelect: any }) => {
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
