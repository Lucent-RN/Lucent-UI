import { fonts, fontTablets, iconSize, scaleWidth } from '../../../theme';
import type { ColorTypes } from '../../../theme';
import { getThemeColors } from '../../../utils';
import type { AppearanceMode } from '../../../theme';
import React, { useMemo, useRef } from 'react';
import {
  Animated,
  type GestureResponderEvent,
  Image,
  type ImageSourcePropType,
  Pressable,
  type PressableProps,
  type StyleProp,
  StyleSheet,
  type TextStyle,
  View,
  type ViewStyle,
} from 'react-native';
import TextView from '../text-view';

type VariantTypes = 'default' | 'iconTab';

export interface TabItemProps extends Omit<PressableProps, 'style'> {
  title: string;
  count?: number;
  tabIcon?: ImageSourcePropType;
  isActive?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  badgeStyle?: StyleProp<ViewStyle>;
  badgeTextStyle?: StyleProp<TextStyle>;
  underlineStyle?: StyleProp<ViewStyle>;
  theme?: AppearanceMode;
  variant?: VariantTypes;
  onTabPress?: (_title: string) => void;
  isTablet?: boolean;
}

const TabViewItem: React.FC<TabItemProps> = ({
  title,
  count = 0,
  isActive = false,
  onPress,
  disabled = false,
  style,
  titleStyle,
  badgeStyle,
  badgeTextStyle,
  theme = 'light',
  tabIcon,
  variant = 'default',
  onTabPress,
  isTablet = false,
  ...props
}) => {
  const colors = getThemeColors(theme);
  const styles = useMemo(
    () => createStyles(colors, isActive, isTablet),
    [colors, isActive, isTablet]
  );

  // Animation values
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Handle tab press with animation
  const handleTabPress = (event: GestureResponderEvent) => {
    if (disabled) return;

    // Scale animation on press
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1.05,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // Call original onPress if provided
    if (onPress) {
      onPress(event);
    }

    // Call onTabPress callback if provided
    if (onTabPress) {
      onTabPress(title);
    }
  };

  return (
    <Animated.View style={[styles.animatedContainer]}>
      <Pressable
        testID={`tab-pressable-${title}`}
        style={[styles.container, style]}
        onPress={handleTabPress}
        disabled={disabled}
        accessibilityRole="tab"
        {...props}
      >
        {variant === 'iconTab' &&
          (tabIcon ? (
            <Animated.View style={styles.iconContainer}>
              <Image
                style={[
                  styles.imageStyle,
                  {
                    tintColor: isActive
                      ? colors.button.primary
                      : colors.button.primaryPressed,
                  },
                ]}
                source={tabIcon}
              />
            </Animated.View>
          ) : (
            <View style={styles.imgIconView} />
          ))}
        <View style={styles.labelRow}>
          <TextView
            numberOfLines={1}
            testID={`tab-title-${title}`}
            style={[styles.title, titleStyle]}
          >
            {title}
          </TextView>
          {count > 0 && (
            <Animated.View
              testID={`tab-badge-${title}`}
              style={[styles.badge, badgeStyle]}
            >
              <TextView
                testID={`tab-count-${title}`}
                style={[
                  {
                    color: colors.text.primary,
                  },
                  styles.badgeText,
                  badgeTextStyle,
                ]}
              >
                {count}
              </TextView>
            </Animated.View>
          )}
        </View>
      </Pressable>
    </Animated.View>
  );
};

const createStyles = (
  colors: ColorTypes,
  isActive: boolean,
  isTablet: boolean
) => {
  return StyleSheet.create({
    animatedContainer: {
      flex: 1,
    },
    container: {
      alignItems: 'center',
      position: 'relative',
    },
    iconContainer: {
      marginBottom: isTablet ? scaleWidth(2) : scaleWidth(4),
    },
    labelRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: isTablet ? scaleWidth(2) : scaleWidth(6),
    },
    title: {
      fontSize: isTablet
        ? scaleWidth(fontTablets.size.xxs)
        : scaleWidth(fonts.size.lg),
      fontWeight: '600',
      color: isActive ? colors.button.primary : colors.text.secondary,
      flexShrink: 1,
    },
    badge: {
      backgroundColor: colors.background.secondary,
      paddingHorizontal: isTablet ? scaleWidth(6) : scaleWidth(8),
      paddingVertical: isTablet ? scaleWidth(3) : scaleWidth(2),
      borderRadius: scaleWidth(999),
    },
    badgeText: {
      fontSize: isTablet
        ? scaleWidth(fontTablets.size.xxs)
        : scaleWidth(fonts.size.small),
      fontWeight: '500',
    },
    titleLength: {
      flexShrink: 1,
    },
    imgIconView: {
      paddingVertical: isTablet ? iconSize.sm.width : iconSize.md.width,
    },
    imageStyle: {
      width: isTablet ? iconSize.sm.width : iconSize.md.width,
      height: isTablet ? iconSize.sm.width : iconSize.md.width,
    },
  });
};

export default TabViewItem;
