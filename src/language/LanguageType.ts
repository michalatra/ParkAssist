import { LanguageEnum } from "./LanguageEnum";
import { ConnectionStatus } from "../models/enums/ConnectionStatus";
import { DetectorLocationEnum } from "../models/enums/DetectorLocationEnum";
import { DetectorLocationTypeEnum } from "../models/enums/DetectorLocationTypeEnum";

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
      SINGLE_POINT_LIDAR: string;
      MULTI_POINT_LIDAR: string;
    };
    DETECTOR_COUNT: string;
    ADD_NEW_DETECTOR: string;
    EDIT_DETECTOR: string;
    ADD: string;
    SET_NAME: string;
    SELECT_DETECTOR_TYPE: string;
    SELECT_LOCATION_TYPE: string;
    SELECT_LOCATION: string;
    SELECT_SOCKET: string;
    LOCATION_TYPE: {
      FRONT: string;
      BACK: string;
    };
    LOCATION: {
      LEFT: string;
      RIGHT: string;
      CENTER_LEFT: string;
      CENTER_RIGHT: string;
    };
    DETECTORS: {
      ULTRA_SONIC: string;
      SINGLE_POINT_LIDAR: string;
      MULTI_POINT_LIDAR: string;
    };
    LOCATION_IDX: {
      [DetectorLocationEnum.LEFT]: string;
      [DetectorLocationEnum.CENTER_LEFT]: string;
      [DetectorLocationEnum.CENTER_RIGHT]: string;
      [DetectorLocationEnum.RIGHT]: string;
    };
    LOCATION_TYPE_IDX: {
      [DetectorLocationTypeEnum.FRONT]: string;
      [DetectorLocationTypeEnum.BACK]: string;
    };
    NO_DETECTORS: string;
  };

  CONTROLLER: {
    INSTRUCTION: string;
    BEGIN_PARKING: string;
    DETECTOR_STATUS: string;
    NOT_CONFIGURED: string;
    CONNECTION_STATUS: {
      [ConnectionStatus.CONNECTED]: string;
      [ConnectionStatus.CONNECTING]: string;
      [ConnectionStatus.DISCONNECTED]: string;
    };
    DISCONNECT: string;
    REFRESH: string;
  };

  SETTINGS: {
    INSTRUCTION: string;
    GENERAL: string;
    SETUP_DETECTORS: string;
    SETUP_BLUETOOTH_CONNECTION: string;
    RESET_APPLICATION: string;
  };

  MEASUREMENT: {
    STOP_MEASUREMENT: string;
  };
};

export type AppLanguageType = {
  [key in keyof typeof LanguageEnum]: LanguageType;
};
