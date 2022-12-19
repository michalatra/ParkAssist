import { ScreenNamesEnum } from "./enums/ScreenNamesEnum";
import { SettingsTileIconEnum } from "./enums/SettingsTileIconEnum";

export interface SettingsSectionTileData {
  icon: SettingsTileIconEnum;
  title: string;
  path: ScreenNamesEnum;
}
