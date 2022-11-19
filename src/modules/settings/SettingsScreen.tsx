import React from "react";
import { View } from "react-native";
import Navigation from "../common/Navigation";
import { styles } from "../../styles/styles";

const SettingsScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Navigation title="Settings" navigation={navigation} />
    </View>
  );
};

export default SettingsScreen;
