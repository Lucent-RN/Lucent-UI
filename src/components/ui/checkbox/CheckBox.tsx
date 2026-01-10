import { fonts } from '../../../theme';
import { scaleWidth } from '../../../theme';
import { getThemeColors } from '../../../utils';
import type { AppearanceMode } from '../../../theme';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import {
  Animated,
  Image,
  type ImageSourcePropType,
  type ImageStyle,
  Pressable,
  type PressableProps,
  type StyleProp,
  StyleSheet,
  type TextStyle,
  View,
  type ViewStyle,
} from 'react-native';
import TextView from '../text-view';
import {
  createCheckboxStyle,
  createLabelTextStyle,
  createSpacingStyle,
} from './utils';
import type { CheckboxPosition } from './utils';

export interface CheckBoxProps extends Omit<PressableProps, 'style'> {
  /**
   * Controls the checked state of the checkbox. If provided, the component becomes controlled.
   */
  checked?: boolean;
  /**
   * If true, the checkbox will display an indeterminate (in-between) state.
   */
  inBetween?: boolean;
  /**
   * If true, the checkbox will be disabled and not interactable.
   */
  disabled?: boolean;
  /**
   * Defines the size of the checkbox. Can be 'small', 'medium' (default), or 'large'.
   */
  checkboxSize?: number;
  /**
   * Sets a custom tint color for the checkbox elements (border, checkmark).
   */
  tintColor?: string;
  /**
   * Callback function that is called when the checked state of the checkbox changes.
   * Receives the new checked value (boolean) as an argument.
   */
  onChange?: (_checked: boolean) => void;
  /**
   * Additional styles to apply to the main container of the checkbox.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Text label to display next to the checkbox.
   */
  label?: string;
  /**
   * Custom styles to apply to the label text.
   */
  labelStyle?: StyleProp<TextStyle>;
  /**
   * Custom styles to apply to the label text when the checkbox is disabled.
   */
  disabledLabelStyle?: StyleProp<ViewStyle>;
  /**
   * Custom styles to apply directly to the checkbox element (the square box).
   */
  checkboxStyles?: StyleProp<ViewStyle>;
  /**
   * Custom styles to apply directly to the checkbox element when it is disabled.
   */
  disabledCheckboxStyles?: StyleProp<ViewStyle>;
  /**
   * Determines the position of the checkbox relative to the label.
   * Can be 'left' (default), 'right', 'top', or 'bottom'.
   */
  checkboxPosition?: CheckboxPosition;
  /**
   * Defines the spacing between the checkbox and the label.
   */
  spacing?: number;
  /**
   * Specifies the color theme to use. Defaults to 'system' (using the device's appearance).
   */
  theme?: AppearanceMode;
  /**
   * Custom test identifier to apply to the checkbox for testing purposes.
   */
  checkBoxTestId?: string;
  /**
   * Icon source for checkmark. If not provided, a default checkmark will be rendered.
   */
  checkIcon?: ImageSourcePropType;
  /**
   * Icon source for indeterminate state. If not provided, a default icon will be rendered.
   */
  inBetweenIcon?: ImageSourcePropType;
  isShowChildren?: boolean;
}

/**
 * A customizable checkbox component that allows users to select or deselect an option.
 *
 * @param {CheckBoxProps} props - The properties for the CheckBox component.
 * @returns {JSX.Element} The rendered CheckBox component.
 */
const CheckBox: React.FC<CheckBoxProps> = ({
  checked: _checkedProp,
  inBetween = false,
  disabled = false,
  checkboxSize = 20,
  onChange,
  label,
  tintColor,
  checkboxPosition = 'left',
  theme = 'light',
  spacing = 8,
  style,
  labelStyle,
  disabledLabelStyle,
  disabledCheckboxStyles,
  checkboxStyles,
  checkBoxTestId,
  isShowChildren = false,
  checkIcon,
  inBetweenIcon,
  ...props
}) => {
  const colors = getThemeColors(theme);
  const [internalChecked, setInternalChecked] = useState<boolean>(
    _checkedProp ?? false
  );
  const isControlled = _checkedProp !== undefined;
  const isChecked = isControlled ? _checkedProp : internalChecked;
  const checkMarkSize = checkboxSize * 0.6;
  const containerStyle = [styles.container, style];
  const children = typeof props.children === 'function' ? null : props.children;
  const animatedOpacity = useMemo(() => new Animated.Value(0), []);

  useEffect(() => {
    if (isShowChildren && children) {
      Animated.timing(animatedOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animatedOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isShowChildren, children, animatedOpacity]);

  const checkboxStyle = useMemo<StyleProp<ViewStyle>>(() => {
    return createCheckboxStyle(
      checkboxSize,
      disabled,
      tintColor,
      isChecked,
      colors,
      checkboxStyles
    );
  }, [checkboxSize, disabled, tintColor, isChecked, colors, checkboxStyles]);

  const spacingForItem = useMemo<StyleProp<ViewStyle>>(() => {
    return createSpacingStyle(checkboxPosition, spacing);
  }, [spacing, checkboxPosition]);

  const handleCheckboxPress = useCallback(() => {
    const newValue = !isChecked;
    if (!isControlled) {
      setInternalChecked(newValue);
    }
    onChange?.(newValue);
  }, [isChecked, isControlled, onChange]);

  const labelTextStyle = useMemo(() => {
    return createLabelTextStyle({
      disabled,
      disabledLabelStyle,
      labelStyle,
      spacingForItem,
      colors,
    });
  }, [disabled, disabledLabelStyle, labelStyle, spacingForItem, colors]);

  const checkMarkStyle = useMemo<StyleProp<ImageStyle>>(() => {
    return {
      width: checkMarkSize,
      height: checkMarkSize,
      tintColor: colors.checkbox.checkMark,
    };
  }, [checkMarkSize, colors.checkbox.checkMark]);

  const flexDirection =
    checkboxPosition === 'left' || checkboxPosition === 'right'
      ? 'row'
      : 'column';
  const justifyContent =
    checkboxPosition === 'left'
      ? 'flex-start'
      : checkboxPosition === 'right'
      ? 'flex-end'
      : 'center';

  const renderCheckboxContent = () => {
    if (isChecked) {
      const iconSource = inBetween ? inBetweenIcon : checkIcon;
      if (iconSource) {
        return (
          <Image
            source={iconSource}
            style={checkMarkStyle}
            resizeMode="contain"
          />
        );
      }
      // Fallback: render a simple checkmark using View
      const checkmarkFallbackStyle: ViewStyle = {
        width: checkMarkSize * 0.6,
        height: checkMarkSize * 0.3,
        borderLeftWidth: 2,
        borderBottomWidth: 2,
        borderColor: colors.checkbox.checkMark,
        transform: [{ rotate: '-45deg' }],
      };
      return <View style={checkmarkFallbackStyle} />;
    }

    return null;
  };

  return (
    <View style={containerStyle}>
      <View style={{ flexDirection, justifyContent }}>
        {(checkboxPosition === 'left' || checkboxPosition === 'top') && (
          <Pressable
            testID={checkBoxTestId}
            style={[
              checkboxStyle,
              spacingForItem,
              disabled && disabledCheckboxStyles,
            ]}
            onPress={handleCheckboxPress}
            disabled={disabled}
            android_ripple={disabled ? undefined : { color: tintColor }}
            accessibilityState={{
              checked: isChecked,
              disabled,
            }}
            {...props}
          >
            {renderCheckboxContent()}
          </Pressable>
        )}

        {label && (
          <TextView
            style={[{ fontSize: scaleWidth(fonts.size.small) }, labelTextStyle]}
            accessibilityRole="button"
            accessibilityState={{ disabled }}
          >
            {label}
          </TextView>
        )}

        {(checkboxPosition === 'right' || checkboxPosition === 'bottom') && (
          <Pressable
            testID={checkBoxTestId}
            style={[
              checkboxStyle,
              spacingForItem,
              disabled && disabledCheckboxStyles,
            ]}
            onPress={handleCheckboxPress}
            disabled={disabled}
            android_ripple={disabled ? undefined : { color: tintColor }}
            accessibilityState={{
              checked: isChecked,
              disabled,
            }}
            {...props}
          >
            {renderCheckboxContent()}
          </Pressable>
        )}
      </View>
      {children && (
        <Animated.View
          style={[styles.childrenContainer, { opacity: animatedOpacity }]}
        >
          {isShowChildren && children}
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  childrenContainer: {
    width: '100%',
  },
});

export default memo(CheckBox);
