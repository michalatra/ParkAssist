import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import { styles } from "../../../styles/styles";
import { ScreenNamesEnum } from "../../../models/enums/ScreenNamesEnum";
import { SettingsSectionTileData } from "../../../models/SettingsSectionTileData";
import useLanguage from "../../../language/LanguageHook";

interface TileProps {
  tileDetails: SettingsSectionTileData;
  onSelect: (path: ScreenNamesEnum) => void;
}
const SettingsSectionTile = ({ tileDetails, onSelect }: TileProps) => {
  const LANGUAGE = useLanguage();

  return (
    <TouchableOpacity
      onPress={() => onSelect(tileDetails.path)}
      style={styles.settingsSectionTile}
    >
      <Text style={styles.settingsSectionTileText}>
        {LANGUAGE
          ? LANGUAGE.SETTINGS[
              tileDetails.title as keyof typeof LANGUAGE.SETTINGS
            ]
          : ""}
      </Text>
      <Image
        style={styles.settingsSectionTileIcon}
        source={require("../../../assets/icons/arrow-right.png")}
      />
    </TouchableOpacity>
  );
};

export default SettingsSectionTile;
