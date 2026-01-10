import { scaleHeight } from '../../../theme';
import type { ColorTypes } from '../../../theme';
import { getThemeColors } from '../../../utils';
import type { AppearanceMode } from '../../../theme';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';

export type ItemListProps = {
  leftElement: React.ReactNode | React.ReactElement;
  rightElement: React.ReactNode | React.ReactElement;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  theme?: AppearanceMode;
};

const ItemList = ({
  leftElement,
  rightElement,
  style,
  onPress,
  theme = 'light',
}: ItemListProps) => {
  const colors = getThemeColors(theme);
  const styles = createStyles(colors);

  return onPress ? (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      {leftElement}
      {rightElement}
    </TouchableOpacity>
  ) : (
    <View style={[styles.container, style]}>
      {leftElement}
      {rightElement}
    </View>
  );
};

const createStyles = (_colors: ColorTypes) =>
  StyleSheet.create({
    container: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: scaleHeight(6),
    },
    pressed: {
      opacity: 0.5,
    },
  });

export default ItemList;
