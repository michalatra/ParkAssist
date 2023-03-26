import { Image, Text, TouchableOpacity, View } from "react-native";
import ButtonData from "../../models/ButtonData";
import { styles } from "../../styles/styles";

const ActionButton = ({ title, action, disabled }: ButtonData) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        disabled={disabled}
        style={disabled ? styles.buttonDisabled : styles.button}
        onPress={action}
      >
        <Text style={disabled ? styles.buttonTextDisabled : styles.buttonText}>
          {title}
        </Text>
        <Image
          source={require("../../assets/icons/arrow-right.png")}
          style={disabled ? styles.buttonIconDisabled : styles.buttonIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ActionButton;
