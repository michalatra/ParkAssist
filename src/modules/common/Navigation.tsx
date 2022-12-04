import { View, Text, Image, TouchableOpacity } from "react-native";
import { ScreenNamesEnum } from "../../models/enums/ScreenNamesEnum";
import { styles } from "../../styles/styles";

type Props = { title: string; navigation: any };

const Navigation = ({ title, navigation }: Props) => {
  return (
    <View style={styles.navigationContainer}>
      <TouchableOpacity
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
