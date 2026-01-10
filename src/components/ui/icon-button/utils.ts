import type { ColorTypes } from '../../../theme';
import type { ImageStyle, ViewStyle } from 'react-native';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export type IconButtonVariant = 'primary' | 'secondary' | 'ghost';
export type IconButtonSize = 'lg' | 'sm' | 'extra-small';

// -----------------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------------
const iconButtonSize = {
  widthLargeIcon: 48,
  heightLargeIcon: 48,
  borderRadiusLargeIcon: 32,
  widthSmallIcon: 32,
  heightSmallIcon: 32,
  borderRadiusSmallIcon: 24,
  widthExtraSmallIcon: 16,
  heightExtraSmallIcon: 30,
  borderRadiusExtraSmallIcon: 16,
};

const iconButtonSizeTablet = {
  widthLargeIcon: 32,
  heightLargeIcon: 32,
  borderRadiusLargeIcon: 24,
  widthSmallIcon: 24,
  heightSmallIcon: 24,
  borderRadiusSmallIcon: 16,
  widthExtraSmallIcon: 16,
  heightExtraSmallIcon: 16,
  borderRadiusExtraSmallIcon: 16,
};

const iconSize = {
  widthLargeIcon: 24,
  heightLargeIcon: 24,
  widthSmallIcon: 20,
  heightSmallIcon: 20,
  widthExtraSmallIcon: 16,
  heightExtraSmallIcon: 16,
};

const iconSizeTablet = {
  widthLargeIcon: 16,
  heightLargeIcon: 16,
  widthSmallIcon: 16,
  heightSmallIcon: 16,
  widthExtraSmallIcon: 12,
  heightExtraSmallIcon: 12,
};

// -----------------------------------------------------------------------------
// Variant Styles
// -----------------------------------------------------------------------------

const iconBtnVariantStylesMap: Record<
  IconButtonVariant,
  (colors: ColorTypes) => ViewStyle
> = {
  primary: (colors) => ({
    backgroundColor: colors.iconButton.primary,
    borderColor: colors.iconButton.primaryBorder,
  }),
  secondary: (colors) => ({
    backgroundColor: colors.iconButton.secondary,
    borderColor: colors.iconButton.secondaryBorder,
  }),
  ghost: (colors) => ({
    backgroundColor: colors.iconButton.ghost,
    borderColor: colors.iconButton.ghostBorder,
  }),
};

const getIconBtnVariantStyles = (
  variant: IconButtonVariant,
  colors: ColorTypes
): ViewStyle => iconBtnVariantStylesMap[variant]?.(colors) || {};

// -----------------------------------------------------------------------------
// Pressed Variant Styles
// -----------------------------------------------------------------------------

const iconBtnPressVariantStylesMap: Record<
  IconButtonVariant,
  (colors: ColorTypes) => ViewStyle
> = {
  primary: (colors) => ({
    backgroundColor: colors.iconButton.primaryPressed,
    borderColor: colors.iconButton.primary,
  }),
  secondary: (colors) => ({
    backgroundColor: colors.iconButton.secondaryPressed,
    borderColor: 'transparent',
  }),
  ghost: (colors) => ({
    backgroundColor: colors.iconButton.ghostPressed,
    borderColor: colors.iconButton.ghostBorder,
  }),
};

const getIconBtnPressVariantStyles = (
  variant: IconButtonVariant,
  colors: ColorTypes
): ViewStyle => iconBtnPressVariantStylesMap[variant]?.(colors) || {};

// -----------------------------------------------------------------------------
// Disabled Styles
// -----------------------------------------------------------------------------

const iconBtnDisabledStylesMap: Record<
  IconButtonVariant,
  (colors: ColorTypes) => ViewStyle
> = {
  primary: (colors) => ({
    backgroundColor: colors.iconButton.primaryDisabled,
    borderColor: colors.iconButton.primaryDisabled,
  }),
  secondary: (colors) => ({
    backgroundColor: colors.iconButton.secondaryDisabled,
    borderColor: colors.iconButton.secondaryDisabledBorder,
  }),
  ghost: (colors) => ({
    backgroundColor: colors.iconButton.ghostDisabled,
    borderColor: 'transparent',
  }),
};

const getIconBtnDisabledStyles = (
  variant: IconButtonVariant,
  colors: ColorTypes
): ViewStyle => iconBtnDisabledStylesMap[variant]?.(colors) || {};

// -----------------------------------------------------------------------------
// Disabled Icon Styles
// -----------------------------------------------------------------------------

const iconBtnDisabledIconStylesMap: Record<
  IconButtonVariant,
  (colors: ColorTypes) => ImageStyle
> = {
  primary: (colors) => ({
    tintColor: colors.iconButton.primaryDisabledIcon,
  }),
  secondary: (colors) => ({
    backgroundColor: colors.iconButton.secondaryDisabled,
    tintColor: colors.iconButton.secondaryDisabledIcon,
  }),
  ghost: (colors) => ({
    tintColor: colors.iconButton.ghostDisabledIcon,
  }),
};

const getIconBtnDisabledIconStyles = (
  variant: IconButtonVariant,
  colors: ColorTypes
): ImageStyle => iconBtnDisabledIconStylesMap[variant]?.(colors) || {};

// -----------------------------------------------------------------------------
// Size Styles
// -----------------------------------------------------------------------------

const iconBtnSizeMap: Record<IconButtonSize, ViewStyle> = {
  'lg': {
    width: iconButtonSize.widthLargeIcon,
    height: iconButtonSize.heightLargeIcon,
    borderRadius: iconButtonSize.borderRadiusLargeIcon,
  },
  'sm': {
    width: iconButtonSize.widthSmallIcon,
    height: iconButtonSize.heightSmallIcon,
    borderRadius: iconButtonSize.borderRadiusSmallIcon,
  },
  'extra-small': {
    width: iconButtonSize.widthExtraSmallIcon,
    height: iconButtonSize.heightExtraSmallIcon,
    borderRadius: iconButtonSize.borderRadiusExtraSmallIcon,
  },
};

const iconBtnSizeTabletMap: Record<IconButtonSize, ViewStyle> = {
  'lg': {
    width: iconButtonSizeTablet.widthLargeIcon,
    height: iconButtonSizeTablet.heightLargeIcon,
    borderRadius: iconButtonSizeTablet.borderRadiusLargeIcon,
  },
  'sm': {
    width: iconButtonSizeTablet.widthSmallIcon,
    height: iconButtonSizeTablet.heightSmallIcon,
    borderRadius: iconButtonSizeTablet.borderRadiusSmallIcon,
  },
  'extra-small': {
    width: iconButtonSize.widthExtraSmallIcon,
    height: iconButtonSize.heightExtraSmallIcon,
    borderRadius: iconButtonSize.borderRadiusExtraSmallIcon,
  },
};

const getIconBtnSizeStyle = (size: IconButtonSize): ViewStyle =>
  iconBtnSizeMap[size] || {};
const getIconBtnSizeTabletStyle = (size: IconButtonSize): ViewStyle =>
  iconBtnSizeTabletMap[size] || {};

// -----------------------------------------------------------------------------
// Icon Size Styles
// -----------------------------------------------------------------------------

const iconStylesMap: Record<IconButtonSize, ImageStyle> = {
  'lg': { width: iconSize.widthLargeIcon, height: iconSize.heightLargeIcon },
  'sm': { width: iconSize.widthSmallIcon, height: iconSize.heightSmallIcon },
  'extra-small': {
    width: iconSize.widthExtraSmallIcon,
    height: iconSize.heightExtraSmallIcon,
  },
};

const iconStylesTabletMap: Record<IconButtonSize, ImageStyle> = {
  'lg': {
    width: iconSizeTablet.widthLargeIcon,
    height: iconSizeTablet.heightLargeIcon,
  },
  'sm': {
    width: iconSizeTablet.widthSmallIcon,
    height: iconSizeTablet.heightSmallIcon,
  },
  'extra-small': {
    width: iconSizeTablet.widthExtraSmallIcon,
    height: iconSizeTablet.heightExtraSmallIcon,
  },
};

const getIconStyle = (size: IconButtonSize): ImageStyle =>
  iconStylesMap[size] || {};
const getIconStyleTablet = (size: IconButtonSize): ImageStyle =>
  iconStylesTabletMap[size] || {};

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export {
  getIconBtnDisabledIconStyles,
  getIconBtnDisabledStyles,
  getIconBtnPressVariantStyles,
  getIconBtnSizeStyle,
  getIconBtnVariantStyles,
  getIconStyle,
  getIconStyleTablet,
  getIconBtnSizeTabletStyle,
};
