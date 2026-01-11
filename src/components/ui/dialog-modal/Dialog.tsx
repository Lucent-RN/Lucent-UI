import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, Modal, Platform, Pressable, StyleSheet } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';

import type { AppearanceMode, ColorTypes } from '../../../theme';
import { getThemeColors } from '../../../utils';
import { scaleHeight, scaleWidth } from '../../../theme';

export interface DialogProps {
  /**
   * Controls the visibility of the dialog
   */
  isOpen: boolean;
  /**
   * Callback when dialog should be closed
   */
  onClose: () => void;
  /**
   * Theme mode (light/dark)
   */
  theme?: AppearanceMode;
  /**
   * Whether clicking outside should close the dialog
   */
  closeOnOverlayClick?: boolean;
  /**
   * Custom style for the overlay/backdrop
   */
  overlayStyle?: StyleProp<ViewStyle>;
  /**
   * Custom style for the dialog content container
   */
  contentStyle?: StyleProp<ViewStyle>;
  /**
   * Whether dialog is for tablet (affects sizing)
   */
  isTablet?: boolean;
  /**
   * Dialog content
   */
  children: React.ReactNode;
  /**
   * Animation duration in milliseconds
   */
  animationDuration?: number;
}

const INITIAL_SCALE = 0.9;
const DEFAULT_ANIMATION_DURATION = 250;

const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  theme = 'light',
  closeOnOverlayClick = true,
  overlayStyle,
  contentStyle,
  isTablet = false,
  children,
  animationDuration = DEFAULT_ANIMATION_DURATION,
}) => {
  const colors = getThemeColors(theme);
  const styles = useMemo(
    () => createStyles(colors, isTablet),
    [colors, isTablet]
  );

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(INITIAL_SCALE)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isOpen) {
      // Animate in
      Animated.parallel([
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: animationDuration,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: animationDuration,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Animate out
      Animated.parallel([
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: animationDuration * 0.6,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: animationDuration * 0.6,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: INITIAL_SCALE,
          duration: animationDuration * 0.6,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isOpen, fadeAnim, scaleAnim, backdropOpacity, animationDuration]);

  const handleOverlayPress = () => {
    if (closeOnOverlayClick) {
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <Pressable
        style={[styles.overlay, overlayStyle]}
        onPress={handleOverlayPress}
      >
        <Animated.View
          style={[
            styles.backdrop,
            {
              opacity: backdropOpacity,
            },
          ]}
        />
        <Pressable
          onPress={(e) => e.stopPropagation()}
          style={styles.contentWrapper}
          pointerEvents="box-none"
        >
          <Animated.View
            style={[
              styles.content,
              contentStyle,
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }],
              },
            ]}
            pointerEvents="box-none"
          >
            {children}
          </Animated.View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const createStyles = (colors: ColorTypes, isTablet: boolean) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      ...Platform.select({
        ios: {
          backdropFilter: 'blur(8px)',
        },
      }),
    },
    backdrop: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    contentWrapper: {
      width: '100%',
      maxWidth: isTablet ? scaleWidth(500) : scaleWidth(400),
      paddingHorizontal: scaleWidth(16),
      zIndex: 1,
    },
    content: {
      backgroundColor: colors.background.primary,
      borderRadius: isTablet ? scaleWidth(16) : scaleWidth(20),
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: scaleHeight(8),
          },
          shadowOpacity: 0.25,
          shadowRadius: scaleWidth(16),
        },
        android: {
          elevation: 16,
        },
      }),
    },
  });

export default Dialog;
