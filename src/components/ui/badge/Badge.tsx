import { fonts, scaleHeight, scaleWidth } from '../../../theme';
import type { ColorTypes } from '../../../theme';
import { getThemeColors } from '../../../utils';
import type { AppearanceMode } from '../../../theme';
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import TextView from '../text-view';

export type BadgeProps = {
  text: string;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  vectorIcon?: React.ReactNode;
  vectorIconColor?: string;
  vectorIconSize?: number;
  theme?: AppearanceMode;
  isTablet?: boolean;
};

const Badge: React.FC<BadgeProps> = ({
  text,
  containerStyle,
  textStyle,
  vectorIcon,
  vectorIconColor: _vectorIconColor,
  theme = 'light',
  isTablet = false,
}) => {
  const colors = getThemeColors(theme);
  const styles = useMemo(
    () => createStyles(colors, isTablet),
    [colors, isTablet]
  );

  return (
    <View style={[styles.container, containerStyle]}>
      {vectorIcon && (
        <View style={{ marginRight: isTablet ? scaleWidth(2) : scaleWidth(4) }}>
          {typeof vectorIcon === 'function'
            ? (vectorIcon as () => React.ReactNode)()
            : vectorIcon}
        </View>
      )}
      {text && <TextView style={[styles.text, textStyle]}>{text}</TextView>}
    </View>
  );
};

const createStyles = (colors: ColorTypes, isTablet: boolean) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: isTablet ? scaleWidth(2) : scaleWidth(4),
      backgroundColor: colors.brand.primary50,
      paddingHorizontal: isTablet ? scaleWidth(2) : scaleHeight(6),
      paddingVertical: isTablet ? scaleHeight(2) : scaleWidth(4),
      borderRadius: isTablet ? scaleHeight(4) : scaleHeight(10),
    },
    text: {
      fontSize: isTablet
        ? scaleWidth(fonts.size.xxxs)
        : scaleWidth(fonts.size.medium),
      fontWeight: '600',
      color: colors.text.primary,
    },
  });

export default Badge;
