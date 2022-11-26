import InitialScreen from "./src/modules/initial/InitialScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BluetoothSearchInitScreen from "./src/modules/bluetoothSearchInit/BluetoothSearchInitScreen";
import BluetoothSearchResultsScreen from "./src/modules/bluetoothSearchResults/BluetoothSearchResultsScreen";
import BluetoothConnectionAttemptScreen from "./src/modules/bluetoothConnectionAttempt/BluetoothConnectionAttemptScreen";
import ControllerScreen from "./src/modules/controller/ControllerScreen";
import SettingsScreen from "./src/modules/settings/SettingsScreen";
import { ToastProvider } from "react-native-toast-notifications";
import SelectConnectionMethodScreen from "./src/modules/selectConnectionMethod/SelectConnectionMethodScreen";
import { ScreenNamesEnum } from "./src/models/enums/ScreenNamesEnum";
import DetectorsQuantitySetupScreen from "./src/modules/detectorsQuantitySetup/DetectorsQuantitySetupScreen";
import DetectorsLocationSetupScreen from "./src/modules/detectorsLocationSetup/DetectorsLocationSetupScreen";
import MeasurementScreen from "./src/modules/measurement/MeasurementScreen";
import GlobalErrorHandler from "./src/modules/errorHandler/GlobalErrorHandler";

const NavigationStack = createNativeStackNavigator();

export default function App() {
  return (
    <ToastProvider>
      <GlobalErrorHandler>
        <NavigationContainer>
          <NavigationStack.Navigator
            initialRouteName={ScreenNamesEnum.INITIAL}
            screenOptions={{
              headerShown: false,
            }}
          >
            <NavigationStack.Screen
              name={ScreenNamesEnum.INITIAL}
              component={InitialScreen}
            />
            <NavigationStack.Screen
              name={ScreenNamesEnum.SETTINGS}
              component={SettingsScreen}
            />
            <NavigationStack.Screen
              name={ScreenNamesEnum.CONNECTION_METHOD_SELECT}
              component={SelectConnectionMethodScreen}
            />
            <NavigationStack.Screen
              name={ScreenNamesEnum.BLUETOOTH_SEARCH_INIT}
              component={BluetoothSearchInitScreen}
            />
            <NavigationStack.Screen
              name={ScreenNamesEnum.BLUETOOTH_SEARCH_RESULTS}
              component={BluetoothSearchResultsScreen}
            />
            <NavigationStack.Screen
              name={ScreenNamesEnum.BLUETOOTH_CONNECTION_ATTEMPT}
              component={BluetoothConnectionAttemptScreen}
            />
            <NavigationStack.Screen
              name={ScreenNamesEnum.DETECTORS_QUANTITY_SETUP}
              component={DetectorsQuantitySetupScreen}
            />
            <NavigationStack.Screen
              name={ScreenNamesEnum.DETECTORS_LOCATION_SETUP}
              component={DetectorsLocationSetupScreen}
            />
            <NavigationStack.Screen
              name={ScreenNamesEnum.CONTROLLER}
              component={ControllerScreen}
            />
            <NavigationStack.Screen
              name={ScreenNamesEnum.MEASUREMENT}
              component={MeasurementScreen}
            />
          </NavigationStack.Navigator>
        </NavigationContainer>
      </GlobalErrorHandler>
    </ToastProvider>
  );
}
