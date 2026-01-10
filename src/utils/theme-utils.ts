import { DARK_COLORS, LIGHT_COLORS } from '../theme';
import type { ColorTypes, AppearanceMode } from '../theme';
import React from 'react';
import type { ImageRequireSource, ImageURISource } from 'react-native';

export const isImageSource = (
  icon: ImageURISource | ImageRequireSource | undefined
): icon is ImageURISource => {
  // Check if it's a number (ImageRequireSource)
  if (typeof icon === 'number') {
    return true;
  }
  // Check if it's a non-null object with a string 'uri' property (ImageURISource)
  if (
    typeof icon === 'object' &&
    icon !== null &&
    typeof icon.uri === 'string'
  ) {
    return true;
  }
  // Otherwise, it's not a valid image source we're checking for
  return false;
};

export const isReactElement = (icon: unknown): icon is React.ReactElement => {
  return React.isValidElement(icon);
};

export const getThemeColors = (theme: AppearanceMode): ColorTypes => {
  return theme === 'dark' ? DARK_COLORS : LIGHT_COLORS;
};
