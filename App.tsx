import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import WelcomeScreen from "./src/modules/welcome/components/welcomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DeviceSearchScreen from "./src/modules/devicesSearch/components/deviceSearchScreen";

const NavigationStack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <NavigationStack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
        }}
      >
        <NavigationStack.Screen name="Welcome" component={WelcomeScreen} />
        <NavigationStack.Screen
          name="DeviceSearch"
          component={DeviceSearchScreen}
        />
      </NavigationStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
