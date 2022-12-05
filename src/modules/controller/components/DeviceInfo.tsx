import React from "react";
import { View, Image, Text, ActivityIndicator } from "react-native";
import { styles } from "../../../styles/styles";

const DeviceInfo = ({ device, loading }: any) => {
  return (
    <View style={styles.deviceInfoContainer}>
      <Text style={styles.deviceInfoTitle}>Detectors Status</Text>
      {loading ? (
        <ActivityIndicator />
      ) : device ? (
        <View style={styles.deviceInfoItemsContainer}>
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
        </View>
      ) : null}
    </View>
  );
};

export default DeviceInfo;
