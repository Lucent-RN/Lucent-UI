import type { AppearanceMode } from '../../../theme';
import type { StyleProp, ViewStyle, TextInputProps } from 'react-native';

export interface OTPInputProps
  extends Omit<TextInputProps, 'onChangeText' | 'value' | 'onChange'> {
  numberOfDigits?: number;
  onChange?: (otp: string) => void;
  inputStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  autoFocus?: boolean;
  theme?: AppearanceMode;
}
