import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';

import type { AppearanceMode, ColorTypes } from '../../../theme';
import { getThemeColors } from '../../../utils';
import { scaleWidth } from '../../../theme';

export interface DialogContentProps {
  /**
   * Dialog content children
   */
  children: React.ReactNode;
  /**
   * Theme mode (light/dark)
   */
  theme?: AppearanceMode;
  /**
   * Custom style for content container
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Whether dialog is for tablet
   */
  isTablet?: boolean;
}

const DialogContent: React.FC<DialogContentProps> = ({
  children,
  theme = 'light',
  style,
  isTablet = false,
}) => {
  const colors = getThemeColors(theme);
  const styles = useMemo(
    () => createStyles(colors, isTablet),
    [colors, isTablet]
  );

  return (
    <View style={[styles.container, style]} pointerEvents="box-none">
      {children}
    </View>
  );
};

const createStyles = (_colors: ColorTypes, isTablet: boolean) =>
  StyleSheet.create({
    container: {
      padding: isTablet ? scaleWidth(20) : scaleWidth(24),
      flexDirection: 'column',
    },
  });

export default DialogContent;
