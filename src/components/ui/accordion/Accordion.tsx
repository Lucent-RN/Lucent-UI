import { iconSize, scaleHeight, scaleWidth } from '../../../theme';
import type { ColorTypes } from '../../../theme';
import { getThemeColors } from '../../../utils';
import type { AppearanceMode } from '../../../theme';
import { memo, useCallback, useMemo, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import type { ViewProps } from 'react-native';
import TextView from '../text-view';

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
  const colors = getThemeColors(theme);
  const styles = useMemo(() => createStyles(colors), [colors]);

  const toggleAccordion = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  const renderIcon = () => {
    if (isExpanded && collapseIcon) {
      return collapseIcon;
    }
    if (!isExpanded && expandIcon) {
      return expandIcon;
    }
    // Fallback: render a simple chevron using View
    return (
      <View
        style={[
          styles.icon,
          {
            transform: [{ rotate: isExpanded ? '180deg' : '0deg' }],
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
