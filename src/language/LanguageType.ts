import { LanguageEnum } from "./LanguageEnum";
import { ConnectionStatus } from "../models/enums/ConnectionStatus";
import { DetectorLocationEnum } from "../models/enums/DetectorLocationEnum";
import { DetectorLocationTypeEnum } from "../models/enums/DetectorLocationTypeEnum";
import { ToastType } from "../models/enums/ToastType";
import { ErrorEnum } from "../models/enums/ErrorEnum";
import { BluetoothErrorEnum } from "../models/enums/BluetoothErrorEnum";
import { CommandResultEnum } from "../models/enums/CommandResultEnum";
import { NotificationEnum } from "../models/enums/NotificationEnum";

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

  TOAST: {
    [ToastType.SUCCESS]: {
      [NotificationEnum.CACHE_CLEARED]: string;
      [NotificationEnum.CONNECTED_SUCCESSFULLY]: string;
    };
    [ToastType.DANGER]: {
      [ErrorEnum.BLUETOOTH_INIT_ERROR]: string;
      [ErrorEnum.CONNECTION_ATTEMPT_ERROR]: string;
      [ErrorEnum.DEVICE_NOT_CONNECTED]: string;
      [ErrorEnum.WIFI_NOT_IMPLEMENTED]: string;
      [ErrorEnum.DEVICE_HAS_DISCONNECTED]: string;
      [ErrorEnum.CONNECTING_FAILED]: string;
      [BluetoothErrorEnum.SCAN_ERROR]: string;
      [BluetoothErrorEnum.NOT_INITIALIZED_ERROR]: string;
      [BluetoothErrorEnum.PERMISSION_ERROR]: string;
      [BluetoothErrorEnum.POWER_ON_ERROR]: string;
      [BluetoothErrorEnum.WRITING_ERROR]: string;
      [BluetoothErrorEnum.READING_ERROR]: string;
      [BluetoothErrorEnum.CONNECTING_ERROR]: string;
      [BluetoothErrorEnum.CONNECTION_ERROR]: string;
      [BluetoothErrorEnum.DISCONNECTING_ERROR]: string;
      [BluetoothErrorEnum.STOP_MEASUREMENT_ERROR]: string;
      [BluetoothErrorEnum.START_MEASUREMENT_ERROR]: string;
      [BluetoothErrorEnum.DETECTOR_SETUP_ERROR]: string;
      [BluetoothErrorEnum.MEASUREMENT_ERROR]: string;
      [BluetoothErrorEnum.LIDAR_SETUP_ERROR]: string;
      [BluetoothErrorEnum.LUNA_SETUP_ERROR]: string;
      [BluetoothErrorEnum.ULTRASONIC_SETUP_ERROR]: string;
      [CommandResultEnum.ERROR]: string;
      [CommandResultEnum.ACTION_NOT_NECESSARY]: string;
      [CommandResultEnum.I2C_ERROR]: string;
      [CommandResultEnum.LIDAR_ERROR]: string;
      [CommandResultEnum.LIDAR_RESOLUTION_ERROR]: string;
      [CommandResultEnum.LIDAR_RANGING_MODE_ERROR]: string;
      [CommandResultEnum.LIDAR_POWER_MODE_ERROR]: string;
      [CommandResultEnum.LIDAR_INTEGRATION_TIME_ERROR]: string;
      [CommandResultEnum.LIDAR_SHARPENER_ERROR]: string;
      [CommandResultEnum.LIDAR_TARGET_ORDER_ERROR]: string;
      [CommandResultEnum.LIDAR_RANGING_ERROR]: string;
      [CommandResultEnum.LIDAR_MEASUREMENT_ERROR]: string;
      [CommandResultEnum.LUNA_MEASUREMENT_ERROR]: string;
      [CommandResultEnum.NO_DETECTORS_CONFIGURED_ERROR]: string;
      [CommandResultEnum.BLUETOOTH_ERROR]: string;
    };
    [ToastType.WARNING]: {
      DEVICE_DISCONNECTED: string;
    };
  };
};

export type AppLanguageType = {
  [key in keyof typeof LanguageEnum]: LanguageType;
};
