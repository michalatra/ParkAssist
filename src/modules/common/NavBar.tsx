import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../styles/styles";
import useLanguage from "../../language/LanguageHook";
import { ScreenNamesEnum } from "../../models/enums/ScreenNamesEnum";
import useSelectedLanguage from "../../language/SelectedLanguageHook";
import { LanguageEnum } from "../../language/LanguageEnum";
import { setLanguage } from "../../language/Language";
import Dropdown from "./dropdown/Dropdown";
import { DropdownItemData } from "../../models/DropdownItemData";

interface NavBarProps {
  navigation: any;
  showLanguage: boolean;
  showSettings: boolean;
  showHelp: boolean;
}

const NavBar = ({
  navigation,
  showLanguage = false,
  showSettings = false,
  showHelp = false,
}: NavBarProps) => {
  const LANGUAGE = useLanguage();
  const selectedLanguage = useSelectedLanguage();
  const [languageDropdownOpened, setLanguageDropdownOpened] = useState(false);

  const languageDropdownItems: DropdownItemData[] = [
    {
      label: "PL",
      value: "PL",
      icon: require("../../assets/icons/PL.png"),
      action: () => onChangeLanguage(LanguageEnum.PL),
    },
    {
      label: "EN",
      value: "EN",
      icon: require("../../assets/icons/EN.png"),
      action: () => onChangeLanguage(LanguageEnum.EN),
    },
  ];

  const onChangeLanguage = (language: LanguageEnum) => {
    onToggleLanguageDropdown();
    setLanguage(language);
  };

  const onToggleLanguageDropdown = () => {
    setLanguageDropdownOpened(!languageDropdownOpened);
  };

  const onNavigateBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const onNavigateSettings = () => {
    navigation.navigate(ScreenNamesEnum.SETTINGS);
  };

  return (
    <View style={styles.navContainer}>
      <View style={styles.navActionsContainer}>
        {navigation.canGoBack() && (
          <TouchableOpacity
            style={[styles.navActionContainer, styles.navActionContainerLeft]}
            onPress={onNavigateBack}
          >
            <Image
              source={require("../../assets/icons/arrow-back.png")}
              style={styles.navIcon}
            />
          </TouchableOpacity>
        )}
        <View style={styles.navLogoContainer}>
          <Text style={styles.navLogo}>
            {LANGUAGE ? LANGUAGE.NAVIGATION.TITLE : null}
          </Text>
        </View>
      </View>
      <View style={styles.navActionsContainer}>
        {showHelp && (
          <TouchableOpacity
            style={[styles.navActionContainer, styles.navActionContainerRight]}
          >
            <Image
              source={require("../../assets/icons/question.png")}
              style={styles.navIcon}
            />
          </TouchableOpacity>
        )}
        {showLanguage && (
          <View
            style={[styles.navActionContainer, styles.navActionContainerRight]}
          >
            <Dropdown
              isOpened={languageDropdownOpened}
              onToggle={onToggleLanguageDropdown}
              items={languageDropdownItems}
              selectedItemIdx={selectedLanguage === LanguageEnum.PL ? 0 : 1}
            />
          </View>
        )}
        {showSettings && (
          <TouchableOpacity
            style={[styles.navActionContainer, styles.navActionContainerRight]}
            onPress={onNavigateSettings}
          >
            <Image
              source={require("../../assets/icons/settings.png")}
              style={styles.navIcon}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default NavBar;
