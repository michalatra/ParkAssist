import { BehaviorSubject } from "rxjs";
import { LanguageEnum } from "./LanguageEnum";
import { AppLanguageType, LanguageType } from "./LanguageType";
import { ConnectionStatus } from "../models/enums/ConnectionStatus";
import { DetectorLocationEnum } from "../models/enums/DetectorLocationEnum";
import { DetectorLocationTypeEnum } from "../models/enums/DetectorLocationTypeEnum";
import { ToastType } from "../models/enums/ToastType";
import { ErrorEnum } from "../models/enums/ErrorEnum";
import { BluetoothErrorEnum } from "../models/enums/BluetoothErrorEnum";
import { CommandResultEnum } from "../models/enums/CommandResultEnum";
import { NotificationEnum } from "../models/enums/NotificationEnum";

const LANGUAGES: AppLanguageType = {
  PL: {
    NAVIGATION: {
      TITLE: "SPOT.SAVER",
    },
    INITIAL: {
      APP_TITLE: "Spot Saver",
      APP_SLOGAN: "Znajdź swoje miejsce, bezstresowo.",
      SETUP_BUTTON: "Zaczynajmy!",
    },
    CONNECTION_METHOD: {
      BLUETOOTH: "Bluetooth",
      WIFI: "WiFi",
      INSTRUCTION: "Wybierz sposób połączenia",
      CONTINUE: "Kontynuujmy",
    },
    BLUETOOTH_SETUP: {
      SCAN_INIT: {
        INSTRUCTION: "Włącz Bluetooth i zacznijmy skanowanie",
        SUB_INSTRUCTION: "Spróbujemy znaleźć Twoje urządzenie",
        BEGIN_SCAN: "Rozpocznij skanowanie",
      },
      SCAN_RESULT: {
        INSTRUCTION: "Wybierz swoje urządzenie",
        CONNECT: "Połącz",
      },
      CONNECTION_ATTEMPT: {
        INSTRUCTION: "Próbujemy połączyć się z Twoim urządzeniem",
      },
    },
    DETECTORS_SETUP: {
      INSTRUCTION: "Skonfiguruj swoje czujniki",
      SAVE: "Zapisz",
      DETECTOR_TYPE: {
        ULTRA_SONIC: "Czujniki ultradźwiękowe",
        SINGLE_POINT_LIDAR: "Lidar jednopunktowy",
        MULTI_POINT_LIDAR: "Lidar wielopunktowy",
      },
      DETECTOR_COUNT: "Liczba czujników",
      ADD_NEW_DETECTOR: "Dodaj nowy czujnik",
      EDIT_DETECTOR: "Edytuj parametry czujnika",
      ADD: "Dodaj",
      SET_NAME: "Ustaw nazwę czujnika",
      SELECT_DETECTOR_TYPE: "Wybierz typ czujnika",
      SELECT_LOCATION_TYPE: "Wybierz typ lokalizacji",
      SELECT_LOCATION: "Wybierz lokalizację czujnika",
      SELECT_SOCKET: "Wybierz gniazdo",
      LOCATION_TYPE: {
        FRONT: "Przód",
        BACK: "Tył",
      },
      LOCATION: {
        LEFT: "Lewo",
        RIGHT: "Prawo",
        CENTER_LEFT: "Lewy Środek",
        CENTER_RIGHT: "Prawy Środek",
      },
      DETECTORS: {
        ULTRA_SONIC: "Ultradźwięki",
        SINGLE_POINT_LIDAR: "Lidar jednopunktowy",
        MULTI_POINT_LIDAR: "Lidar wielopunktowy",
      },

      LOCATION_IDX: {
        [DetectorLocationEnum.LEFT]: "Lewy",
        [DetectorLocationEnum.CENTER_LEFT]: "Lewy Środek",
        [DetectorLocationEnum.CENTER_RIGHT]: "Prawy Środek",
        [DetectorLocationEnum.RIGHT]: "Prawy",
      },
      LOCATION_TYPE_IDX: {
        [DetectorLocationTypeEnum.FRONT]: "Przód",
        [DetectorLocationTypeEnum.BACK]: "Tył",
      },
      NO_DETECTORS: "Brak czujników",
    },
    CONTROLLER: {
      INSTRUCTION: "Witaj! Gdzie dziś parkujesz?",
      BEGIN_PARKING: "Rozpocznij parkowanie",
      DETECTOR_STATUS: "Status kontrolera",
      NOT_CONFIGURED: "Nie skonfigurowano",
      CONNECTION_STATUS: {
        [ConnectionStatus.CONNECTED]: "Połączono",
        [ConnectionStatus.CONNECTING]: "Łączenie",
        [ConnectionStatus.DISCONNECTED]: "Rozłączono",
      },
      DISCONNECT: "Rozłącz",
      REFRESH: "Odśwież",
    },
    SETTINGS: {
      INSTRUCTION: "Ustawienia",
      GENERAL: "Ogólne",
      SETUP_DETECTORS: "Konfiguracja czujników",
      SETUP_BLUETOOTH_CONNECTION: "Konfiguracja połączenia bluetooth",
      RESET_APPLICATION: "Zresetuj aplikację",
    },
    MEASUREMENT: {
      STOP_MEASUREMENT: "Zakończ pomiar",
    },
    TOAST: {
      [ToastType.SUCCESS]: {
        [NotificationEnum.CACHE_CLEARED]: "Pamięć podręczna wyczyszczona",
        [NotificationEnum.CONNECTED_SUCCESSFULLY]: "Połączono pomyślnie",
      },
      [ToastType.DANGER]: {
        [ErrorEnum.BLUETOOTH_INIT_ERROR]:
          "Wystąpił błąd podczas inicjalizacji Bluetooth",
        [ErrorEnum.CONNECTION_ATTEMPT_ERROR]:
          "Wystąpił błąd podczas próby połączenia",
        [ErrorEnum.DEVICE_NOT_CONNECTED]: "Urządzenie nie jest połączone",
        [ErrorEnum.WIFI_NOT_IMPLEMENTED]:
          "Połączenie WiFi nie jest jeszcze zaimplementowane",
        [ErrorEnum.DEVICE_HAS_DISCONNECTED]: "Urządzenie zostało rozłączone",
        [ErrorEnum.CONNECTING_FAILED]: "Nie udało się połączyć",
        [BluetoothErrorEnum.SCAN_ERROR]: "Wystąpił błąd podczas skanowania",
        [BluetoothErrorEnum.NOT_INITIALIZED_ERROR]:
          "Bluetooth nie jest zainicjalizowany",
        [BluetoothErrorEnum.PERMISSION_ERROR]: "Brak uprawnień do Bluetooth",
        [BluetoothErrorEnum.POWER_ON_ERROR]:
          "Wystąpił błąd podczas włączania Bluetooth",
        [BluetoothErrorEnum.WRITING_ERROR]:
          "Wystąpił błąd podczas wysyłania danych",
        [BluetoothErrorEnum.READING_ERROR]:
          "Wystąpił błąd podczas odczytywania danych",
        [BluetoothErrorEnum.CONNECTING_ERROR]: "Wystąpił błąd podczas łączenia",
        [BluetoothErrorEnum.CONNECTION_ERROR]: "Wystąpił błąd połączenia",
        [BluetoothErrorEnum.DISCONNECTING_ERROR]:
          "Wystąpił błąd podczas rozłączania",
        [BluetoothErrorEnum.STOP_MEASUREMENT_ERROR]:
          "Nie można zakończyć pomiaru",
        [BluetoothErrorEnum.START_MEASUREMENT_ERROR]:
          "Nie można rozpocząć pomiaru",
        [BluetoothErrorEnum.DETECTOR_SETUP_ERROR]:
          "Nie można skonfigurować czujników",
        [BluetoothErrorEnum.MEASUREMENT_ERROR]: "Wystąpił błąd podczas pomiaru",
        [BluetoothErrorEnum.LIDAR_SETUP_ERROR]:
          "Nie można skonfigurować lidaru",
        [BluetoothErrorEnum.LUNA_SETUP_ERROR]: "Nie można skonfigurować luny",
        [BluetoothErrorEnum.ULTRASONIC_SETUP_ERROR]:
          "Nie można skonfigurować czujników ultradźwiękowych",

        [CommandResultEnum.ERROR]: "Wystąpił błąd",
        [CommandResultEnum.ACTION_NOT_NECESSARY]: "Operacja nie jest konieczna",
        [CommandResultEnum.I2C_ERROR]: "Wykryto błąd I2C",
        [CommandResultEnum.LIDAR_ERROR]: "Wykryto błąd lidaru",
        [CommandResultEnum.LIDAR_RESOLUTION_ERROR]:
          "Wykryto błąd ustawienia rozdzielczości",
        [CommandResultEnum.LIDAR_RANGING_MODE_ERROR]:
          "Wykryto błąd ustawienia trybu pomiaru",
        [CommandResultEnum.LIDAR_POWER_MODE_ERROR]:
          "Wykryto błąd ustawienia trybu zasilania",
        [CommandResultEnum.LIDAR_INTEGRATION_TIME_ERROR]:
          "Wykryto błąd ustawienia czasu integracji",
        [CommandResultEnum.LIDAR_SHARPENER_ERROR]:
          "Wykryto błąd ustawienia ostrości",
        [CommandResultEnum.LIDAR_TARGET_ORDER_ERROR]:
          "Wykryto błąd ustawienia kolejności celu",
        [CommandResultEnum.LIDAR_RANGING_ERROR]: "Wykryto błąd pomiaru",
        [CommandResultEnum.LIDAR_MEASUREMENT_ERROR]: "Wykryto błąd pomiaru",
        [CommandResultEnum.LUNA_MEASUREMENT_ERROR]: "Wykryto błąd pomiaru",
        [CommandResultEnum.NO_DETECTORS_CONFIGURED_ERROR]:
          "Wykryto błąd konfiguracji czujników",
        [CommandResultEnum.BLUETOOTH_ERROR]: "Wykryto błąd Bluetooth",
      },
      [ToastType.WARNING]: {
        DEVICE_DISCONNECTED: "Urządzenie zostało rozłączone",
      },
    },
  },
  EN: {
    NAVIGATION: {
      TITLE: "SPOT.SAVER",
    },
    INITIAL: {
      APP_TITLE: "Spot Saver",
      APP_SLOGAN: "Find your space, stress-free.",
      SETUP_BUTTON: "Let's Start!",
    },
    CONNECTION_METHOD: {
      BLUETOOTH: "Bluetooth",
      WIFI: "WiFi",
      INSTRUCTION: "Choose connection method",
      CONTINUE: "Continue",
    },
    BLUETOOTH_SETUP: {
      SCAN_INIT: {
        INSTRUCTION: "Turn on Bluetooth and start scanning",
        SUB_INSTRUCTION: "We'll try to find your device",
        BEGIN_SCAN: "Begin scanning",
      },
      SCAN_RESULT: {
        INSTRUCTION: "Select your device",
        CONNECT: "Connect",
      },
      CONNECTION_ATTEMPT: {
        INSTRUCTION: "We're trying to connect to your device",
      },
    },
    DETECTORS_SETUP: {
      INSTRUCTION: "Configure your detectors",
      SAVE: "Save",
      DETECTOR_TYPE: {
        ULTRA_SONIC: "Ultrasonic Detectors",
        SINGLE_POINT_LIDAR: "Single-point Lidar",
        MULTI_POINT_LIDAR: "Multi-point Lidar",
      },
      DETECTOR_COUNT: "Detector count",
      ADD_NEW_DETECTOR: "Add new detector",
      EDIT_DETECTOR: "Edit detector parameters",
      ADD: "Add",
      SET_NAME: "Set detector name",
      SELECT_DETECTOR_TYPE: "Select detector type",
      SELECT_LOCATION_TYPE: "Select location type",
      SELECT_LOCATION: "Select detector location",
      SELECT_SOCKET: "Select socket",
      LOCATION_TYPE: {
        FRONT: "Front",
        BACK: "Back",
      },
      LOCATION: {
        LEFT: "Left",
        RIGHT: "Right",
        CENTER_LEFT: "Center left",
        CENTER_RIGHT: "Center right",
      },
      DETECTORS: {
        ULTRA_SONIC: "Ultrasonic",
        SINGLE_POINT_LIDAR: "Single-point Lidar",
        MULTI_POINT_LIDAR: "Multi-point Lidar",
      },
      LOCATION_IDX: {
        [DetectorLocationEnum.LEFT]: "Left",
        [DetectorLocationEnum.CENTER_LEFT]: "Center left",
        [DetectorLocationEnum.CENTER_RIGHT]: "Center right",
        [DetectorLocationEnum.RIGHT]: "Right",
      },
      LOCATION_TYPE_IDX: {
        [DetectorLocationTypeEnum.FRONT]: "Front",
        [DetectorLocationTypeEnum.BACK]: "Back",
      },
      NO_DETECTORS: "No detectors",
    },
    CONTROLLER: {
      INSTRUCTION: "Welcome! Where are you parking today?",
      BEGIN_PARKING: "Begin parking",
      DETECTOR_STATUS: "Controller status",
      NOT_CONFIGURED: "Not configured",
      CONNECTION_STATUS: {
        [ConnectionStatus.CONNECTED]: "Connected",
        [ConnectionStatus.CONNECTING]: "Connecting",
        [ConnectionStatus.DISCONNECTED]: "Disconnected",
      },
      DISCONNECT: "Disconnect",
      REFRESH: "Refresh",
    },
    SETTINGS: {
      INSTRUCTION: "Settings",
      GENERAL: "General",
      SETUP_DETECTORS: "Detectors setup",
      SETUP_BLUETOOTH_CONNECTION: "Bluetooth connection setup",
      RESET_APPLICATION: "Reset application",
    },
    MEASUREMENT: {
      STOP_MEASUREMENT: "Stop measurement",
    },
    TOAST: {
      [ToastType.SUCCESS]: {
        [NotificationEnum.CACHE_CLEARED]: "Cache has been cleared",
        [NotificationEnum.CONNECTED_SUCCESSFULLY]: "Connected successfully",
      },
      [ToastType.DANGER]: {
        [ErrorEnum.BLUETOOTH_INIT_ERROR]:
          "Bluetooth initialization error occurred",
        [ErrorEnum.CONNECTION_ATTEMPT_ERROR]:
          "Connection attempt error occurred",
        [ErrorEnum.DEVICE_NOT_CONNECTED]: "Device is not connected",
        [ErrorEnum.WIFI_NOT_IMPLEMENTED]: "WiFi connection is not implemented",
        [ErrorEnum.DEVICE_HAS_DISCONNECTED]: "Device has disconnected",
        [ErrorEnum.CONNECTING_FAILED]: "Connecting has failed",
        [BluetoothErrorEnum.SCAN_ERROR]: "Scan error occurred",
        [BluetoothErrorEnum.NOT_INITIALIZED_ERROR]: "Bluetooth not initialized",
        [BluetoothErrorEnum.PERMISSION_ERROR]: "Permission error occurred",
        [BluetoothErrorEnum.POWER_ON_ERROR]:
          "An error occurred while turning on Bluetooth",
        [BluetoothErrorEnum.WRITING_ERROR]:
          "An error occurred while sending data",
        [BluetoothErrorEnum.READING_ERROR]:
          "An error occurred while reading data",
        [BluetoothErrorEnum.CONNECTING_ERROR]:
          "An error occurred while connecting",
        [BluetoothErrorEnum.CONNECTION_ERROR]: "Connection failed",
        [BluetoothErrorEnum.DISCONNECTING_ERROR]:
          "Device disconnection error occurred",
        [BluetoothErrorEnum.STOP_MEASUREMENT_ERROR]:
          "An error occurred while stopping the measurement",
        [BluetoothErrorEnum.START_MEASUREMENT_ERROR]:
          "Could not start measurement",
        [BluetoothErrorEnum.DETECTOR_SETUP_ERROR]:
          "An error occurred while setting up detectors",
        [BluetoothErrorEnum.MEASUREMENT_ERROR]:
          "An error occurred while measuring",
        [BluetoothErrorEnum.LIDAR_SETUP_ERROR]: "Could not set up lidar",
        [BluetoothErrorEnum.LUNA_SETUP_ERROR]: "Could not set up luna",
        [BluetoothErrorEnum.ULTRASONIC_SETUP_ERROR]:
          "Could not set up ultrasonic",
        [CommandResultEnum.ERROR]: "An error occurred",
        [CommandResultEnum.ACTION_NOT_NECESSARY]: "Action not necessary",
        [CommandResultEnum.I2C_ERROR]: "I2C error occurred",
        [CommandResultEnum.LIDAR_ERROR]: "Lidar error occurred",
        [CommandResultEnum.LIDAR_RESOLUTION_ERROR]:
          "LiDAR resolution error occurred",
        [CommandResultEnum.LIDAR_RANGING_MODE_ERROR]:
          "LiDAR ranging mode error occurred",
        [CommandResultEnum.LIDAR_POWER_MODE_ERROR]:
          "LiDAR power mode error occurred",
        [CommandResultEnum.LIDAR_INTEGRATION_TIME_ERROR]:
          "LiDAR integration time error occurred",
        [CommandResultEnum.LIDAR_SHARPENER_ERROR]:
          "LiDAR sharpener error occurred",
        [CommandResultEnum.LIDAR_TARGET_ORDER_ERROR]:
          "LiDAR target order error occurred",
        [CommandResultEnum.LIDAR_RANGING_ERROR]: "LiDAR ranging error occurred",
        [CommandResultEnum.LIDAR_MEASUREMENT_ERROR]:
          "LiDAR measurement error occurred",
        [CommandResultEnum.LUNA_MEASUREMENT_ERROR]:
          "Luna measurement error occurred",
        [CommandResultEnum.NO_DETECTORS_CONFIGURED_ERROR]:
          "No detectors configured",
        [CommandResultEnum.BLUETOOTH_ERROR]: "Bluetooth error occurred",
      },
      [ToastType.WARNING]: {
        DEVICE_DISCONNECTED: "Device disconnected",
      },
    },
  },
};

const language = new BehaviorSubject<LanguageType>(LANGUAGES.PL);
export const language$ = language.asObservable();

const selectedLanguage = new BehaviorSubject<LanguageEnum>(LanguageEnum.PL);
export const selectedLanguage$ = selectedLanguage.asObservable();

export const setLanguage = (lang: LanguageEnum): void => {
  selectedLanguage.next(lang);
  language.next(LANGUAGES[lang]);
};
