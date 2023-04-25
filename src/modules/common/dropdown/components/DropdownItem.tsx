import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import { styles } from "../../../../styles/styles";
import { DropdownItemData } from "../../../../models/DropdownItemData";

interface DropdownItemProps {
  item: DropdownItemData;
}

const DropdownItem = ({ item }: DropdownItemProps) => {
  return (
    <TouchableOpacity style={styles.dropdownItem} onPress={item.action}>
      {item.icon && (
        <Image style={styles.dropdownItemIcon} source={item.icon!} />
      )}
      <Text style={styles.dropdownItemLabel}>{item.label}</Text>
    </TouchableOpacity>
  );
};

export default DropdownItem;
