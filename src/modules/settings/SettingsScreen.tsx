import React from "react";
import { ScrollView, View } from "react-native";
import Navigation from "../common/Navigation";
import { styles } from "../../styles/styles";
import { SettingsTileIconEnum } from "../../models/enums/SettingsTileIconEnum";
import { ScreenNamesEnum } from "../../models/enums/ScreenNamesEnum";
import { SettingsSectionData } from "../../models/SettingsSectionData";
import SettingsSection from "./components/SettingsSection";
import Button from "../common/Button";
import { ColorsEnum } from "../../models/enums/ColorsEnum";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useToast } from "react-native-toast-notifications";

const sections: SettingsSectionData[] = [
  {
    title: "Detectors Settings",
    tiles: [
      {
        icon: SettingsTileIconEnum.SCAN_BLUETOOTH,
        title: "Scan bluetooth devices",
        path: ScreenNamesEnum.BLUETOOTH_SCAN_INIT,
      },
      {
        icon: SettingsTileIconEnum.WIRED_DETECTORS,
        title: "Setup wired detectors",
        path: ScreenNamesEnum.DETECTORS_SETUP,
      },
    ],
  },
];
const SettingsScreen = ({ navigation }: any) => {
  const toast = useToast();
  const onNavigate = (screenName: ScreenNamesEnum) => {
    navigation.navigate(screenName, { returnScreen: ScreenNamesEnum.SETTINGS });
  };

  const handleClearCache = () => {
    AsyncStorage.clear().then(() => {
      toast.show("Cache cleared", { type: "success" });
      navigation.navigate(ScreenNamesEnum.INITIAL);
    });
  };

  return (
    <View style={styles.container}>
      <Navigation
        title="Settings"
        navigation={navigation}
        showSettings={false}
      />
      <ScrollView
        style={styles.settingsSectionListContainer}
        contentContainerStyle={styles.settingsSectionList}
      >
        {sections.map((section) => (
          <SettingsSection
            key={section.title}
            sectionData={section}
            onNavigate={onNavigate}
          />
        ))}
        <Button
          backgroundColor={ColorsEnum.BLUE_DARK}
          title="Clear Cache"
          action={handleClearCache}
        />
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;
