import { TouchableOpacity, Image, Text } from "react-native";
import { styles } from "../../../../styles/styles";
import { Device } from "react-native-ble-plx";

const DeviceTile = (props: { device: Device; onSelect: any }) => {
  return (
    <TouchableOpacity style={styles.deviceTile} onPress={props.onSelect}>
      <Image
        style={styles.deviceTileIcon}
        source={require("../../../../assets/icons/cpu.png")}
      />
      <Text style={styles.deviceTileName}>{props.device.name}</Text>
      <Image
        style={styles.deviceTileIcon}
        source={require("../../../../assets/icons/chevron-right.png")}
      />
    </TouchableOpacity>
  );
};

export default DeviceTile;
