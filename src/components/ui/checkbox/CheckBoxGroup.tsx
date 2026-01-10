import React, { memo, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import type { StyleProp, ViewProps, ViewStyle } from 'react-native';

import type { AppearanceMode } from '../../../theme';
import CheckBox, { type CheckBoxProps } from './CheckBox';
import { itemModeStyles } from './utils';
import type { CheckboxContainedMode } from './utils';

export interface CheckboxItem extends CheckBoxProps {
  /**
   * A unique value associated with this checkbox item. This value will be used as the key in the `onValueChange` callback.
   */
  name: string;
  /**
   * The initially checked state of the checkbox (used if parent doesn't provide checked).
   */
  value?: boolean;
}

export interface CheckboxContainedProps extends ViewProps {
  /**
   * An array of checkbox items to render within the group.
   */
  items: CheckboxItem[];
  /**
   * Determines the layout direction of the checkboxes. Can be 'column' or 'row'.
   */
  layout?: 'column' | 'row';
  /**
   * Additional styles to apply to the main container of the checkbox group.
   */
  containerStyle?: StyleProp<ViewStyle>;

  /**
   * Custom styles to apply to each individual checkbox item container.
   */
  itemStyle?: StyleProp<ViewStyle>;

  /**
   * The spacing between the checkboxes in the group. Applied as `gap` for 'row' layout and `rowGap` for 'column' layout.
   */
  spacing?: number;

  mode?: CheckboxContainedMode;

  theme?: AppearanceMode;
}

const CheckboxContained: React.FC<CheckboxContainedProps> = ({
  items,
  layout = 'column',
  containerStyle,
  itemStyle,
  spacing,
  theme = 'light',
  mode = 'plain',
  ...props
}) => {
  const itemStylesMode = itemModeStyles[mode];

  const containerLayoutStyle: ViewStyle = useMemo(() => {
    const baseStyle = { flexDirection: layout };
    if (layout === 'row') {
      return { ...baseStyle, flexWrap: 'wrap', gap: spacing };
    }
    return { ...baseStyle, rowGap: spacing };
  }, [layout, spacing]);

  return (
    <View
      style={[styles.container, containerLayoutStyle, containerStyle]}
      {...props}
    >
      {items.map((item) => (
        <CheckBox
          key={item.name}
          {...item}
          theme={item.theme ?? theme}
          checked={item.value}
          style={[itemStylesMode, itemStyle, item.style]}
          onChange={item.onChange}
          isShowChildren={item.isShowChildren}
        >
          {item.children}
        </CheckBox>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
});

export default memo(CheckboxContained);
