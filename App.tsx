import InitialScreen from "./src/modules/initial/InitialScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BluetoothSearchInitScreen from "./src/modules/bluetoothSetup/bluetoothSearchInit/BluetoothSearchInitScreen";
import BluetoothSearchResultsScreen from "./src/modules/bluetoothSetup/bluetoothSearchResults/BluetoothSearchResultsScreen";
import BluetoothConnectionAttemptScreen from "./src/modules/bluetoothSetup/bluetoothConnectionAttempt/BluetoothConnectionAttemptScreen";
import ControllerScreen from "./src/modules/controller/ControllerScreen";
import SettingsScreen from "./src/modules/settings/SettingsScreen";
import { ToastProvider } from "react-native-toast-notifications";
import SelectConnectionMethodScreen from "./src/modules/selectConnectionMethod/SelectConnectionMethodScreen";
import { ScreenNamesEnum } from "./src/models/enums/ScreenNamesEnum";
import DetectorsQuantitySetupScreen from "./src/modules/detectorsSetup/detectorsQuantitySetup/DetectorsQuantitySetupScreen";
import DetectorsLocationSetupScreen from "./src/modules/detectorsSetup/detectorsLocationSetup/DetectorsLocationSetupScreen";
import MeasurementScreen from "./src/modules/measurement/MeasurementScreen";
import GlobalErrorHandler from "./src/modules/errorHandler/GlobalErrorHandler";
import InitialLoadingScreen from "./src/modules/loading/InitialLoadingScreen";
import DetectorsSocketSetupScreen from "./src/modules/detectorsSetup/detectorsSocketSetup/DetectorsSocketSetupScreen";

const NavigationStack = createNativeStackNavigator();

const App = () => {
  return (
    <ToastProvider>
      <GlobalErrorHandler>
        <NavigationContainer>
          <NavigationStack.Navigator
            initialRouteName={ScreenNamesEnum.INITIAL_LOADING}
            screenOptions={{
              headerShown: false,
            }}
          >
            <NavigationStack.Screen
              name={ScreenNamesEnum.INITIAL_LOADING}
              component={InitialLoadingScreen}
            />
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
              name={ScreenNamesEnum.DETECTORS_SOCKET_SETUP}
              component={DetectorsSocketSetupScreen}
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
};

export default App;
