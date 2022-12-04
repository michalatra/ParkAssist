import React from "react";
import { View, Image, Text } from "react-native";
import { BluetoothDeviceData } from "../../../models/BluetoothDeviceData";
import { styles } from "../../../styles/styles";

const DeviceInfo = ({ device }: any) => {
  return (
    <View style={styles.deviceInfoContainer}>
      {device ? (
        <React.Fragment>
          <Text style={styles.deviceInfoTitle}>Device Info</Text>
          <View style={styles.deviceInfoItem}>
            <Image
              style={styles.deviceInfoItemIcon}
              source={require("../../../assets/icons/cpu.png")}
            />
            <Text style={styles.deviceInfoItemText}>{device.name}</Text>
          </View>
          <View style={styles.deviceInfoItem}>
            <Image
              style={styles.deviceInfoItemIcon}
              source={require("../../../assets/icons/status.png")}
            />
            <Text style={styles.deviceInfoItemText}>{device.status}</Text>
          </View>
        </React.Fragment>
      ) : null}
    </View>
  );
};

export default DeviceInfo;
