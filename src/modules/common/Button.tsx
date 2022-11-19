import { StyleSheet, Text, TouchableOpacity } from "react-native";
import ButtonData from "../../models/buttonData";

const Button = (props: ButtonData) => {
  const styles = StyleSheet.create({
    btn: {
      backgroundColor: props.backgroundColor,
      borderRadius: 20,
      paddingHorizontal: 50,
      paddingVertical: 20,
    },
    btnText: {
      color: "#FFF",
      fontSize: 20,
      fontWeight: "bold",
    },
  });

  return (
    <TouchableOpacity style={styles.btn} onPress={props.action}>
      <Text style={styles.btnText}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
