import type { ColorTypes } from '../../../theme';
import { scaleHeight, scaleWidth, spacing_tokens } from '../../../theme';
import { getThemeColors } from '../../../utils';
import React, { useMemo, useRef, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import type { OTPInputProps } from './types';

const OTPInput = ({
  numberOfDigits = 4,
  onChange,
  inputStyle,
  containerStyle,
  autoFocus = false,
  theme = 'light',
  ...props
}: OTPInputProps) => {
  const colors = getThemeColors(theme);
  const [otp, setOtp] = useState(Array(numberOfDigits).fill(''));
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const inputRefs = useRef<Array<React.ElementRef<typeof TextInput> | null>>(
    []
  );
  const styles = useMemo(() => createStyles(colors), [colors]);

  const handleChange = (text: string, index: number) => {
    if (/^\d$/.test(text) || text === '') {
      const updatedOtp = [...otp];
      updatedOtp[index] = text;
      setOtp(updatedOtp);
      onChange?.(updatedOtp.join(''));

      if (text !== '' && index < numberOfDigits - 1) {
        const nextInput = inputRefs.current[index + 1];
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
      const prevInput = inputRefs.current[index - 1];
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  return (
    <View
      testID="otp-container"
      style={[styles.container, containerStyle]}
      {...props}
    >
      {Array.from({ length: numberOfDigits }).map((_, index) => (
        <React.Fragment key={index}>
          <TextInput
            testID={`otp-input-${index}`}
            style={[
              styles.input,
              inputStyle,
              focusedIndex === index && styles.inputFocused,
            ]}
            value={otp[index]}
            maxLength={1}
            keyboardType="numeric"
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            onFocus={() => setFocusedIndex(index)}
            onBlur={() => setFocusedIndex(null)}
            ref={(ref) => {
              inputRefs.current[index] = ref;
              if (autoFocus && index === 0 && ref) {
                ref.focus();
              }
            }}
          />
          {index < numberOfDigits - 1 && <View style={styles.divider} />}
        </React.Fragment>
      ))}
    </View>
  );
};

const createStyles = (colors: ColorTypes) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      marginHorizontal: scaleWidth(spacing_tokens.s_12),
    },
    input: {
      width: scaleWidth(40),
      height: scaleHeight(38),
      borderWidth: 1,
      borderRadius: scaleWidth(8),
      textAlign: 'center',
      fontSize: scaleWidth(18),
      backgroundColor: colors.otpInput.backgroundColor,
      borderColor: colors.otpInput.border,
      color: colors.text.primary,
    },
    inputFocused: {
      borderColor: colors.otpInput.borderHighlight,
      backgroundColor: colors.otpInput.backgroundHighlight,
    },
    divider: {
      width: scaleWidth(8),
    },
  });

export default OTPInput;
