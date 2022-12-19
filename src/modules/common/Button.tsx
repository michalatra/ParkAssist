import { StyleSheet, Text, TouchableOpacity } from "react-native";
import ButtonData from "../../models/ButtonData";

const Button = (props: ButtonData) => {
  const styles = StyleSheet.create({
    btn: {
      backgroundColor: props.backgroundColor,
      borderRadius: 20,
      paddingHorizontal: 30,
      paddingVertical: 15,
      elevation: 20,
    },
    btnText: {
      color: "#FFF",
      fontSize: 14,
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
