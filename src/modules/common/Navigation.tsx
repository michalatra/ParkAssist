import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

type Props = { title: string; navigation: any };

const Navigation = ({ title, navigation }: Props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.iconTouchable}
        onPress={() => navigation.goBack()}
      >
        <Image
          style={styles.icon}
          source={require("../../assets/icons/chevron-left.png")}
        />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity
        style={styles.iconTouchable}
        onPress={() => navigation.navigate("Settings")}
      >
        <Image
          style={styles.icon}
          source={require("../../assets/icons/settings.png")}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "20%",
    padding: 10,
  },
  icon: {
    width: 20,
    height: "100%",
    resizeMode: "contain",
  },
  iconTouchable: {},
  title: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default Navigation;
