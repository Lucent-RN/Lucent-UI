import React, { useMemo } from 'react';
import type { ScrollViewProps, StyleProp, ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';

import type { AppearanceMode, ColorTypes } from '../../../theme';
import { scaleHeight } from '../../../theme';
import { getThemeColors } from '../../../utils';

export interface DialogBodyProps extends ScrollViewProps {
  /**
   * Body content
   */
  children: React.ReactNode;
  /**
   * Theme mode (light/dark)
   */
  theme?: AppearanceMode;
  /**
   * Custom style for body container
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Maximum height for scrollable body
   */
  maxHeight?: number;
  /**
   * Whether dialog is for tablet
   */
  isTablet?: boolean;
}

const DialogBody: React.FC<DialogBodyProps> = ({
  children,
  theme = 'light',
  style,
  maxHeight,
  isTablet = false,
}) => {
  const colors = getThemeColors(theme);
  const styles = useMemo(
    () => createStyles(colors, isTablet, maxHeight),
    [colors, isTablet, maxHeight]
  );

  return (
    <View style={[styles.container, style]} pointerEvents="box-none">
      {children}
    </View>
  );
};

const createStyles = (
  _colors: ColorTypes,
  isTablet: boolean,
  maxHeight?: number
) =>
  StyleSheet.create({
    container: {
      ...(maxHeight
        ? { height: maxHeight }
        : { minHeight: isTablet ? scaleHeight(60) : scaleHeight(80) }),
    },
  });

export default DialogBody;
