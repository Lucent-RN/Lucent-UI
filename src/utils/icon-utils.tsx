import React from 'react';
import type { ImageSourcePropType } from 'react-native';
import { Image, View } from 'react-native';

/**
 * Icon source type - can be a string (for Ionicons), ReactNode, or ImageSource
 */
export type IconSource =
  | string
  | React.ReactNode
  | ImageSourcePropType
  | (() => React.ReactNode);

/**
 * Props for rendering an icon
 */
export interface IconProps {
  /**
   * Icon source - can be:
   * - String: Ionicons name (requires @expo/vector-icons)
   * - ReactNode: Custom React component
   * - ImageSourcePropType: Image source
   * - Function: Function that returns ReactNode
   */
  source: IconSource;
  /**
   * Size of the icon
   */
  size?: number;
  /**
   * Color of the icon (for Ionicons)
   */
  color?: string;
  /**
   * Tint color for image icons
   */
  tintColor?: string;
  /**
   * Style for the icon container
   */
  style?: any;
}

/**
 * Renders an icon based on the source type
 *
 * @example
 * // Ionicons (requires @expo/vector-icons)
 * <Icon source="checkmark-circle" size={24} color="#000" />
 *
 * // Custom ReactNode
 * <Icon source={<CustomIcon />} />
 *
 * // Image source
 * <Icon source={require('./icon.png')} size={24} />
 *
 * // Function
 * <Icon source={() => <CustomIcon />} />
 */
export const Icon: React.FC<IconProps> = ({
  source,
  size = 24,
  color,
  tintColor,
  style,
}) => {
  // If source is a function, call it
  if (typeof source === 'function') {
    return <>{source()}</>;
  }

  // If source is already a ReactNode
  if (React.isValidElement(source)) {
    return <>{source}</>;
  }

  // If source is an image
  if (typeof source === 'object' && source !== null && 'uri' in source) {
    return (
      <Image
        source={source as ImageSourcePropType}
        style={[{ width: size, height: size }, style]}
        resizeMode="contain"
        tintColor={tintColor}
      />
    );
  }

  // If source is a string, try to use Ionicons (if available)
  if (typeof source === 'string') {
    try {
      // Dynamic import to avoid breaking if @expo/vector-icons is not installed
      const Ionicons = require('@expo/vector-icons/Ionicons').default;
      return (
        <Ionicons
          name={source as any}
          size={size}
          color={color}
          style={style}
        />
      );
    } catch {
      // Fallback: render a placeholder if @expo/vector-icons is not available
      console.warn(
        '@expo/vector-icons is not installed. Please install it to use string icon names.'
      );
      return (
        <View
          style={[
            {
              width: size,
              height: size,
              backgroundColor: color || '#ccc',
              borderRadius: size / 2,
            },
            style,
          ]}
        />
      );
    }
  }

  // Fallback: render nothing
  return null;
};

/**
 * Helper function to create an Ionicons icon
 * This is a convenience function that wraps the Icon component
 */
export const createIoniconsIcon = (
  name: string,
  size: number = 24,
  color?: string
): React.ReactNode => {
  return <Icon source={name} size={size} color={color} />;
};

/**
 * Helper function to create an icon from an image source
 */
export const createImageIcon = (
  source: ImageSourcePropType,
  size: number = 24,
  tintColor?: string
): React.ReactNode => {
  return <Icon source={source} size={size} tintColor={tintColor} />;
};
