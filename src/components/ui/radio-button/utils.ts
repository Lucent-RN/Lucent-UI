import type { ColorTypes } from '../../../theme';
import type { ViewStyle } from 'react-native';

export type RadioButtonSize = 'sm' | 'md' | 'lg';

export type RadioButtonVariantStyles = {
  base?: ViewStyle;
  selected?: ViewStyle;
  disabled?: ViewStyle;
};

/**
 * Default variant style based on theme colors
 */
const getDefaultVariantStyles = (
  colors: ColorTypes
): Required<RadioButtonVariantStyles> => ({
  base: {
    backgroundColor: colors.radioButton.baseBg,
    borderColor: colors.radioButton.baseBorder,
  },
  selected: {
    backgroundColor: colors.radioButton.selectedBg,
    borderColor: colors.radioButton.selectedBorder,
  },
  disabled: {
    backgroundColor: colors.radioButton.disabledBg,
    borderColor: colors.radioButton.disabledBorder,
  },
});

/**
 * Merge default + custom styles
 */
export const getRadioVariantStyles = (
  variantStyles: RadioButtonVariantStyles = {},
  colors: ColorTypes
): Required<RadioButtonVariantStyles> => {
  const defaults = getDefaultVariantStyles(colors);

  return {
    base: { ...defaults.base, ...variantStyles.base },
    selected: { ...defaults.selected, ...variantStyles.selected },
    disabled: { ...defaults.disabled, ...variantStyles.disabled },
  };
};
