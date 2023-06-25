import React from "react";
import { View, Text, Image } from "react-native";
import { ScreenNamesEnum } from "../../../models/enums/ScreenNamesEnum";
import { styles } from "../../../styles/styles";
import SettingsSectionTile from "./SettingsSectionTile";
import { SettingsSectionData } from "../../../models/SettingsSectionData";
import useLanguage from "../../../language/LanguageHook";
interface SectionProps {
  sectionData: SettingsSectionData;
  onNavigate: (screenName: ScreenNamesEnum) => void;
  icon: any;
}
const SettingsSection = ({ sectionData, onNavigate, icon }: SectionProps) => {
  const LANGUAGE = useLanguage();

  return (
    <View style={styles.settingsSection}>
      <View style={styles.settingsSectionHeader}>
        <View style={styles.settingsSectionHeaderIconContainer}>
          <Image style={styles.settingsSectionHeaderIcon} source={icon} />
        </View>
        <Text style={styles.settingsSectionTitle}>
          {LANGUAGE
            ? LANGUAGE.SETTINGS[
                sectionData.title as keyof typeof LANGUAGE.SETTINGS
              ]
            : ""}
        </Text>
      </View>
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
