import { scaleWidth } from '../../theme';
import { fonts } from '../../theme/font';
import { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import TextView from './text-view';

type TextDividerProps = {
  label: string;
  containerStyle?: StyleProp<ViewStyle>;
  dividerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  labelPosition?: 'center' | 'left' | 'right';
};

const TextDivider = ({
  label,
  containerStyle,
  dividerStyle,
  labelStyle,
  labelPosition = 'center',
}: TextDividerProps) => {
  const renderCenter = (
    <>
      <View style={[styles.divider, dividerStyle]} />
      <TextView style={[styles.labelText, labelStyle]}>{label}</TextView>
      <View style={[styles.divider, dividerStyle]} />
    </>
  );

  const renderLeft = (
    <>
      <TextView
        style={[styles.labelText, labelStyle, { marginRight: scaleWidth(12) }]}
      >
        {label}
      </TextView>
      <View style={[styles.divider, { flex: 1 }, dividerStyle]} />
    </>
  );

  const renderRight = (
    <>
      <View style={[styles.divider, { flex: 1 }, dividerStyle]} />
      <TextView
        style={[styles.labelText, labelStyle, { marginLeft: scaleWidth(12) }]}
      >
        {label}
      </TextView>
    </>
  );

  return (
    <View
      style={[
        styles.dividerContainer,
        containerStyle,
        labelPosition !== 'center' && { justifyContent: 'flex-start' },
      ]}
    >
      {labelPosition === 'left' && renderLeft}
      {labelPosition === 'right' && renderRight}
      {labelPosition === 'center' && renderCenter}
    </View>
  );
};

const styles = StyleSheet.create({
  dividerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: scaleWidth(1),
  },
  divider: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: 'grey',
  },
  labelText: {
    marginHorizontal: scaleWidth(12),
    fontSize: scaleWidth(fonts.size.medium),
    color: 'grey',
  },
});

export default memo(TextDivider);
