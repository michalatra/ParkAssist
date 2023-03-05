import React from "react";
import { styles } from "../../styles/styles";
import Svg, { Path } from "react-native-svg";
import { Dimensions, View } from "react-native";
import { ColorsEnum } from "../../models/enums/ColorsEnum";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

interface WavyBackgroundProps {
  color: ColorsEnum;
}

const WavyBackground = ({ color }: WavyBackgroundProps) => {
  return (
    <View style={styles.wavesContainer}>
      <Svg style={styles.waves} viewBox={`0 0 ${windowWidth} ${windowHeight}`}>
        <Path
          fill={color}
          d="M0,96L30,122.7C60,149,120,203,180,208C240,213,300,171,360,160C420,149,480,171,540,202.7C600,235,660,277,720,282.7C780,288,840,256,900,234.7C960,213,1020,203,1080,218.7C1140,235,1200,277,1260,298.7C1320,320,1380,320,1410,320L1440,320L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
        />
      </Svg>
      <View style={[styles.wavesFooter, { backgroundColor: color }]} />
    </View>
  );
};

export default WavyBackground;
