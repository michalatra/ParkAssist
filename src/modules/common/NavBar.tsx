import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../styles/styles";
import useLanguage from "../../language/LanguageHook";
import { ScreenNamesEnum } from "../../models/enums/ScreenNamesEnum";

interface NavBarProps {
  navigation: any;
  showSettings: boolean;
  showHelp: boolean;
}

const NavBar = ({ navigation, showSettings, showHelp }: NavBarProps) => {
  const LANGUAGE = useLanguage();

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
        {navigation.canGoBack() ? (
          <TouchableOpacity
            style={[styles.navActionContainer, styles.navActionContainerLeft]}
            onPress={onNavigateBack}
          >
            <Image
              source={require("../../assets/icons/arrow-back.png")}
              style={styles.navIcon}
            />
          </TouchableOpacity>
        ) : null}
        <View style={styles.navLogoContainer}>
          <Text style={styles.navLogo}>
            {LANGUAGE ? LANGUAGE.NAVIGATION.TITLE : null}
          </Text>
        </View>
      </View>
      <View style={styles.navActionsContainer}>
        {showHelp ? (
          <TouchableOpacity
            style={[styles.navActionContainer, styles.navActionContainerRight]}
          >
            <Image
              source={require("../../assets/icons/question.png")}
              style={styles.navIcon}
            />
          </TouchableOpacity>
        ) : null}
        {showSettings ? (
          <TouchableOpacity
            style={[styles.navActionContainer, styles.navActionContainerRight]}
            onPress={onNavigateSettings}
          >
            <Image
              source={require("../../assets/icons/settings.png")}
              style={styles.navIcon}
            />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export default NavBar;
