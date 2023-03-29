import InitialScreen from "./src/modules/initial/InitialScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BluetoothScanInitScreen from "./src/modules/setup/bluetoothSetup/bluetoothScanInit/BluetoothScanInitScreen";
import BluetoothScanResultsScreen from "./src/modules/setup/bluetoothSetup/bluetoothScanResults/BluetoothScanResultsScreen";
import BluetoothConnectionAttemptScreen from "./src/modules/setup/bluetoothSetup/bluetoothConnectionAttempt/BluetoothConnectionAttemptScreen";
import ControllerScreen from "./src/modules/controller/ControllerScreen";
import SettingsScreen from "./src/modules/settings/SettingsScreen";
import { ToastProvider } from "react-native-toast-notifications";
import SelectConnectionMethodScreen from "./src/modules/setup/connectionMethodSetup/SelectConnectionMethodScreen";
import { ScreenNamesEnum } from "./src/models/enums/ScreenNamesEnum";
import MeasurementScreen from "./src/modules/measurement/MeasurementScreen";
import GlobalErrorHandler from "./src/modules/errorHandler/GlobalErrorHandler";
import InitialLoadingScreen from "./src/modules/loading/InitialLoadingScreen";
import { enableScreens } from "react-native-screens";
import DetectorsSetupScreen from "./src/modules/setup/detectorsSetup/DetectorsSetupScreen";
import DetectorsGroupDetailsScreen from "./src/modules/setup/detectorsSetup/components/detectorsGroupDetails/DetectorsGroupDetailsScreen";
import AddEditDetectorScreen from "./src/modules/setup/detectorsSetup/components/addEditDetector/AddEditDetectorScreen";

const NavigationStack = createNativeStackNavigator();

const App = () => {
  enableScreens();
  return (
    <ToastProvider>
      <GlobalErrorHandler>
        <NavigationContainer>
          <NavigationStack.Navigator
            initialRouteName={ScreenNamesEnum.INITIAL_LOADING}
            // detachInactiveScreens={true}
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
              name={ScreenNamesEnum.BLUETOOTH_SCAN_INIT}
              component={BluetoothScanInitScreen}
            />
            <NavigationStack.Screen
              name={ScreenNamesEnum.BLUETOOTH_SCAN_RESULTS}
              component={BluetoothScanResultsScreen}
            />
            <NavigationStack.Screen
              name={ScreenNamesEnum.BLUETOOTH_CONNECTION_ATTEMPT}
              component={BluetoothConnectionAttemptScreen}
            />
            <NavigationStack.Screen
              name={ScreenNamesEnum.DETECTORS_SETUP}
              component={DetectorsSetupScreen}
            />
            <NavigationStack.Screen
              name={ScreenNamesEnum.DETECTORS_GROUP_DETAILS}
              component={DetectorsGroupDetailsScreen}
            />
            <NavigationStack.Screen
              name={ScreenNamesEnum.ADD_EDIT_DETECTOR_SCREEN}
              component={AddEditDetectorScreen}
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
