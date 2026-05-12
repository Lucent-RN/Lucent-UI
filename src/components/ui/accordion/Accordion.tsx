import { iconSize, scaleHeight, scaleWidth } from '../../../theme';
import type { ColorTypes } from '../../../theme';
import { getThemeColors } from '../../../utils';
import type { AppearanceMode } from '../../../theme';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  LayoutAnimation,
  Platform,
  Pressable,
  StyleSheet,
  UIManager,
  View,
} from 'react-native';
import type { ViewProps } from 'react-native';
import TextView from '../text-view';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export interface AccordionProps extends ViewProps {
  title: string;
  content?: string;
  theme?: AppearanceMode;
  expandIcon?: React.ReactNode;
  collapseIcon?: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({
  title,
  content,
  theme = 'light',
  expandIcon,
  collapseIcon,
  ...props
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const rotationValue = useRef(new Animated.Value(0)).current;

  const colors = getThemeColors(theme);
  const styles = useMemo(() => createStyles(colors), [colors]);

  useEffect(() => {
    Animated.timing(rotationValue, {
      toValue: isExpanded ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isExpanded, rotationValue]);

  const toggleAccordion = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded((prev) => !prev);
  }, []);

  const rotate = rotationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const renderIcon = () => {
    if (isExpanded && collapseIcon) {
      return collapseIcon;
    }
    if (!isExpanded && expandIcon) {
      return expandIcon;
    }
    // Fallback: render a simple chevron using View
    return (
      <Animated.View
        style={[
          styles.icon,
          {
            transform: [{ rotate }],
            borderTopWidth: 2,
            borderRightWidth: 2,
            borderColor: colors.text.primary,
            width: scaleWidth(iconSize.md.width * 0.5),
            height: scaleHeight(iconSize.md.width * 0.5),
          },
        ]}
      />
    );
  };

  return (
    <View testID="accordion-view" style={[styles.accordion]} {...props}>
      <Pressable
        testID="accordion-toggle"
        onPress={toggleAccordion}
        style={[styles.header]}
      >
        <View style={styles.titleContainer}>
          <TextView
            ellipsizeMode="tail"
            testID="accordion-title"
            style={[styles.title]}
          >
            {title}
          </TextView>
        </View>
        {renderIcon()}
      </Pressable>
      {isExpanded && content && content.trim().length !== 0 && (
        <TextView
          testID="accordion-content"
          style={[styles.content, { color: colors.text.primary }]}
        >
          {content}
        </TextView>
      )}
    </View>
  );
};

const createStyles = (colors: ColorTypes) =>
  StyleSheet.create({
    accordion: {
      width: '100%',
      backgroundColor: colors.background.primary,
      borderRadius: 8,
      padding: 15,
      overflow: 'hidden',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 5,
    },
    titleContainer: {
      flex: 1,
      marginRight: 10,
    },
    title: {
      flexShrink: 1,
    },
    content: {
      fontWeight: '400',
      marginTop: 10,
    },
    icon: {
      height: scaleHeight(16),
      width: scaleWidth(16),
    },
  });

export default memo(Accordion);
