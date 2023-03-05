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
        INFRARED: "Czujniki podczerwieni",
        LIDAR: "Lidar",
      },
      DETECTOR_COUNT: "Liczba czujników",
    },
    CONTROLLER: {
      INSTRUCTION: "Witaj! Gdzie dziś parkujesz?",
      BEGIN_PARKING: "Rozpocznij parkowanie",
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
        INFRARED: "Infrared Detectors",
        LIDAR: "Lidar",
      },
      DETECTOR_COUNT: "Detector count",
    },
    CONTROLLER: {
      INSTRUCTION: "Welcome! Where are you parking today?",
      BEGIN_PARKING: "Begin parking",
    },
  },
};

const language = new BehaviorSubject<LanguageType>(LANGUAGES.PL);
export const language$ = language.asObservable();

export const setLanguage = (lang: LanguageEnum): void => {
  language.next(LANGUAGES[lang]);
};
