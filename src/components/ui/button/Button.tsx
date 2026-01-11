import React, { forwardRef, memo, useCallback, useMemo } from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import type {
  ImageURISource,
  PressableProps,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';

import { layout_tokens, LIGHT_COLORS, scaleWidth } from '../../../theme';
import { getThemeColors, isImageSource, isReactElement } from '../../../utils';
import type { AppearanceMode } from '../../../theme';
import TextView from '../text-view';
import {
  getButtonContentStyle,
  getSizeStyles,
  getTextSizeStyles,
  getTextVariantStyles,
  getVariantStyles,
} from './utils';
import type { ButtonSize, ButtonVariant, IconPosition } from './utils';

/**
 * Props for the custom Button component using React Native Elements.
 */
export interface ButtonProps
  extends Omit<PressableProps, 'style' | 'onPress' | 'size'> {
  title?: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  theme?: AppearanceMode;
  isLoading?: boolean;
  loadingMode?: 'replace' | 'along';
  disabled?: boolean;
  Icon?: React.ReactElement | ImageURISource;
  iconPosition?: IconPosition;
  iconGap?: number;
  iconFillColor?: string;
  buttonStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  disabledStyle?: StyleProp<ViewStyle>;
  pressedStyle?: StyleProp<ViewStyle>;
}

/**
 * A customizable button component using React Native Elements' Button.
 *
 * @param {ButtonProps} props - The properties for the Button component.
 * @returns {JSX.Element} The rendered Button component.
 */
const Button = forwardRef<
  React.ElementRef<typeof TouchableOpacity>,
  ButtonProps
>(
  (
    {
      title,
      onPress,
      variant = 'primary',
      size = 'md',
      theme = 'light',
      isLoading = false,
      loadingMode = 'replace',
      disabled = false,
      iconPosition = 'left',
      iconGap = 10,
      Icon,
      iconFillColor,
      buttonStyle,
      titleStyle,
      disabledStyle: _disabledStyle,
      pressedStyle: _pressedStyle,
      ...props
    },
    ref
  ) => {
    const colors = getThemeColors(theme);
    const isSmall = size === 'sm';

    // Memoized styles
    const buttonVariantStyle = useMemo(
      () => getVariantStyles(variant, colors),
      [variant, colors]
    );
    const textVariantStyle = useMemo(
      () => getTextVariantStyles(variant, colors),
      [variant, colors]
    );
    const buttonSizeStyle = useMemo(() => getSizeStyles(size), [size]);
    const textSizeStyle = useMemo(() => getTextSizeStyles(size), [size]);
    const buttonContentStyle = useMemo(
      () => getButtonContentStyle(isSmall, iconPosition, iconGap),
      [isSmall, iconPosition, iconGap]
    );

    // Render the button's icon
    const renderIcon = useCallback((): React.JSX.Element | null => {
      if (!Icon) return null;

      if (isReactElement(Icon)) {
        return Icon;
      }

      if (isImageSource(Icon)) {
        const iconSize = isSmall ? 20 : 24;
        return (
          <Image
            testID="image-icon"
            source={Icon}
            style={{ width: iconSize, height: iconSize }}
            resizeMode="contain"
            tintColor={iconFillColor}
          />
        );
      }

      return null;
    }, [Icon, isSmall, iconFillColor]);

    // Custom content rendering to support iconPosition and loadingMode
    const renderContent = () => {
      if (loadingMode === 'replace' && isLoading) {
        return (
          <ActivityIndicator
            testID="activity-indicator"
            color={
              iconFillColor ||
              (variant === 'underline'
                ? LIGHT_COLORS.button.primary
                : LIGHT_COLORS.background.primary)
            }
          />
        );
      }

      return (
        <View style={buttonContentStyle}>
          {/* Render Icon on the left if iconPosition is 'left' */}
          {iconPosition === 'left' && Icon && <View>{renderIcon()}</View>}

          {/* Render Title if exists */}
          {title && (
            <TextView style={[textVariantStyle, textSizeStyle, titleStyle]}>
              {title}
            </TextView>
          )}

          {/* Render Icon on the right if iconPosition is 'right' */}
          {iconPosition === 'right' && Icon && <View>{renderIcon()}</View>}

          {/* Render loading indicator if in along mode */}
          {loadingMode === 'along' && isLoading && (
            <ActivityIndicator
              testID="activity-indicator"
              style={styles.activityIndicator}
              size={'small'}
              color={
                iconFillColor ||
                (variant === 'underline'
                  ? LIGHT_COLORS.button.primary
                  : LIGHT_COLORS.background.primary)
              }
            />
          )}
        </View>
      );
    };

    return (
      <TouchableOpacity
        ref={ref}
        testID="button"
        onPress={onPress}
        disabled={isLoading || disabled}
        style={[
          styles.button,
          buttonVariantStyle,
          buttonSizeStyle,
          buttonStyle,
        ]}
        {...props}
      >
        {renderContent()}
      </TouchableOpacity>
    );
  }
);

Button.displayName = 'Button';

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scaleWidth(layout_tokens.border_radius),
    borderWidth: scaleWidth(1),
  },
  activityIndicator: { marginLeft: 8 },
});

export default memo(Button);
