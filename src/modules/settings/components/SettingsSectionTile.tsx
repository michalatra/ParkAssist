import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import { styles } from "../../../styles/styles";
import { ScreenNamesEnum } from "../../../models/enums/ScreenNamesEnum";
import { SettingsSectionTileData } from "../../../models/SettingsSectionTileData";

interface TileProps {
  tileDetails: SettingsSectionTileData;
  onSelect: (path: ScreenNamesEnum) => void;
}
const SettingsSectionTile = ({ tileDetails, onSelect }: TileProps) => {
  return (
    <TouchableOpacity
      onPress={() => onSelect(tileDetails.path)}
      style={styles.settingsSectionTile}
    >
      <Text style={styles.settingsSectionTileText}>{tileDetails.title}</Text>
      <Image
        style={styles.settingsSectionTileIcon}
        source={require("../../../assets/icons/chevron-right.png")}
      />
    </TouchableOpacity>
  );
};

export default SettingsSectionTile;
