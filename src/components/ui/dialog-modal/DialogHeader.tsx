import React, { useMemo } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';

import type { AppearanceMode, ColorTypes } from '../../../theme';
import { scaleHeight, scaleWidth } from '../../../theme';
import { getThemeColors } from '../../../utils';
import TextView from '../text-view';

export interface DialogHeaderProps {
  /**
   * Header title
   */
  title?: string;
  /**
   * Header subtitle/description
   */
  subtitle?: string;
  /**
   * Custom header content (overrides title/subtitle)
   */
  children?: React.ReactNode;
  /**
   * Theme mode (light/dark)
   */
  theme?: AppearanceMode;
  /**
   * Custom style for header container
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Whether dialog is for tablet
   */
  isTablet?: boolean;
}

const DialogHeader: React.FC<DialogHeaderProps> = ({
  title,
  subtitle,
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
    <View style={[styles.container, style]}>
      {children ? (
        <>{children}</>
      ) : (
        <>
          <View style={styles.titleContainer}>
            {title && (
              <TextView
                style={[
                  styles.title,
                  {
                    color: colors.text.primary,
                  },
                ]}
              >
                {title}
              </TextView>
            )}
            {subtitle && (
              <TextView
                style={[
                  styles.subtitle,
                  {
                    color: colors.text.secondary,
                  },
                ]}
              >
                {subtitle}
              </TextView>
            )}
          </View>
        </>
      )}
    </View>
  );
};

const createStyles = (_colors: ColorTypes, isTablet: boolean) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      marginBottom: scaleHeight(16),
      paddingBottom: scaleHeight(16),
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    },
    titleContainer: {
      flex: 1,
      marginRight: scaleWidth(8),
    },
    title: {
      fontSize: isTablet ? scaleWidth(20) : scaleWidth(24),
      fontWeight: 'bold',
      marginBottom: scaleHeight(4),
    },
    subtitle: {
      fontSize: isTablet ? scaleWidth(14) : scaleWidth(16),
      lineHeight: isTablet ? scaleHeight(20) : scaleHeight(22),
    },
  });

export default DialogHeader;
