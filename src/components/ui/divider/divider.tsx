import { colorVariables } from '../../../constants';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';

interface DividerProps {
  style?: StyleProp<ViewStyle>;
  color?: string;
  height?: number;
}

const Divider: React.FC<DividerProps> = ({
  style,
  color = colorVariables.neutral_700,
  height = 1,
}) => {
  return (
    <View
      style={[styles.container, { backgroundColor: color, height }, style]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export default Divider;
