import { Platform } from 'react-native';

import type { CustomTextInputFieldProps } from './types';

import TextInputFieldAndroid from './text-input-field.android';
import TextInputFieldIos from './text-input-field.ios';

const TextInputField: React.FC<CustomTextInputFieldProps> = Platform.select({
  ios: () => TextInputFieldIos,
  android: () => TextInputFieldAndroid,
  default: () => TextInputFieldIos,
})();

export default TextInputField;
export type { CustomTextInputFieldProps } from './types';
