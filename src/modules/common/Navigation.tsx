import { View, Text, Image, TouchableOpacity } from "react-native";
import { ScreenNamesEnum } from "../../models/enums/ScreenNamesEnum";
import { styles } from "../../styles/styles";

type Props = { title: string; navigation: any; showSettings: boolean };

const Navigation = ({ title, navigation, showSettings }: Props) => {
  return (
    <View style={styles.navigationContainer}>
      <TouchableOpacity
        style={navigation.canGoBack() ? null : styles.hidden}
        onPress={() => {
          if (navigation.canGoBack()) {
            navigation.goBack();
          }
        }}
      >
        <Image
          style={styles.navigationIcon}
          source={require("../../assets/icons/chevron-left.png")}
        />
      </TouchableOpacity>
      <Text style={styles.navigationTitle}>{title}</Text>
      <TouchableOpacity
        style={showSettings ? null : styles.hidden}
        onPress={() => navigation.navigate(ScreenNamesEnum.SETTINGS)}
      >
        <Image
          style={styles.navigationIcon}
          source={require("../../assets/icons/settings.png")}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Navigation;
