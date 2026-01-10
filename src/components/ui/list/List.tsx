import { fonts, scaleHeight, scaleWidth } from '../../../theme';
import type { ColorTypes } from '../../../theme';
import { getThemeColors } from '../../../utils';
import type { AppearanceMode } from '../../../theme';
import { StyleSheet, View } from 'react-native';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import ItemList, { type ItemListProps } from './ItemList';
import TextView from '../text-view';

export type ListProps = {
  title?: string;
  data: ItemListProps[];
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  listStyle?: StyleProp<ViewStyle>;
  itemStyle?: StyleProp<ViewStyle>;
  theme?: AppearanceMode;
};

const List = ({
  title,
  data,
  style,
  titleStyle,
  listStyle,
  itemStyle,
  theme = 'light',
}: ListProps) => {
  const colors = getThemeColors(theme);
  const styles = createStyles(colors);

  return (
    <View style={[styles.container, style]}>
      {title && (
        <View style={styles.titleContainer}>
          <TextView style={[styles.title, titleStyle]}>{title}</TextView>
        </View>
      )}
      <View style={listStyle}>
        {data.map((item, index) => (
          <ItemList
            key={index}
            {...item}
            style={itemStyle}
            onPress={item.onPress}
            theme={item.theme ?? theme}
          />
        ))}
      </View>
    </View>
  );
};

const createStyles = (colors: ColorTypes) =>
  StyleSheet.create({
    container: {
      width: '100%',
    },
    titleContainer: {
      paddingVertical: scaleHeight(6),
    },
    title: {
      fontSize: scaleWidth(fonts.size.medium),
      fontWeight: 'bold',
      color: colors.text.primary,
    },
  });

export default List;
