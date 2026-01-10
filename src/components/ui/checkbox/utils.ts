import type { ColorTypes } from '../../../theme';
import { scaleWidth } from '../../../theme';
import { colorVariables } from '../../../constants';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';

export type CheckboxPosition = 'left' | 'right' | 'top' | 'bottom';

export type CheckboxContainedMode =
  | 'contained'
  | 'separated'
  | 'card'
  | 'plain'
  | 'list'
  | 'grid'
  | 'bordered';

// --- Style Utility Functions ---
const createCheckboxStyle = (
  size: number,
  disabled: boolean,
  tintColor: string | undefined,
  isChecked: boolean,
  colors: ColorTypes,
  customCheckBoxStyle?: StyleProp<ViewStyle>
): StyleProp<ViewStyle> => {
  const baseStyle: ViewStyle = {
    width: size,
    height: size,
    borderWidth: scaleWidth(2),
    borderRadius: scaleWidth(3),
    alignItems: 'center',
    justifyContent: 'center',
  };

  const colorStyle: ViewStyle = {
    borderColor: disabled
      ? colors.checkbox.disabledLabel
      : isChecked
      ? tintColor ?? colors.checkbox.borderBox
      : tintColor ?? colors.checkbox.borderBox,
    backgroundColor: disabled
      ? 'transparent'
      : isChecked
      ? tintColor ?? colors.checkbox.label
      : 'transparent',
  };

  return StyleSheet.flatten([baseStyle, customCheckBoxStyle, colorStyle]);
};

const createIndeterminateStyle = (
  size: number,
  borderWidth: number,
  disabled: boolean,
  disabledColor: string,
  indeterminateColor: string
): ViewStyle => ({
  width: size * 0.6,
  height: borderWidth,
  backgroundColor: disabled ? disabledColor : indeterminateColor,
  borderRadius: borderWidth / 2,
});

const createSpacingStyle = (
  checkboxPosition: CheckboxPosition,
  spacing: number
): ViewStyle => {
  switch (checkboxPosition) {
    case 'right':
      return { marginLeft: spacing };
    case 'left':
      return { marginRight: spacing };
    case 'bottom':
      return { marginTop: spacing };
    case 'top':
      return { marginBottom: spacing };
    default:
      return {};
  }
};

interface CreateLabelTextStyleProps {
  disabled?: boolean;
  disabledLabelStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
  spacingForItem?: StyleProp<TextStyle>;
  colors: ColorTypes;
}

const createLabelTextStyle = ({
  disabled,
  disabledLabelStyle,
  labelStyle,
  spacingForItem,
  colors,
}: CreateLabelTextStyleProps) => {
  const baseLabelStyle = StyleSheet.flatten([
    {
      color: colors.checkbox.label,
    },
  ]);
  const defaultDisabledStyle: StyleProp<TextStyle> = disabled
    ? disabledLabelStyle
      ? disabledLabelStyle
      : {
          color: colors.checkbox.disabledLabel,
        }
    : {};
  const disabledStyles = StyleSheet.flatten([defaultDisabledStyle]);
  const defaultLabelStyle = StyleSheet.flatten([
    baseLabelStyle,
    spacingForItem,
    labelStyle,
    disabledStyles,
  ]);

  return defaultLabelStyle;
};

// --- Styles for Checkbox Contained ---

const checkBoxContainedStyles = StyleSheet.create({
  itemCheckbox: {
    borderColor: colorVariables.neutral_200,
    padding: scaleWidth(16),
    borderWidth: 1,
    borderRadius: scaleWidth(12),
  },
});

export const itemModeStyles: Record<
  CheckboxContainedMode,
  StyleProp<ViewStyle>
> = {
  contained: {},
  separated: {},
  card: {},
  bordered: [checkBoxContainedStyles.itemCheckbox],
  plain: {},
  list: {},
  grid: {},
};

export {
  createCheckboxStyle,
  createIndeterminateStyle,
  createLabelTextStyle,
  createSpacingStyle,
};
