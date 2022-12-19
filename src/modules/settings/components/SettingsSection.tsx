import React from "react";
import { View, Text } from "react-native";
import { ScreenNamesEnum } from "../../../models/enums/ScreenNamesEnum";
import { styles } from "../../../styles/styles";
import SettingsSectionTile from "./SettingsSectionTile";
import { SettingsSectionData } from "../../../models/SettingsSectionData";
interface SectionProps {
  sectionData: SettingsSectionData;
  onNavigate: (screenName: ScreenNamesEnum) => void;
}
const SettingsSection = ({ sectionData, onNavigate }: SectionProps) => {
  return (
    <View style={styles.settingsSection}>
      <Text style={styles.settingsSectionTitle}>{sectionData.title}</Text>
      <View>
        {sectionData.tiles.map((tile) => (
          <SettingsSectionTile
            key={tile.title}
            tileDetails={tile}
            onSelect={onNavigate}
          />
        ))}
      </View>
    </View>
  );
};

export default SettingsSection;
