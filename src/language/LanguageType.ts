import { LanguageEnum } from "./LanguageEnum";

export type LanguageType = {
  NAVIGATION: {
    TITLE: string;
  };

  INITIAL: {
    APP_TITLE: string;
    APP_SLOGAN: string;
    SETUP_BUTTON: string;
  };

  CONNECTION_METHOD: {
    BLUETOOTH: string;
    WIFI: string;
    INSTRUCTION: string;
    CONTINUE: string;
  };

  BLUETOOTH_SETUP: {
    SCAN_INIT: {
      INSTRUCTION: string;
      SUB_INSTRUCTION: string;
      BEGIN_SCAN: string;
    };

    SCAN_RESULT: {
      INSTRUCTION: string;
      CONNECT: string;
    };

    CONNECTION_ATTEMPT: {
      INSTRUCTION: string;
    };
  };

  DETECTORS_SETUP: {
    INSTRUCTION: string;
    SAVE: string;
    DETECTOR_TYPE: {
      ULTRA_SONIC: string;
      INFRARED: string;
      LIDAR: string;
    };
    DETECTOR_COUNT: string;
  };

  CONTROLLER: {
    INSTRUCTION: string;
    BEGIN_PARKING: string;
  };
};

export type AppLanguageType = {
  [key in keyof typeof LanguageEnum]: LanguageType;
};
