import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import type { ColorTypes } from '../../../theme';
import { fonts, fontTablets, scaleHeight, scaleWidth } from '../../../theme';
import { colorVariables } from '../../../constants';
import { getThemeColors } from '../../../utils';
import TextView from '../text-view';
import type { CustomTextInputFieldProps } from './types';

const TextInputField: React.FC<CustomTextInputFieldProps> = ({
  label,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  textInputStyle,
  floatingLabelStyle,
  style,
  error,
  helperText,
  editable = true,
  theme = 'light',
  leftIcon,
  rightIcon,
  leftIconContainerStyle,
  rightIconContainerStyle,
  isFloatingLabel: _isFloatingLabel = true,
  isTablet = false,
  visibilityIcon,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isValueVisible, setIsValueVisible] = useState(!secureTextEntry);
  const [internalValue, setInternalValue] = useState(value || '');
  const animatedLabel = useRef(new Animated.Value(value ? 1 : 0)).current;
  const colors = getThemeColors(theme);
  const styles = useMemo(
    () => createStyles(colors, isTablet),
    [colors, isTablet]
  );

  useEffect(() => {
    Animated.timing(animatedLabel, {
      toValue: isFocused || internalValue ? 1 : 0,
      duration: 200,
      useNativeDriver: false, // Must be false when animating layout properties like fontSize and top
    }).start?.();
  }, [animatedLabel, isFocused, internalValue]);

  const handleOnChangeText = (text: string) => {
    onChangeText?.(text);
    setInternalValue(text);
  };

  const borderColor = error ? colorVariables.red_500 : colors.input.border;

  const labelStyle = {
    top: animatedLabel.interpolate({
      inputRange: [0, 1],
      outputRange: [
        isTablet ? scaleWidth(6) : scaleWidth(14),
        isTablet ? scaleHeight(-8) : scaleHeight(-10),
      ],
    }),
    fontSize: animatedLabel.interpolate({
      inputRange: [
        0,
        isTablet ? scaleWidth(fontTablets.size.xxs) : scaleWidth(8),
      ],
      outputRange: [
        isTablet
          ? scaleWidth(fontTablets.size.xxs)
          : scaleWidth(fonts.size.medium),
        isTablet
          ? scaleWidth(fontTablets.size.xxs)
          : scaleWidth(fonts.size.small),
      ],
    }),
    color: error ? colorVariables.red_500 : colors.input.placeholder,
    backgroundColor: colors.input.background,
  };

  return (
    <View style={[styles.container]}>
      <View
        style={[
          styles.inputContainer,
          {
            borderColor,
          },
          style,
        ]}
        pointerEvents="box-none"
      >
        <Animated.Text
          style={[styles.floatingLabel, labelStyle, floatingLabelStyle]}
        >
          {label}
        </Animated.Text>

        {leftIcon && (
          <View style={[styles.leftIcon, leftIconContainerStyle]}>
            {leftIcon}
          </View>
        )}

        <TextInput
          style={[
            styles.textInput,
            { color: colors.input.textColor },
            textInputStyle,
          ]}
          secureTextEntry={!isValueVisible && secureTextEntry}
          keyboardType={keyboardType}
          value={value !== undefined ? value : internalValue}
          onChangeText={handleOnChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder=""
          placeholderTextColor={colors.input.placeholder}
          editable={editable}
          {...props}
        />

        {rightIcon && (
          <View style={[styles.rightIcon, rightIconContainerStyle]}>
            {rightIcon}
          </View>
        )}

        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setIsValueVisible((prev) => !prev)}
            style={styles.eyeIcon}
            activeOpacity={0.7}
          >
            {visibilityIcon ? (
              visibilityIcon
            ) : (
              <View style={styles.eyeIconContainer}>
                {isValueVisible ? (
                  // Eye open icon
                  <View style={styles.eyeIconContent}>
                    <View
                      style={[
                        styles.eyeShape,
                        {
                          borderColor: colors.input.placeholder,
                        },
                      ]}
                    >
                      <View
                        style={[
                          styles.eyePupil,
                          {
                            backgroundColor: colors.input.placeholder,
                          },
                        ]}
                      />
                    </View>
                  </View>
                ) : (
                  // Eye closed icon (with slash)
                  <View style={styles.eyeIconContent}>
                    <View
                      style={[
                        styles.eyeShape,
                        {
                          borderColor: colors.input.placeholder,
                        },
                      ]}
                    >
                      <View
                        style={[
                          styles.eyePupil,
                          {
                            backgroundColor: colors.input.placeholder,
                          },
                        ]}
                      />
                    </View>
                    <View
                      style={[
                        styles.eyeSlash,
                        {
                          backgroundColor: colors.input.placeholder,
                        },
                      ]}
                    />
                  </View>
                )}
              </View>
            )}
          </TouchableOpacity>
        )}
      </View>

      {!!error && <TextView style={styles.errorText}>{error}</TextView>}

      {!!helperText && !error && (
        <TextView style={styles.helperText}>{helperText}</TextView>
      )}
    </View>
  );
};

const createStyles = (_colors: ColorTypes, isTablet: boolean) =>
  StyleSheet.create({
    container: {
      marginVertical: isTablet ? scaleHeight(4) : scaleHeight(5),
    },
    inputContainer: {
      position: 'relative',
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: isTablet ? scaleWidth(1) : scaleWidth(2),
      borderRadius: isTablet ? scaleWidth(8) : scaleWidth(12),
      padding: isTablet ? scaleWidth(6) : scaleWidth(14),
    },
    textInput: {
      flex: 1,
      fontSize: isTablet
        ? scaleWidth(fontTablets.size.xxs)
        : scaleWidth(fonts.size.small),
    },
    floatingLabel: {
      position: 'absolute',
      left: isTablet ? scaleWidth(8) : scaleWidth(12),
      paddingHorizontal: 6,
      paddingVertical: 0,
      borderRadius: isTablet ? scaleWidth(4) : scaleWidth(6),
      fontSize: isTablet
        ? scaleWidth(fontTablets.size.xxs)
        : scaleWidth(fonts.size.small),
    },
    eyeIcon: {
      marginLeft: isTablet ? scaleWidth(8) : scaleWidth(10),
      padding: scaleWidth(4),
      justifyContent: 'center',
      alignItems: 'center',
    },
    eyeIconContainer: {
      width: isTablet ? scaleWidth(20) : scaleWidth(24),
      height: isTablet ? scaleWidth(20) : scaleWidth(24),
      justifyContent: 'center',
      alignItems: 'center',
    },
    eyeIconContent: {
      width: isTablet ? scaleWidth(16) : scaleWidth(20),
      height: isTablet ? scaleWidth(16) : scaleWidth(20),
      position: 'relative',
      justifyContent: 'center',
      alignItems: 'center',
    },
    eyeShape: {
      width: isTablet ? scaleWidth(14) : scaleWidth(18),
      height: isTablet ? scaleWidth(10) : scaleWidth(12),
      borderWidth: isTablet ? scaleWidth(1.5) : scaleWidth(2),
      borderRadius: isTablet ? scaleWidth(7) : scaleWidth(9),
      justifyContent: 'center',
      alignItems: 'center',
    },
    eyePupil: {
      width: isTablet ? scaleWidth(4) : scaleWidth(5),
      height: isTablet ? scaleWidth(4) : scaleWidth(5),
      borderRadius: isTablet ? scaleWidth(2) : scaleWidth(2.5),
    },
    eyeSlash: {
      position: 'absolute',
      width: isTablet ? scaleWidth(12) : scaleWidth(16),
      height: isTablet ? scaleWidth(1.5) : scaleWidth(2),
      transform: [{ rotate: '-45deg' }],
    },
    errorText: {
      marginTop: 4,
      marginLeft: 10,
      color: colorVariables.red_500,
      fontSize: isTablet
        ? scaleWidth(fontTablets.size.xxs)
        : scaleWidth(fonts.size.small),
    },
    helperText: {
      marginTop: 4,
      marginLeft: 10,
      color: colorVariables.neutral_500,
      fontSize: isTablet
        ? scaleWidth(fontTablets.size.xxs)
        : scaleWidth(fonts.size.small),
    },
    leftIcon: {
      marginRight: 10,
    },
    rightIcon: {
      marginLeft: 10,
    },
    placeholderIcon: {
      borderRadius: 2,
    },
  });

export default memo(TextInputField);
