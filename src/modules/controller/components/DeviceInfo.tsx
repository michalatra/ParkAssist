import React from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "../../../styles/styles";
import { BluetoothDeviceData } from "../../../models/BluetoothDeviceData";
import { ConnectionStatus } from "../../../models/enums/ConnectionStatus";

interface DeviceInfoProps {
  device: BluetoothDeviceData | null;
  loading: boolean;
  connectionStatus: ConnectionStatus;
  onConnect: () => void;
  onDisconnect: () => void;
  onFindNewDevice: () => void;
}
const DeviceInfo = ({
  device,
  loading,
  connectionStatus,
  onConnect,
  onDisconnect,
  onFindNewDevice,
}: DeviceInfoProps) => {
  return (
    <View style={styles.centeredContainer}>
      <View style={styles.deviceInfoContainer}>
        <View style={styles.deviceInfoTitleContainer}>
          <Text style={styles.deviceInfoTitle}>Detectors Status</Text>
        </View>
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
              <Text style={styles.deviceInfoItemText}>{connectionStatus}</Text>
              {connectionStatus === ConnectionStatus.DISCONNECTED ||
              connectionStatus === ConnectionStatus.CONNECTING ? (
                <TouchableOpacity onPress={onConnect}>
                  <Image
                    source={require("../../../assets/icons/refresh.png")}
                    style={styles.deviceInfoRefreshIcon}
                  />
                </TouchableOpacity>
              ) : null}
              <TouchableOpacity onPress={onDisconnect}>
                <Image
                  source={require("../../../assets/icons/trash.png")}
                  style={styles.deviceInfoRefreshIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default DeviceInfo;
