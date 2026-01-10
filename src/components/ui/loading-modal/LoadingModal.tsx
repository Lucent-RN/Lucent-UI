import {
  fonts,
  fontTablets,
  scaleHeight,
  scaleWidth,
  spacing_tokens,
} from '../../../theme';
import type { ColorTypes } from '../../../theme';
import { getThemeColors } from '../../../utils';
import type { AppearanceMode } from '../../../theme';
import React, { useEffect, useMemo, useRef } from 'react';
import {
  ActivityIndicator,
  Animated,
  Modal,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import TextView from '../text-view';

interface LoadingModalProps {
  visible: boolean;
  message?: string;
  theme?: AppearanceMode;
  isTablet?: boolean;
}

const INITIAL_SCALE = 0.8;
const ANIMATION_DURATION_SHORT = 150;
const ANIMATION_DURATION_MEDIUM = 200;
const ANIMATION_DURATION_LONG = 250;

const LoadingModal: React.FC<LoadingModalProps> = ({
  visible,
  message,
  theme = 'light',
  isTablet = false,
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
    if (visible) {
      // Animate in
      Animated.parallel([
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: ANIMATION_DURATION_MEDIUM,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: ANIMATION_DURATION_LONG,
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
          duration: ANIMATION_DURATION_SHORT,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: ANIMATION_DURATION_SHORT,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: INITIAL_SCALE,
          duration: ANIMATION_DURATION_SHORT,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, fadeAnim, scaleAnim, backdropOpacity]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
    >
      <Animated.View
        style={[
          styles.modalOverlay,
          {
            opacity: backdropOpacity,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.modalContent,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <View style={styles.indicatorContainer}>
            <ActivityIndicator size="large" color={colors.button.primary} />
          </View>
          {message && <TextView style={styles.messageText}>{message}</TextView>}
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

const MODAL_BORDER_RADIUS_TABLET = 20;
const MODAL_BORDER_RADIUS_PHONE = 24;
const MODAL_PADDING_HORIZONTAL_TABLET = 32;
const MODAL_PADDING_HORIZONTAL_PHONE = 40;
const MODAL_PADDING_VERTICAL_TABLET = 28;
const MODAL_PADDING_VERTICAL_PHONE = 32;
const MODAL_MIN_WIDTH_TABLET = 140;
const MODAL_MIN_WIDTH_PHONE = 180;
const MODAL_MAX_WIDTH_TABLET = 280;
const MODAL_MAX_WIDTH_PHONE = 320;
const SHADOW_OFFSET_HEIGHT = 8;
const SHADOW_OPACITY = 0.25;
const SHADOW_RADIUS = 16;
const ELEVATION_ANDROID = 16;
const LINE_HEIGHT_TABLET = 20;
const LINE_HEIGHT_PHONE = 22;

const createStyles = (colors: ColorTypes, isTablet: boolean) =>
  StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      justifyContent: 'center',
      alignItems: 'center',
      ...Platform.select({
        ios: {
          backdropFilter: 'blur(8px)',
        },
      }),
    },
    modalContent: {
      backgroundColor: colors.background.primary,
      borderRadius: isTablet
        ? scaleWidth(MODAL_BORDER_RADIUS_TABLET)
        : scaleWidth(MODAL_BORDER_RADIUS_PHONE),
      paddingHorizontal: isTablet
        ? scaleWidth(MODAL_PADDING_HORIZONTAL_TABLET)
        : scaleWidth(MODAL_PADDING_HORIZONTAL_PHONE),
      paddingVertical: isTablet
        ? scaleHeight(MODAL_PADDING_VERTICAL_TABLET)
        : scaleHeight(MODAL_PADDING_VERTICAL_PHONE),
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: isTablet
        ? scaleWidth(MODAL_MIN_WIDTH_TABLET)
        : scaleWidth(MODAL_MIN_WIDTH_PHONE),
      minHeight: isTablet
        ? scaleWidth(MODAL_MIN_WIDTH_TABLET)
        : scaleWidth(MODAL_MIN_WIDTH_PHONE),
      maxWidth: isTablet
        ? scaleWidth(MODAL_MAX_WIDTH_TABLET)
        : scaleWidth(MODAL_MAX_WIDTH_PHONE),
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: SHADOW_OFFSET_HEIGHT,
          },
          shadowOpacity: SHADOW_OPACITY,
          shadowRadius: SHADOW_RADIUS,
        },
        android: {
          elevation: ELEVATION_ANDROID,
        },
      }),
    },
    indicatorContainer: {
      marginBottom: scaleHeight(spacing_tokens.s_8),
    },
    messageText: {
      fontSize: isTablet
        ? scaleWidth(fontTablets.size.medium)
        : scaleWidth(fonts.size.medium),
      fontFamily: fonts.fontFamily.medium,
      color: colors.text.secondary,
      textAlign: 'center',
      marginTop: scaleHeight(spacing_tokens.s_4),
      lineHeight: isTablet
        ? scaleHeight(LINE_HEIGHT_TABLET)
        : scaleHeight(LINE_HEIGHT_PHONE),
    },
  });

export default LoadingModal;
