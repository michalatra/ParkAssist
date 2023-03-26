import { TouchableOpacity, Image, Text } from "react-native";
import { styles } from "../../../../../styles/styles";
import { Device } from "react-native-ble-plx";

interface DeviceTileProps {
  device: Device;
  isSelected: boolean;
  onSelect: any;
}

const DeviceTile = ({ device, isSelected, onSelect }: DeviceTileProps) => {
  return (
    <TouchableOpacity
      style={isSelected ? styles.deviceTileActive : styles.deviceTile}
      onPress={onSelect}
    >
      <Image
        style={isSelected ? styles.deviceTileIconActive : styles.deviceTileIcon}
        source={require("../../../../../assets/icons/cpu.png")}
      />
      <Text
        style={isSelected ? styles.deviceTileNameActive : styles.deviceTileName}
      >
        {device.name}
      </Text>
    </TouchableOpacity>
  );
};

export default DeviceTile;
