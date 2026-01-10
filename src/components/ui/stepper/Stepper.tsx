import {
  fonts,
  fontTablets,
  iconSize,
  scaleHeight,
  scaleWidth,
  spacing_tokens,
} from '../../../theme';
import type { ColorTypes } from '../../../theme';
import { getThemeColors, Icon } from '../../../utils';
import type { AppearanceMode } from '../../../theme';
import React, { type ReactNode, useMemo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import TextView from '../text-view';

export interface StepperStep {
  label: string;
  icon: React.ReactNode | string; // Can be ReactNode or Ionicons name (string)
  children: ReactNode;
  disabled?: boolean;
  allowPressStep?: boolean;
}

export interface StepperProps {
  steps: StepperStep[];
  activeStep: number;
  onStepChange?: (stepIndex: number) => void;
  style?: StyleProp<ViewStyle>;
  allowStepNavigation?: boolean;
  theme?: AppearanceMode;
  isTablet?: boolean;
}

const Stepper: React.FC<StepperProps> = ({
  steps,
  activeStep,
  onStepChange,
  style,
  allowStepNavigation = true,
  theme = 'light',
  isTablet = false,
}) => {
  const colors = getThemeColors(theme);
  const styles = useMemo(
    () => createStyles(colors, isTablet),
    [colors, isTablet]
  );

  const handleStepPress = (stepIndex: number) => {
    if (!allowStepNavigation) return;
    if (steps[stepIndex]?.disabled) return;
    if (onStepChange) {
      onStepChange(stepIndex);
    }
  };

  const getStepStatus = (
    stepIndex: number
  ): 'completed' | 'current' | 'inactive' => {
    if (stepIndex < activeStep) return 'completed';
    if (stepIndex === activeStep) return 'current';
    return 'inactive';
  };

  const renderStepIcon = (step: StepperStep, stepIndex: number) => {
    const status = getStepStatus(stepIndex);
    const iconSizeValue = isTablet ? iconSize.sm.width : iconSize.md.width;

    let iconColor: string;
    let backgroundColor: string;
    let borderColor: string;

    switch (status) {
      case 'completed':
        iconColor = colors.text.primary;
        backgroundColor = colors.button.primary;
        borderColor = colors.button.primary;
        break;
      case 'current':
        iconColor = colors.button.primary;
        backgroundColor = colors.background.primary;
        borderColor = colors.button.primary;
        break;
      default:
        iconColor = colors.text.secondary;
        backgroundColor = colors.background.primary;
        borderColor = colors.input.border;
        break;
    }

    return (
      <View
        style={[
          styles.stepIconContainer,
          {
            backgroundColor,
            borderColor,
            borderWidth: status === 'completed' ? 0 : 1,
          },
          step.disabled && styles.stepIconDisabled,
        ]}
      >
        <Icon source={step.icon} size={iconSizeValue} color={iconColor} />
      </View>
    );
  };

  const renderConnectingLine = (stepIndex: number) => {
    if (stepIndex === steps.length - 1) return null;

    const isLineActive = activeStep > stepIndex;
    const lineColor = isLineActive
      ? colors.button.primary
      : colors.input.border;

    return (
      <View style={[styles.connectingLine, { backgroundColor: lineColor }]} />
    );
  };

  return (
    <View style={[styles.container, style]}>
      {/* Stepper Header */}
      <View style={styles.stepperHeader}>
        {steps.map((step, index) => (
          <View key={index} style={styles.stepWrapper}>
            <Pressable
              onPress={() => handleStepPress(index)}
              disabled={
                !allowStepNavigation || step.disabled || !step.allowPressStep
              }
              hitSlop={10}
              style={styles.stepButton}
            >
              {renderStepIcon(step, index)}
              <TextView
                style={[
                  styles.stepLabel,
                  getStepStatus(index) === 'current' && styles.stepLabelActive,
                  step.disabled && styles.stepLabelDisabled,
                ]}
              >
                {step.label}
              </TextView>
            </Pressable>
            {renderConnectingLine(index)}
          </View>
        ))}
      </View>

      {/* Step Content */}
      <View style={styles.stepContent}>{steps[activeStep]?.children}</View>
    </View>
  );
};

const createStyles = (colors: ColorTypes, isTablet: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    stepperHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop: scaleHeight(spacing_tokens.s_16),
      paddingHorizontal: scaleWidth(spacing_tokens.s_16),
      minHeight: isTablet ? scaleHeight(80) : scaleHeight(100),
    },
    stepWrapper: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    stepButton: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: scaleHeight(spacing_tokens.s_16),
      flex: 1,
    },
    stepIconContainer: {
      width: isTablet ? scaleWidth(32) : scaleWidth(40),
      height: isTablet ? scaleWidth(32) : scaleWidth(40),
      borderRadius: isTablet ? scaleWidth(16) : scaleWidth(20),
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: isTablet ? scaleHeight(4) : scaleHeight(8),
    },
    stepIconDisabled: {
      opacity: 0.5,
    },
    stepLabel: {
      fontSize: isTablet
        ? scaleWidth(fontTablets.size.xxs)
        : scaleWidth(fonts.size.small),
      color: colors.text.secondary,
      textAlign: 'center',
      fontWeight: '400',
    },
    stepLabelActive: {
      color: colors.text.primary,
      fontWeight: '600',
    },
    stepLabelDisabled: {
      opacity: 0.5,
    },
    connectingLine: {
      position: 'absolute',
      top: isTablet ? scaleWidth(16) : scaleWidth(20),
      left: '50%',
      right: '-50%',
      height: isTablet ? scaleWidth(2) : scaleWidth(2),
      zIndex: -1,
    },
    stepContent: {
      flex: 1,
    },
  });

export default Stepper;
