import InitialScreen from "./src/modules/initial/InitialScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BluetoothSearchScreen from "./src/modules/bluetoothSearch/BluetoothSearchScreen";
import BluetoothDeviceListScreen from "./src/modules/bluetoothDeviceList/BluetoothDeviceListScreen";
import ConnectingBluetoothDeviceScreen from "./src/modules/connectingBluetoothDevice/ConnectingBluetoothDeviceScreen";
import ControllerScreen from "./src/modules/controller/ControllerScreen";
import SettingsScreen from "./src/modules/settings/SettingsScreen";
import { ToastProvider } from "react-native-toast-notifications";

const NavigationStack = createNativeStackNavigator();

export default function App() {
  return (
    <ToastProvider>
      <NavigationContainer>
        <NavigationStack.Navigator
          initialRouteName="Welcome"
          screenOptions={{
            headerShown: false,
          }}
        >
          <NavigationStack.Screen name="Welcome" component={InitialScreen} />
          <NavigationStack.Screen name="Settings" component={SettingsScreen} />
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
          <NavigationStack.Screen name="Main" component={ControllerScreen} />
        </NavigationStack.Navigator>
      </NavigationContainer>
    </ToastProvider>
  );
}
