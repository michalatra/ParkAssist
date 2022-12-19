import React from "react";
import { RefreshControl, ScrollView, Text, View } from "react-native";
import DeviceTile from "./DeviceTile";
import { Device } from "react-native-ble-plx";
import { styles } from "../../../../styles/styles";
import { ColorsEnum } from "../../../../models/enums/ColorsEnum";

interface DeviceListProps {
  devices: Device[];
  onSelect: any;
  refreshing: boolean;
  onRefresh: any;
}

const DeviceList = ({
  devices,
  onSelect,
  refreshing,
  onRefresh,
}: DeviceListProps) => {
  return (
    <ScrollView
      contentContainerStyle={styles.bluetoothDeviceList}
      style={styles.w100}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[ColorsEnum.BLUE_DARK, ColorsEnum.GREEN_DARK]}
          progressBackgroundColor={ColorsEnum.BACKGROUND_LIGHT}
        />
      }
    >
      <View
        style={[
          styles.bluetoothDeviceListContent,
          refreshing ? styles.bluetoothDeviceListContentRefresh : null,
        ]}
      >
        <ScrollView>
          {devices.map((device) => (
            <DeviceTile
              key={device.id}
              device={device}
              onSelect={() => onSelect(device)}
            />
          ))}
        </ScrollView>
        <View style={styles.instructionContainerStandalone}>
          <Text style={styles.instructionText}>Select your device</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default DeviceList;
