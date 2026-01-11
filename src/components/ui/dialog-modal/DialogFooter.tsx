import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';

import type { AppearanceMode, ColorTypes } from '../../../theme';
import { getThemeColors } from '../../../utils';
import { scaleHeight, scaleWidth } from '../../../theme';

export interface DialogFooterProps {
  /**
   * Footer content (usually buttons)
   */
  children: React.ReactNode;
  /**
   * Theme mode (light/dark)
   */
  theme?: AppearanceMode;
  /**
   * Custom style for footer container
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Footer alignment
   */
  align?: 'left' | 'center' | 'right' | 'space-between';
  /**
   * Whether dialog is for tablet
   */
  isTablet?: boolean;
}

const DialogFooter: React.FC<DialogFooterProps> = ({
  children,
  theme = 'light',
  style,
  align = 'right',
  isTablet = false,
}) => {
  const colors = getThemeColors(theme);
  const styles = useMemo(
    () => createStyles(colors, isTablet, align),
    [colors, isTablet, align]
  );

  return <View style={[styles.container, style]}>{children}</View>;
};

const createStyles = (
  _colors: ColorTypes,
  _isTablet: boolean,
  align: DialogFooterProps['align']
) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: scaleHeight(16),
      paddingTop: scaleHeight(16),
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: 'rgba(0, 0, 0, 0.1)',
      gap: scaleWidth(12),
      ...(align === 'left' && { justifyContent: 'flex-start' }),
      ...(align === 'center' && { justifyContent: 'center' }),
      ...(align === 'right' && { justifyContent: 'flex-end' }),
      ...(align === 'space-between' && { justifyContent: 'space-between' }),
    },
  });

export default DialogFooter;
