import type { AppearanceMode } from '../../../theme';
import type {
  KeyboardTypeOptions,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import type { TextInputProps } from 'react-native';

export interface CustomTextInputFieldProps extends TextInputProps {
  label: string;
  value?: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  textInputStyle?: StyleProp<TextStyle>;
  floatingLabelStyle?: StyleProp<TextStyle>;
  keyboardType?: KeyboardTypeOptions;
  error?: string;
  helperText?: string;
  theme?: AppearanceMode;
  leftIcon?: React.ReactNode;
  leftIconContainerStyle?: StyleProp<ViewStyle>;
  rightIcon?: React.ReactNode;
  rightIconContainerStyle?: StyleProp<ViewStyle>;
  isFloatingLabel?: boolean;
  isTablet?: boolean;
  visibilityIcon?: React.ReactNode;
}
