import { scaleWidth } from '../../../theme';
import { colorVariables } from '../../../constants';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import TabViewItem from './tab-view-item';

interface TabData {
  title: string;
  count?: number;
  tabIcon?: any;
  disabled?: boolean;
}

export interface TabViewGroupProps {
  tabs: TabData[];
  activeTabIndex?: number;
  onTabChange?: (index: number, title: string) => void;
  style?: StyleProp<ViewStyle>;
  theme?: 'light' | 'dark';
  variant?: 'default' | 'iconTab';
  colorIcon?: string;
  colorUnderline?: string;
  isTablet?: boolean;
}

const TabViewGroup: React.FC<TabViewGroupProps> = ({
  tabs,
  activeTabIndex = 0,
  onTabChange,
  style,
  theme = 'light',
  variant = 'default',
  colorUnderline = colorVariables.brand_700,
  isTablet = false,
}) => {
  const [activeIndex, setActiveIndex] = useState(activeTabIndex);
  const [containerWidth, setContainerWidth] = useState(0);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const tabWidth = containerWidth > 0 ? containerWidth / tabs.length : 0;
  const styles = useMemo(() => createStyles(isTablet), [isTablet]);

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: tabWidth * activeIndex,
      useNativeDriver: true,
    }).start();
  }, [activeIndex, tabWidth, slideAnim]);

  const handleTabPress = (index: number, _title: string) => {
    setActiveIndex(index);
    if (onTabChange) {
      onTabChange(index, _title);
    }
  };

  return (
    <View
      style={[styles.container, style]}
      onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
    >
      <View style={styles.tabsContainer}>
        {tabs.map((tab, index) => (
          <View key={tab.title} style={styles.tabWrapper}>
            <TabViewItem
              title={tab.title}
              count={tab.count}
              tabIcon={tab.tabIcon}
              isActive={index === activeIndex}
              disabled={tab.disabled}
              theme={theme}
              variant={variant}
              isTablet={isTablet}
              onTabPress={() => handleTabPress(index, tab.title)}
            />
          </View>
        ))}
      </View>
      {/* Underline bar full width, sliding underline only under active tab */}
      <View style={[styles.underlineBar, { width: containerWidth }]}>
        <Animated.View
          style={[
            styles.slidingUnderline,
            {
              width: tabWidth,
              transform: [{ translateX: slideAnim }],
              backgroundColor: colorUnderline,
            },
          ]}
        />
      </View>
    </View>
  );
};

const createStyles = (isTablet: boolean) =>
  StyleSheet.create({
    container: {
      position: 'relative',
    },
    tabsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      minHeight: isTablet ? scaleWidth(14) : scaleWidth(30),
    },
    tabWrapper: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    underlineBar: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: isTablet ? scaleWidth(4) : scaleWidth(3),
      overflow: 'hidden',
      backgroundColor: 'transparent',
    },
    slidingUnderline: {
      height: isTablet ? scaleWidth(2) : scaleWidth(3),
      borderRadius: isTablet ? scaleWidth(1) : scaleWidth(2),
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
    },
  });

export default TabViewGroup;
