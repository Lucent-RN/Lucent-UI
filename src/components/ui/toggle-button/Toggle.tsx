import { scaleHeight, scaleWidth } from '../../../theme';
import { getThemeColors, isImageSource, isReactElement } from '../../../utils';
import type { AppearanceMode } from '../../../theme';
import React, {
  forwardRef,
  memo,
  type ReactNode,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Animated,
  Image,
  type ImageURISource,
  type StyleProp,
  StyleSheet,
  type TextStyle,
  TouchableWithoutFeedback,
  View,
  type ViewProps,
  type ViewStyle,
} from 'react-native';
import TextView from '../text-view';
import { CHILDREN_CONTAINER_MARGIN_TOP, getSizeStyles } from './utils';
import type { ToggleLabelPosition, ToggleSize } from './utils';

/**
 * Props for the `Toggle` component.
 * This component renders a customizable toggle switch with an optional label and children.
 */
export interface ToggleProps extends Omit<ViewProps, 'ref'> {
  /**
   * A unique identifier for the toggle item. Can be a string or a number.
   */
  id?: string;
  /**
   * An optional name for the toggle item.
   */
  name?: string;
  /**
   * The current value (on/off state) of the toggle.
   * Use this for controlled components.
   */
  value?: boolean;
  /**
   * Callback function that is called when the toggle value changes.
   * Receives the new boolean value as its argument.
   */
  onValueChange?: (_value: boolean) => void;
  /**
   * If `true`, the toggle switch will be disabled and cannot be interacted with.
   */
  disabled?: boolean;
  /**
   * The size of the toggle switch. Can be 'sm', 'md' (default), or 'lg'.
   */
  size?: ToggleSize;
  /**
   * The visual theme of the toggle switch. Defaults to 'light'.
   */
  theme?: AppearanceMode;
  /**
   * An additional offset (in logical pixels) for the thumb's position within the track.
   */
  thumbOffset?: number;
  /**
   * Style object for the label text.
   */
  labelStyle?: StyleProp<TextStyle>;
  /**
   * The label text or a React Node to display alongside the toggle.
   */
  label?: string | ReactNode;
  /**
   * The position of the label relative to the toggle.
   * Can be 'left' (default), 'right', or 'hidden'.
   */
  labelPosition?: ToggleLabelPosition;
  /**
   * A boolean indicating whether to show the `children` prop below the toggle when it's on (controlled `value` is true). Defaults to `false`.
   */
  isShowChildren?: boolean;

  Icon?: React.ReactElement | ImageURISource;

  iconPosition?: 'left' | 'right';

  iconFillColor?: string;
}

const Toggle = forwardRef<View, ToggleProps>(
  (
    {
      value: controlledValue,
      onValueChange,
      disabled = false,
      style,
      size = 'sm',
      theme = 'light',
      thumbOffset = 3,
      label,
      labelPosition = 'left',
      labelStyle,
      children,
      isShowChildren = false,
      iconPosition = 'left',
      Icon,
      iconFillColor,
      ...props
    },
    ref
  ) => {
    const colors = getThemeColors(theme);
    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = useState<boolean>(false);
    const currentValue = isControlled ? controlledValue : internalValue;
    const sizeStyles = getSizeStyles(size);

    // Animated value for the thumb's horizontal position.
    const thumbPosition = useRef(
      new Animated.Value(
        currentValue ? sizeStyles.width - sizeStyles.thumbSize : 0
      )
    ).current;

    // Animated value for the opacity of the children container.
    const childrenOpacity = useRef(new Animated.Value(0)).current;

    /**
     * Animates the thumb position when the 'currentValue' changes.
     */
    useLayoutEffect(() => {
      Animated.timing(thumbPosition, {
        toValue: currentValue
          ? sizeStyles.width - sizeStyles.thumbSize - scaleWidth(thumbOffset)
          : scaleWidth(thumbOffset),
        duration: 200,
        useNativeDriver: true,
      }).start();

      // Animate the opacity of the children based on whether they should be shown.
      Animated.timing(childrenOpacity, {
        toValue: (controlledValue || isShowChildren) && !!children ? 1 : 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }, [
      currentValue,
      thumbPosition,
      sizeStyles.width,
      sizeStyles.thumbSize,
      thumbOffset,
      controlledValue,
      isShowChildren,
      children,
      childrenOpacity,
    ]);

    const handlePress = useCallback(() => {
      if (isControlled) {
        onValueChange?.(!controlledValue);
      } else {
        const newValue = !internalValue;
        setInternalValue(newValue);
        onValueChange?.(newValue);
      }
    }, [isControlled, internalValue, controlledValue, onValueChange]);

    // Animated style for the thumb.
    const animatedThumbStyle = {
      transform: [{ translateX: thumbPosition }],
      width: sizeStyles.thumbSize,
      height: sizeStyles.thumbSize,
      borderRadius: sizeStyles.thumbSize / 2,
      backgroundColor: colors.toggleSwitch.toggle,
    };

    const trackStyle: StyleProp<ViewStyle> = useMemo(() => {
      return StyleSheet.flatten([
        styles.trackContainer,
        sizeStyles,
        currentValue
          ? { backgroundColor: colors.toggleSwitch.toggleBgOn }
          : { backgroundColor: colors.toggleSwitch.toggleBg },
        disabled && { backgroundColor: colors.toggleSwitch.toggleDisabled },
        style,
      ]);
    }, [currentValue, disabled, sizeStyles, style, colors]);

    // Render the button's icon
    const renderIcon = useCallback((): React.JSX.Element | null => {
      if (isReactElement(Icon)) {
        return Icon;
      }

      if (isImageSource(Icon)) {
        return (
          <Image
            testID="image-icon"
            source={Icon}
            style={styles.icon}
            resizeMode="contain"
            tintColor={iconFillColor}
          />
        );
      }

      return null;
    }, [Icon, iconFillColor]);

    /**
     * Renders the label if it's provided and the 'labelPosition' is not 'hidden'.
     */
    const renderLabel = (): React.ReactNode => {
      if (label && labelPosition !== 'hidden') {
        return (
          <View style={styles.toggleAndIconContainer}>
            {labelPosition === 'left' &&
              iconPosition === 'left' &&
              Icon &&
              renderIcon()}
            <TextView
              style={[{ color: colors.toggleSwitch.toggleLabel }, labelStyle]}
            >
              {label}
            </TextView>
            {labelPosition === 'right' &&
              iconPosition === 'left' &&
              Icon &&
              renderIcon()}
          </View>
        );
      }
      return null;
    };

    return (
      <View style={styles.container} {...props}>
        <View style={styles.buttonContainer}>
          {labelPosition === 'left' && renderLabel()}
          <View style={styles.toggleAndIconContainer}>
            {iconPosition === 'right' && Icon && renderIcon()}
            <TouchableWithoutFeedback
              accessibilityState={{ checked: currentValue, disabled }}
              onPress={handlePress}
              disabled={disabled}
              accessible
              testID={props.testID}
            >
              <View ref={ref as any} style={trackStyle} role={props.role}>
                <Animated.View style={[styles.circle, animatedThumbStyle]} />
              </View>
            </TouchableWithoutFeedback>
          </View>
          {labelPosition === 'right' && renderLabel()}
        </View>
        {(controlledValue || isShowChildren) && children && (
          <Animated.View
            style={[styles.childrenContainer, { opacity: childrenOpacity }]}
          >
            {children}
          </Animated.View>
        )}
      </View>
    );
  }
);

Toggle.displayName = 'Toggle';

const styles = StyleSheet.create({
  container: {},
  trackContainer: {
    justifyContent: 'center',
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toggleAndIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: { width: scaleWidth(16), height: scaleHeight(16), marginHorizontal: 5 },
  circle: {
    position: 'absolute',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  childrenContainer: {
    marginTop: scaleHeight(CHILDREN_CONTAINER_MARGIN_TOP),
    opacity: 0,
  },
});

export default memo(Toggle);
