import { font_tokens, fonts } from '../../theme';
import React, { memo } from 'react';
import { Text as RNText, StyleSheet } from 'react-native';
import type { TextProps } from 'react-native';

const TextView: React.FC<TextProps> = (props) => {
  const { style, children, ...rest } = props;
  return (
    <RNText {...rest} style={[styles.defaultText, style]}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  defaultText: {
    fontFamily: font_tokens.medium,
    fontSize: fonts.size.small,
    color: 'black',
  },
});

export default memo(TextView);
