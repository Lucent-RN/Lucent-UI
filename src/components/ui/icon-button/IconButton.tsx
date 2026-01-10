import React, { memo, useMemo } from 'react';
import {
  Image,
  type ImageSourcePropType,
  type ImageStyle,
  type StyleProp,
  StyleSheet,
  TouchableOpacity,
  type TouchableOpacityProps,
  type ViewStyle,
} from 'react-native';

type ImageResizeMode = 'contain' | 'cover' | 'stretch' | 'center' | 'repeat';

import { DARK_COLORS, LIGHT_COLORS } from '../../../theme';
import TextView from '../text-view';
import {
  getIconBtnDisabledIconStyles,
  getIconBtnDisabledStyles,
  getIconBtnSizeStyle,
  getIconBtnSizeTabletStyle,
  getIconBtnVariantStyles,
  getIconStyle,
  getIconStyleTablet,
} from './utils';
import type { IconButtonSize, IconButtonVariant } from './utils';

/**
 * Props for the {@link IconButton} component.
 */
export interface IconButtonProps
  extends Omit<TouchableOpacityProps, 'style' | 'ref'> {
  /**
   * The title of the button.
   */
  title?: string;
  /**
   * The source of the icon image. Can be a local file, a remote URL, or an asset.
   */
  icon: React.ReactNode | ImageSourcePropType | React.ReactElement | undefined;
  /**
   * Function to call when the button is pressed.
   */
  onPress?: () => void;
  /**
   * Defines the visual style variant of the button.
   */
  variant?: IconButtonVariant;
  /**
   * Defines the size of the button.
   */
  size?: IconButtonSize;
  /**
   * Specifies the color theme to use for the button.
   * Defaults to 'light'.
   */
  theme?: 'light' | 'dark';
  /**
   * If true, the button will display a loading indicator (if implemented in the component).
   * Defaults to false.
   */
  isLoading?: boolean;
  /**
   * A test identifier for the icon image, used for testing purposes.
   */
  iconTestId?: string;
  /**
   * The resize mode for the icon image. Defaults to 'contain'.
   */
  iconResizeMode?: ImageResizeMode;
  /**
   * If true, the button will be disabled and not interactable.
   * Defaults to false.
   */
  disabled?: boolean;
  /**
   * Custom styles to apply to the button container.
   */
  iconButtonStyle?: StyleProp<ViewStyle>;
  /**
   * Custom styles to apply when the button is disabled.
   */
  disabledStyle?: StyleProp<ViewStyle>;
  /**
   * Custom styles to apply to the icon when the button is disabled.
   */
  disabledIconStyle?: StyleProp<ImageStyle>;
  /**
   * Custom styles to apply when the button is pressed.
   */
  pressedStyle?: StyleProp<ViewStyle>;
  /**
   * Custom styles to apply to the icon image.
   */
  iconStyle?: StyleProp<ImageStyle>;
  /**
   * If true, the component will use tablet-specific sizing. Defaults to false.
   */
  isTablet?: boolean;
}

/**
 * A customizable button component that displays an icon and handles user interactions.
 *
 * @param {IconButtonProps} props - The properties for the IconButton component.
 * @returns {JSX.Element} The rendered IconButton component.
 */
const IconButton = ({
  title,
  icon,
  onPress,
  iconButtonStyle,
  disabledStyle,
  disabledIconStyle,
  pressedStyle: _pressedStyle,
  theme = 'light',
  disabled = false,
  size = 'sm',
  variant = 'primary',
  iconStyle,
  iconTestId,
  iconResizeMode = 'contain',
  isTablet = false,
  ...props
}: IconButtonProps) => {
  const colors = theme === 'light' ? LIGHT_COLORS : DARK_COLORS;
  const defaultButtonVariantStyle = useMemo(
    () => getIconBtnVariantStyles(variant, colors),
    [variant, colors]
  );
  const defaultDisabledStyle = useMemo(
    () => getIconBtnDisabledStyles(variant, colors),
    [variant, colors]
  );
  const defaultDisabledIconStyle = useMemo(
    () => getIconBtnDisabledIconStyles(variant, colors),
    [variant, colors]
  );
  const defaultSizeStyle = useMemo(
    () =>
      isTablet ? getIconBtnSizeTabletStyle(size) : getIconBtnSizeStyle(size),
    [size, isTablet]
  );
  const defaultIconSize = useMemo(
    () => (isTablet ? getIconStyleTablet(size) : getIconStyle(size)),
    [size, isTablet]
  );

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.buttonContainer,
        defaultButtonVariantStyle,
        defaultSizeStyle,
        iconButtonStyle,
        disabled && (disabledStyle ? disabledStyle : defaultDisabledStyle),
      ]}
      role={props.role ? props.role : 'button'}
      {...props}
    >
      {title && <TextView style={styles.title}>{title}</TextView>}
      {React.isValidElement(icon) ? (
        icon
      ) : (
        <Image
          testID={iconTestId}
          source={icon as ImageSourcePropType}
          style={[
            defaultIconSize,
            iconStyle,
            disabled &&
              (disabledIconStyle
                ? disabledIconStyle
                : defaultDisabledIconStyle),
          ]}
          resizeMode={iconResizeMode}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  title: {
    marginRight: 4,
  },
});

export default memo(IconButton);
