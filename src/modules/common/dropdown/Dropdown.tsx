import React from "react";
import { View } from "react-native";
import { DropdownItemData } from "../../../models/DropdownItemData";
import { styles } from "../../../styles/styles";
import DropdownItem from "./components/DropdownItem";

interface DropdownProps {
  isOpened: boolean;
  onToggle: () => void;
  items: DropdownItemData[];
  selectedItemIdx: number;
}

const Dropdown = ({
  isOpened,
  onToggle,
  items,
  selectedItemIdx,
}: DropdownProps) => {
  return (
    <View style={styles.dropdown}>
      <DropdownItem item={{ ...items[selectedItemIdx], action: onToggle }} />
      {isOpened && (
        <View style={styles.dropdownContent}>
          {items.map((item, idx) => (
            <View style={styles.dropdownItemContainer}>
              <DropdownItem item={item} key={idx} />
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default Dropdown;
