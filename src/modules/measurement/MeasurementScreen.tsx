import React, { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { styles } from "../../styles/styles";
import Navigation from "../common/Navigation";
import Button from "../common/Button";
import { ColorsEnum } from "../../models/enums/ColorsEnum";
import {
  startMeasurement,
  stopMeasurement,
} from "../../services/BluetoothService";

const MeasurementScreen = ({ navigation }: any) => {
  const [measurement, setMeasurement] = useState<String>("");
  const onStop = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const subscription = startMeasurement().subscribe((currentMeasurement) =>
      setMeasurement(currentMeasurement)
    );

    return () => {
      subscription.unsubscribe();
      stopMeasurement();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Navigation title="Park Assist" navigation={navigation} />
      <View style={styles.measurementContainer}>
        <View style={styles.measurementRowContainer}></View>
        <Image
          style={styles.measurementCarImage}
          source={require("../../assets/icons/top_shot.png")}
        />
        <View style={styles.measurementRowContainer}></View>
        <View style={styles.instructionContainer}>
          <Text style={styles.instructionText}>{measurement}</Text>
        </View>
      </View>
      <Button
        backgroundColor={ColorsEnum.CORAL}
        title="Stop Measurement"
        action={onStop}
      />
    </View>
  );
};

export default MeasurementScreen;
