import { StyleSheet, Text, View } from "react-native";
import InitialScreen from "./src/modules/initial/components/InitialScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BluetoothSearchScreen from "./src/modules/bluetoothSearch/components/BluetoothSearchScreen";
import BluetoothDeviceListScreen from "./src/modules/bluetoothDeviceList/components/BluetoothDeviceListScreen";
import ConnectingBluetoothDeviceScreen from "./src/modules/connectingBluetoothDevice/components/ConnectingBluetoothDeviceScreen";
import ControllerScreen from "./src/modules/controller/components/ControllerScreen";

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
        <NavigationStack.Screen
            name="Welcome"
            component={InitialScreen}
        />
        <NavigationStack.Screen
          name="DeviceSearch"
          component={BluetoothSearchScreen}
        />
        <NavigationStack.Screen
          name="DeviceFound"
          component={BluetoothDeviceListScreen}
        />
        <NavigationStack.Screen
          name="DeviceConnect"
          component={ConnectingBluetoothDeviceScreen}
        />
        <NavigationStack.Screen
          name="Main"
          component={ControllerScreen}
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
