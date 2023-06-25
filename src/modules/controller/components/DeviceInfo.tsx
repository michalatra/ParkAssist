import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../../styles/styles";
import { BluetoothDeviceData } from "../../../models/BluetoothDeviceData";
import { ConnectionStatus } from "../../../models/enums/ConnectionStatus";
import useLanguage from "../../../language/LanguageHook";

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
  const LANGUAGE = useLanguage();

  return (
    <View style={styles.centeredContainer}>
      <View style={styles.deviceInfoContainer}>
        <View style={styles.deviceInfoHeader}>
          <View style={styles.deviceInfoHeaderIconContainer}>
            <Image
              style={styles.deviceInfoHeaderIcon}
              source={require("../../../assets/icons/controller.png")}
            />
          </View>
          <View style={styles.deviceInfoTitleContainer}>
            <Text style={styles.deviceInfoTitle}>
              {LANGUAGE ? LANGUAGE.CONTROLLER.DETECTOR_STATUS : ""}
            </Text>
          </View>
        </View>
        <View style={styles.deviceInfoItemsContainer}>
          <View style={styles.deviceInfoItem}>
            <View style={styles.deviceInfoItemIconContainer}>
              <Image
                style={styles.deviceInfoItemIcon}
                source={require("../../../assets/icons/cpu.png")}
              />
            </View>
            <Text style={styles.deviceInfoItemText}>
              {device
                ? device.name
                : LANGUAGE
                ? LANGUAGE.CONTROLLER.NOT_CONFIGURED
                : ""}
            </Text>
          </View>
          <View style={styles.deviceInfoItem}>
            <View style={styles.deviceInfoItemIconContainer}>
              <Image
                style={styles.deviceInfoItemIcon}
                source={require("../../../assets/icons/status.png")}
              />
            </View>
            <Text style={styles.deviceInfoItemText}>
              {LANGUAGE
                ? LANGUAGE.CONTROLLER.CONNECTION_STATUS[
                    loading ? ConnectionStatus.CONNECTING : connectionStatus
                  ]
                : connectionStatus}
            </Text>
          </View>
        </View>
        <View style={styles.deviceInfoActions}>
          <TouchableOpacity
            style={
              connectionStatus !== ConnectionStatus.CONNECTED && !loading
                ? styles.deviceInfoActionContainer
                : styles.deviceInfoActionContainerDisabled
            }
            onPress={onConnect}
            disabled={
              connectionStatus === ConnectionStatus.CONNECTED || loading
            }
          >
            <Image
              source={require("../../../assets/icons/refresh.png")}
              style={
                connectionStatus !== ConnectionStatus.CONNECTED && !loading
                  ? styles.deviceInfoActionIcon
                  : styles.deviceInfoActionIconDisabled
              }
            />
            <Text
              style={
                connectionStatus !== ConnectionStatus.CONNECTED && !loading
                  ? styles.deviceInfoActionText
                  : styles.deviceInfoActionTextDisabled
              }
            >
              {LANGUAGE ? LANGUAGE.CONTROLLER.REFRESH : ""}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              connectionStatus === ConnectionStatus.CONNECTED && !loading
                ? styles.deviceInfoActionContainer
                : styles.deviceInfoActionContainerDisabled
            }
            disabled={
              connectionStatus !== ConnectionStatus.CONNECTED || loading
            }
            onPress={onDisconnect}
          >
            <Image
              source={require("../../../assets/icons/power-off.png")}
              style={
                connectionStatus === ConnectionStatus.CONNECTED && !loading
                  ? styles.deviceInfoActionIcon
                  : styles.deviceInfoActionIconDisabled
              }
            />
            <Text
              style={
                connectionStatus === ConnectionStatus.CONNECTED && !loading
                  ? styles.deviceInfoActionText
                  : styles.deviceInfoActionTextDisabled
              }
            >
              {LANGUAGE ? LANGUAGE.CONTROLLER.DISCONNECT : ""}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DeviceInfo;
