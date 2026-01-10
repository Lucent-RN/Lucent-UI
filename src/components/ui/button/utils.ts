import type { TextStyle, ViewStyle } from 'react-native';

import type { ColorTypes } from '../../../theme';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'underline'
  | 'destructive';
export type IconPosition = 'left' | 'right' | 'top' | 'bottom';
export type ButtonSize = 'sm' | 'md' | 'lg';

// -----------------------------------------------------------------------------
// Variant Styles
// -----------------------------------------------------------------------------

const variantStylesMap: Record<
  ButtonVariant,
  (colors: ColorTypes) => ViewStyle
> = {
  primary: (colors) => ({
    backgroundColor: colors.button.primary,
    borderColor: colors.button.primary,
  }),
  secondary: (colors) => ({
    backgroundColor: colors.button.secondary,
    borderColor: colors.button.secondaryBorder,
  }),
  underline: () => ({
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  }),
  destructive: (colors) => ({
    backgroundColor: 'transparent',
    borderColor: colors.button.destructiveBorder,
  }),
};

export const getVariantStyles = (
  variant: ButtonVariant,
  colors: ColorTypes
): ViewStyle => variantStylesMap[variant]?.(colors) || {};

// -----------------------------------------------------------------------------
// Pressed Variant Styles
// -----------------------------------------------------------------------------

const pressVariantStylesMap: Record<
  ButtonVariant,
  (colors: ColorTypes) => ViewStyle
> = {
  primary: (colors) => ({ backgroundColor: colors.button.primaryPressed }),
  secondary: (colors) => ({ backgroundColor: colors.button.secondaryPressed }),
  destructive: (colors) => ({
    backgroundColor: colors.button.destructivePressed,
  }),
  underline: () => ({ backgroundColor: 'transparent' }),
};

export const getPressVariantStyles = (
  variant: ButtonVariant,
  colors: ColorTypes
): ViewStyle => pressVariantStylesMap[variant]?.(colors) || {};

// -----------------------------------------------------------------------------
// Text Variant Styles
// -----------------------------------------------------------------------------

const textVariantStylesMap: Record<
  ButtonVariant,
  (colors: ColorTypes) => TextStyle
> = {
  primary: (colors) => ({ color: colors.button.primaryText }),
  secondary: (colors) => ({ color: colors.button.secondaryText }),
  underline: (colors) => ({
    color: colors.button.underlineText,
    textDecorationLine: 'underline',
    fontWeight: '500',
  }),
  destructive: (colors) => ({ color: colors.button.destructiveText }),
};

export const getTextVariantStyles = (
  variant: ButtonVariant,
  colors: ColorTypes
): TextStyle => textVariantStylesMap[variant]?.(colors) || {};

// -----------------------------------------------------------------------------
// Size Styles
// -----------------------------------------------------------------------------

export const getSizeStyles = (size: ButtonSize): ViewStyle => {
  const styles: Record<ButtonSize, ViewStyle> = {
    sm: {
      paddingVertical: 8,
      paddingHorizontal: 12,
    },
    md: {
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    lg: {
      paddingVertical: 16,
      paddingHorizontal: 20,
    },
  };
  return styles[size];
};

// -----------------------------------------------------------------------------
// Text Size Styles
// -----------------------------------------------------------------------------

export const getTextSizeStyles = (size: ButtonSize): TextStyle => {
  const styles: Record<ButtonSize, TextStyle> = {
    sm: {
      fontSize: 14,
    },
    md: {
      fontSize: 16,
    },
    lg: {
      fontSize: 18,
    },
  };
  return styles[size];
};

export const getButtonContentStyle = (
  isSmall: boolean,
  iconPosition: IconPosition,
  iconGap: number
): ViewStyle => {
  if (isSmall) {
    return {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    };
  }

  switch (iconPosition) {
    case 'left':
      return {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        gap: iconGap,
      };
    case 'right':
      return {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        gap: iconGap,
      };
    case 'top':
      return {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        gap: iconGap,
      };
    case 'bottom':
      return {
        flexDirection: 'column-reverse',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        gap: iconGap,
      };
    default:
      return {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      };
  }
};
