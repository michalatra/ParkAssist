import { BehaviorSubject } from "rxjs";
import { LanguageEnum } from "./LanguageEnum";
import { AppLanguageType, LanguageType } from "./LanguageType";

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
    },
    CONTROLLER: {
      INSTRUCTION: "Witaj! Gdzie dziś parkujesz?",
      BEGIN_PARKING: "Rozpocznij parkowanie",
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
    },
    CONTROLLER: {
      INSTRUCTION: "Welcome! Where are you parking today?",
      BEGIN_PARKING: "Begin parking",
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
