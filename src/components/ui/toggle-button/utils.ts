import { colorVariables } from '../../../constants';
import { Platform } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';

/// Toggle Constants
export const CHILDREN_CONTAINER_MARGIN_TOP = 12;

// Toggle Types
export type ToggleSize = 'sm' | 'md' | 'lg';
export type ToggleItemValues = { [id: string | number]: boolean };

interface ToggleSizeStyles {
  width: number;
  height: number;
  borderRadius: number;
  thumbSize: number;
}

export type ToggleContainedMode = 'contained' | 'separated' | 'plain';
export type ToggleLabelPosition = 'left' | 'right' | 'hidden';

///---------------------Toggle Button-------------------------------
export const _getSizeStylesIOS = (size: ToggleSize): ToggleSizeStyles => {
  switch (size) {
    case 'sm':
      return {
        width: 38,
        height: 24,
        borderRadius: 25,
        thumbSize: 19,
      };
    case 'lg':
      return {
        width: 58,
        height: 54,
        borderRadius: 20,
        thumbSize: 28,
      };
    default:
      return {
        width: 50,
        height: 25,
        borderRadius: 20,
        thumbSize: 22,
      };
  }
};

export const _getSizeStylesAndroid = (size: ToggleSize): ToggleSizeStyles => {
  switch (size) {
    case 'sm':
      return {
        width: 36,
        height: 25,
        borderRadius: 20,
        thumbSize: 16,
      };
    case 'lg':
      return {
        width: 56,
        height: 36,
        borderRadius: 20,
        thumbSize: 26,
      };
    default:
      return {
        width: 50,
        height: 32,
        borderRadius: 20,
        thumbSize: 24,
      };
  }
};

const getSizeStyles = Platform.select({
  ios: _getSizeStylesIOS,
  android: _getSizeStylesAndroid,
  default: _getSizeStylesIOS,
});

///--------------------Toggle Button Contained-------------------------------
export const ITEM_CONTAINER_MARGIN_VERTICAL = 12;
export const ITEM_CONTAINER_MARGIN_HORIZONTAL = 12;
export const DIVIDER_CONTAINER_MARGIN = 16;

const listModeStyles: Record<ToggleContainedMode, StyleProp<ViewStyle>> = {
  contained: {
    borderColor: colorVariables.neutral_200,
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  plain: {},
  separated: {
    gap: 12,
  },
};

const itemToggleModeStyles: Record<
  ToggleContainedMode,
  StyleProp<ViewStyle>
> = {
  contained: {
    borderColor: colorVariables.neutral_200,
  },
  plain: {},
  separated: {
    borderRadius: 12,
    borderColor: colorVariables.neutral_200,
    borderWidth: 1,
  },
};

export { getSizeStyles, itemToggleModeStyles, listModeStyles };
