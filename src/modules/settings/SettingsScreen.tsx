import React from "react";
import { ScrollView, Text, View } from "react-native";
import { styles } from "../../styles/styles";
import { SettingsTileIconEnum } from "../../models/enums/SettingsTileIconEnum";
import { ScreenNamesEnum } from "../../models/enums/ScreenNamesEnum";
import { SettingsSectionData } from "../../models/SettingsSectionData";
import SettingsSection from "./components/SettingsSection";
import Button from "../common/Button";
import { ColorsEnum } from "../../models/enums/ColorsEnum";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NavBar from "../common/NavBar";
import WavyBackground from "../common/WavyBackground";
import useLanguage from "../../language/LanguageHook";
import { showToast } from "../../services/ToastService";
import { ToastType } from "../../models/enums/ToastType";
import { NotificationEnum } from "../../models/enums/NotificationEnum";

const sections: SettingsSectionData[] = [
  {
    title: "GENERAL",
    tiles: [
      {
        icon: SettingsTileIconEnum.SCAN_BLUETOOTH,
        title: "SETUP_BLUETOOTH_CONNECTION",
        path: ScreenNamesEnum.BLUETOOTH_SCAN_INIT,
      },
      {
        icon: SettingsTileIconEnum.WIRED_DETECTORS,
        title: "SETUP_DETECTORS",
        path: ScreenNamesEnum.DETECTORS_SETUP,
      },
    ],
  },
];
const SettingsScreen = ({ navigation }: any) => {
  const LANGUAGE = useLanguage();
  const onNavigate = (screenName: ScreenNamesEnum) => {
    navigation.navigate(screenName, { returnScreen: ScreenNamesEnum.SETTINGS });
  };

  const handleResetApplication = () => {
    AsyncStorage.clear().then(() => {
      showToast(NotificationEnum.CACHE_CLEARED, ToastType.SUCCESS);
      navigation.navigate(ScreenNamesEnum.INITIAL);
    });
  };

  return (
    <View style={styles.initContainer}>
      <WavyBackground color={ColorsEnum.BACKGROUND_MEDIUM} />
      <NavBar
        navigation={navigation}
        showSettings={false}
        showHelp={false}
        showLanguage={true}
      />
      <View style={styles.layoutContainer}>
        <View style={styles.instructionContainer}>
          <Text style={styles.instructionText}>
            {LANGUAGE ? LANGUAGE.SETTINGS.INSTRUCTION : ""}
          </Text>
        </View>
        <ScrollView
          style={styles.settingsSectionListContainer}
          contentContainerStyle={styles.settingsSectionList}
        >
          {sections.map((section) => (
            <SettingsSection
              key={section.title}
              sectionData={section}
              onNavigate={onNavigate}
              icon={require("../../assets/icons/settings.png")}
            />
          ))}
          <Button
            backgroundColor={ColorsEnum.BLUE_DARK}
            title={LANGUAGE ? LANGUAGE.SETTINGS.RESET_APPLICATION : ""}
            action={handleResetApplication}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default SettingsScreen;
