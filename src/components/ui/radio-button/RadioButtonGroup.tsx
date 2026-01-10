import type { JSX } from 'react';
import { View } from 'react-native';
import type { StyleProp, TextStyle, ViewProps, ViewStyle } from 'react-native';

import type { AppearanceMode } from '../../../theme';
import RadioButton, { type RadioButtonProps } from './RadioButton';
import type { RadioButtonVariantStyles } from './utils';

type RadioGroupLayout = 'row' | 'column';

/**
 * Props for the {@link RadioButtonGroup} component.
 */
export interface RadioBtnContainedProps extends ViewProps {
  /**
   * An array of options to render as radio buttons. Each option should have a `label` and a `value`.
   */
  options: RadioButtonProps[];
  /**
   * The value of the currently selected radio button.
   */
  selectedValue: string;
  /**
   * Callback function that is called when a radio button is selected. It receives the new value.
   */
  onChange: (value: string) => void;
  /**
   * If true, all radio buttons in the group will be disabled. Defaults to false.
   */
  disabled?: boolean;
  /**
   * Custom styles to apply to the container of the radio button group.
   */
  containerStyles?: StyleProp<ViewStyle>;
  /**
   * The layout direction of the radio buttons. Can be 'row' or 'column'. Defaults to 'column'.
   */
  layout?: RadioGroupLayout;
  /**
   * The spacing between the radio buttons. Applied as `gap` for 'row' layout and `rowGap` for 'column' layout. Defaults to 0.
   */
  spacing?: number;
  /**
   * If true and `layout` is 'row', the radio buttons will wrap to the next line if they don't fit in a single line. Defaults to false.
   */
  wrap?: boolean;
  /**
   * Styles for each radio button item container.
   */
  itemStyles?: StyleProp<ViewStyle>;
  /**
   * Styles for each radio button label.
   */
  itemLabelStyles?: StyleProp<TextStyle>;
  /**
   * Styles for the selected radio button label.
   */
  itemSelectedLabelStyles?: StyleProp<TextStyle>;
  /**
   * Variant styles for individual radio buttons. (Selected, Disabled)
   */
  variantStyles?: RadioButtonVariantStyles;
  /**
   * A test identifier to apply to each individual radio button item for testing purposes.
   */
  radioItemTestId?: string;
  /**
   * Specifies the color theme to use for the radio buttons.
   */
  theme?: AppearanceMode;
  /**
   * Sets a custom tint color for the radio button elements (border, inner circle) in the group.
   */
  tintColor?: string;
}

function RadioButtonContained({
  options,
  selectedValue,
  onChange,
  disabled = false,
  containerStyles,
  itemStyles,
  itemLabelStyles,
  itemSelectedLabelStyles,
  layout = 'column',
  spacing = 0,
  wrap = true,
  variantStyles,
  radioItemTestId,
  theme = 'light',
  tintColor,
  ...props
}: RadioBtnContainedProps): JSX.Element {
  const groupStyle: StyleProp<ViewStyle> = [
    containerStyles,
    { flexDirection: layout },
    layout === 'row' && spacing > 0 ? { gap: spacing } : undefined,
    layout === 'column' && spacing > 0 ? { rowGap: spacing } : undefined,
    layout === 'row' && wrap ? { flexWrap: 'wrap' } : undefined,
  ];

  return (
    <View style={groupStyle} {...props}>
      {options.map((option) => {
        const isSelected = option.value === selectedValue;
        return (
          <RadioButton
            key={option.value}
            testID={radioItemTestId}
            {...option}
            selected={isSelected}
            onPress={() => onChange(option.value || '')}
            disabled={disabled || option.disabled}
            style={[itemStyles, option.style]}
            labelStyle={[
              itemLabelStyles,
              option.labelStyle,
              isSelected && itemSelectedLabelStyles,
            ]}
            variantStyles={variantStyles || option.variantStyles}
            theme={option.theme ?? theme}
            tintColor={tintColor || option.tintColor}
          />
        );
      })}
    </View>
  );
}

export default RadioButtonContained;
