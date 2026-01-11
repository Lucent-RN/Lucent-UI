import { Divider, TextDivider, TextView } from 'lucent-ui';
import { View, StyleSheet } from 'react-native';
import type { AppearanceMode } from 'lucent-ui';

interface DividerShowcaseProps {
  theme: AppearanceMode;
}

export default function DividerShowcase({ theme }: DividerShowcaseProps) {
  return (
    <>
      <View style={styles.section}>
        <TextView
          style={[
            styles.sectionTitle,
            { color: theme === 'light' ? '#000000' : '#FFFFFF' },
          ]}
        >
          Dividers
        </TextView>
        <View style={styles.componentGroup}>
          <Divider />
          <TextDivider label="OR" labelPosition="center" />
          <TextDivider label="Left" labelPosition="left" />
          <TextDivider label="Right" labelPosition="right" />
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
