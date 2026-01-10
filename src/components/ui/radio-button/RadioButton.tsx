import { getThemeColors } from '../../../utils';
import type { AppearanceMode } from '../../../theme';
import React, { forwardRef, useEffect, useMemo, useState } from 'react';
import {
  Animated,
  Pressable,
  type PressableProps,
  type PressableStateCallbackType,
  type StyleProp,
  StyleSheet,
  type TextStyle,
  View,
  type ViewStyle,
} from 'react-native';
import { getRadioVariantStyles, type RadioButtonVariantStyles } from './utils';
import TextView from '../text-view';

/**
 * Props for the {@link RadioButton} component.
 */
export interface RadioButtonProps
  extends Omit<PressableProps, 'style' | 'ref'> {
  /**
   * Controls the checked state of the radio button. If provided, the component becomes controlled.
   * When `selected` is provided, the component acts as a controlled component, and its state
   * will be determined by the value of this prop.
   */
  selected?: boolean;
  /**
   * Callback function that is called when the radio button is pressed.
   * This function will be invoked when the user interacts with the radio button.
   */
  onPress?: () => void;
  /**
   * Text label to display next to the radio button. Defaults to 'Content'.
   * This label provides context for the radio button option.
   */
  label?: string;
  /**
   * If true, the radio button will be disabled and not interactable. Defaults to false.
   * A disabled radio button will typically have a different visual appearance to indicate
   * that it cannot be selected.
   */
  disabled?: boolean;
  /**
   * Additional styles to apply to the main container of the radio button.
   * These styles will be merged with the base styles of the radio button container.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Custom styles to apply to the label text.
   * These styles will override or merge with the default label text styles.
   */
  labelStyle?: StyleProp<TextStyle>;
  /**
   * Specifies the color theme to use for the radio button. Defaults to 'light'.
   */
  theme?: AppearanceMode;
  /**
   * Custom size for the outer circle of the radio button.
   * If provided, this will override the size determined by the `size` prop.
   */
  circleOuterSize?: number;
  /**
   * Custom size for the inner circle of the radio button.
   * If provided, this will override the size calculated based on the `outerCircleSize` or `size` prop.
   */
  circleInnerSize?: number;
  /**
   * Custom border width for the outer circle. Defaults to 1.
   * Allows for fine-tuning the thickness of the radio button's outer border.
   */
  circleBorderWidth?: number;
  /**
   * Sets a custom tint color for the radio button elements (border, inner circle when selected).
   * This prop allows you to customize the primary color of the radio button.
   */
  tintColor?: string;
  /**
   * Custom border radius for the radio button container. Defaults to 8.
   * Controls the roundness of the main clickable area of the radio button.
   */
  borderRadius?: number;
  /**
   * Custom styles to apply to the inner circle.
   * These styles will be merged with the default inner circle styles and any styles determined
   * by the `selected` and `tintColor` props.
   */
  innerCircleStyle?: StyleProp<ViewStyle>;
  /**
   * Custom styles to apply to the outer circle.
   * These styles will be merged with the default outer circle styles and any styles determined
   * by the `selected` and `disabled` props.
   */
  outerCircleStyle?: StyleProp<ViewStyle>;
  /**
   * Custom styles to apply when the radio button is disabled.
   * These styles will override or merge with the default disabled styles for the container
   * and its elements.
   */
  disabledStyle?: StyleProp<ViewStyle>;
  /**
   * Custom variant styles to apply based on the component's state (e.g., selected, disabled).
   * This prop allows for more advanced styling based on different states of the radio button,
   * as defined by the `RadioButtonVariantStyles` interface.
   */
  variantStyles?: RadioButtonVariantStyles;
  /**
   * Custom styles to apply to the label text when the radio button is selected.
   * These styles will override or merge with the default selected label text styles.
   */
  selectedLabelStyle?: StyleProp<TextStyle>;
  /**
   * A value associated with the radio button. This is useful when the radio button is part
   * of a group to identify which option has been selected.
   */
  value?: string;
  /**
   * A React Node to display at the trailing end (right side) of the radio button.
   * This can be used to display additional information or indicators.
   */
  trailing?: React.ReactNode;

  isShowChildren?: boolean;
}

// RadioButton component using forwardRef to allow access to the underlying Pressable node.
const RadioButton = forwardRef<View, RadioButtonProps>(
  (
    {
      selected = false,
      onPress,
      label = 'Content',
      disabled = false,
      style,
      labelStyle,
      circleOuterSize,
      theme = 'light',
      circleInnerSize,
      circleBorderWidth = 1,
      tintColor,
      borderRadius = 8,
      innerCircleStyle,
      outerCircleStyle,
      selectedLabelStyle,
      variantStyles,
      disabledStyle,
      isShowChildren = true,
      ...props
    },
    ref
  ) => {
    const colors = getThemeColors(theme);
    const sizeValue = 20;
    const outerSize = circleOuterSize ?? sizeValue;
    const innerSize = circleInnerSize ?? outerSize * (14 / 20);

    const variantStyleSet = useMemo(
      () => getRadioVariantStyles(variantStyles, colors),
      [variantStyles, colors]
    );

    const containerStyle = useMemo<StyleProp<ViewStyle>>(
      () => [
        {
          borderRadius,
        },
        variantStyleSet.base,
        style,
        selected && variantStyleSet.selected,
        disabled && (disabledStyle ? disabledStyle : variantStyleSet.disabled),
      ],
      [borderRadius, selected, disabled, variantStyleSet, style, disabledStyle]
    );

    const outerCircle = useMemo<StyleProp<ViewStyle>>(
      () => [
        styles.circleBorder,
        { width: outerSize, height: outerSize, borderRadius: outerSize / 2 },
        outerCircleStyle,
        {
          borderWidth: circleBorderWidth,
          borderColor: selected
            ? tintColor || colors.radioButton.outerCircleSelected
            : colors.radioButton.outerCircleUnselected,
        },
        disabled && { borderColor: colors.radioButton.disabledCircleOuter },
      ],
      [
        outerSize,
        circleBorderWidth,
        selected,
        tintColor,
        colors.radioButton.outerCircleSelected,
        colors.radioButton.outerCircleUnselected,
        colors.radioButton.disabledCircleOuter,
        outerCircleStyle,
        disabled,
      ]
    );

    // State and useEffect for the inner circle animation on selection change.
    const innerScale = useState(new Animated.Value(selected ? 1 : 0.6))[0];

    useEffect(() => {
      Animated.spring(innerScale, {
        toValue: selected ? 1 : 0.6,
        useNativeDriver: true,
        friction: 5,
      }).start();
    }, [selected, innerScale]);

    const animatedInnerCircleStyle = useMemo<Animated.AnimatedProps<ViewStyle>>(
      () => ({
        ...styles.circleBase,
        width: innerSize,
        height: innerSize,
        borderRadius: innerSize / 2,
        backgroundColor: selected
          ? tintColor
            ? tintColor
            : colors.radioButton.innerCircleSelected
          : 'transparent',
        transform: [{ scale: innerScale }],
        ...((StyleSheet.flatten(innerCircleStyle) || {}) as ViewStyle),
      }),
      [
        innerSize,
        selected,
        tintColor,
        colors.radioButton.innerCircleSelected,
        innerScale,
        innerCircleStyle,
      ]
    );

    const labelTextStyle = useMemo<TextStyle>(() => {
      const selectedStyle = selected
        ? StyleSheet.flatten([
            { color: colors.radioButton.label },
            selectedLabelStyle,
          ]) || { color: colors.radioButton.label }
        : {
            color: colors.radioButton.label,
          };
      const disabledStyles = disabled
        ? disabledStyle ?? { color: colors.radioButton.disabledText }
        : {};

      return (
        StyleSheet.flatten([
          styles.label,
          selectedStyle,
          labelStyle,
          disabledStyles,
        ]) || styles.label
      );
    }, [
      selected,
      colors.radioButton.label,
      colors.radioButton.disabledText,
      selectedLabelStyle,
      disabled,
      disabledStyle,
      labelStyle,
    ]);

    return (
      <Pressable
        ref={ref as any}
        role={props.role ?? 'button'}
        onPress={onPress}
        disabled={disabled}
        style={containerStyle}
        {...props}
      >
        {(pressState) => (
          <View testID="radio-button-container">
            <View style={styles.rowBetween}>
              {/* Radio Content */}
              <View style={styles.row}>
                <View style={outerCircle} testID="outer-circle">
                  <Animated.View
                    style={animatedInnerCircleStyle}
                    testID="inner-circle"
                  />
                </View>
                <TextView style={labelTextStyle}>{label}</TextView>
              </View>
              {/* Trailing Content */}
              <View>{props.trailing}</View>
            </View>
            {/* Children */}
            {isShowChildren && props.children && (
              <View>
                {typeof props.children === 'function'
                  ? (
                      props.children as (
                        _state: PressableStateCallbackType
                      ) => React.ReactNode
                    )(pressState)
                  : props.children}
              </View>
            )}
          </View>
        )}
      </Pressable>
    );
  }
);

RadioButton.displayName = 'RadioButton';

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'flex-start',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  label: {
    flexWrap: 'wrap',
    flex: 1,
  },
  circleBorder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleBase: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RadioButton;
