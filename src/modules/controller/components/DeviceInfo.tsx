import { View, Image, Text } from "react-native";
import { BluetoothDeviceData } from "../../../models/BluetoothDeviceData";
import { styles } from "../../../styles/styles";

const DeviceInfo = (params: { device: BluetoothDeviceData }) => {
  return (
    <View style={styles.deviceInfoContainer}>
      <Text style={styles.deviceInfoTitle}>Device Info</Text>
      <View style={styles.deviceInfoItem}>
        <Image
          style={styles.deviceInfoItemIcon}
          source={require("../../../assets/icons/cpu.png")}
        />
        <Text style={styles.deviceInfoItemText}>{params.device.name}</Text>
      </View>
      <View style={styles.deviceInfoItem}>
        <Image
          style={styles.deviceInfoItemIcon}
          source={require("../../../assets/icons/status.png")}
        />
        <Text style={styles.deviceInfoItemText}>{params.device.status}</Text>
      </View>
    </View>
  );
};

export default DeviceInfo;
