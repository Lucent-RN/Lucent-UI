import { Divider, List, TextView } from 'lucent-ui';
import { View, StyleSheet } from 'react-native';
import type { AppearanceMode } from 'lucent-ui';

interface ListShowcaseProps {
  theme: AppearanceMode;
}

export default function ListShowcase({ theme }: ListShowcaseProps) {
  return (
    <>
      <View style={styles.section}>
        <TextView
          style={[
            styles.sectionTitle,
            { color: theme === 'light' ? '#000000' : '#FFFFFF' },
          ]}
        >
          List
        </TextView>
        <View style={styles.componentGroup}>
          <List
            title="Sample List"
            data={[
              {
                leftElement: <TextView>Item 1</TextView>,
                rightElement: <TextView>→</TextView>,
                onPress: () => console.log('Item 1 pressed'),
              },
              {
                leftElement: <TextView>Item 2</TextView>,
                rightElement: <TextView>→</TextView>,
                onPress: () => console.log('Item 2 pressed'),
              },
              {
                leftElement: <TextView>Item 3</TextView>,
                rightElement: <TextView>→</TextView>,
                onPress: () => console.log('Item 3 pressed'),
              },
            ]}
            theme={theme}
          />
        </View>
      </View>
      <Divider style={styles.divider} />
    </>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  componentGroup: {
    gap: 12,
    marginBottom: 8,
  },
  divider: {
    marginVertical: 24,
  },
});
