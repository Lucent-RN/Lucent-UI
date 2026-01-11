import { Divider, TextView } from 'lucent-ui';
import { View, StyleSheet } from 'react-native';
import type { AppearanceMode } from 'lucent-ui';

interface TextViewShowcaseProps {
  theme: AppearanceMode;
}

export default function TextViewShowcase({ theme }: TextViewShowcaseProps) {
  return (
    <>
      <View style={styles.section}>
        <TextView
          style={[
            styles.sectionTitle,
            { color: theme === 'light' ? '#000000' : '#FFFFFF' },
          ]}
        >
          Text View
        </TextView>
        <View style={styles.componentGroup}>
          <TextView
            style={[
              styles.textExample,
              { color: theme === 'light' ? '#000000' : '#FFFFFF' },
            ]}
          >
            This is a TextView component with default styling.
          </TextView>
          <TextView
            style={[
              styles.textExample,
              { color: theme === 'light' ? '#000000' : '#FFFFFF' },
            ]}
          >
            You can customize it with your own styles.
          </TextView>
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
  textExample: {
    fontSize: 14,
    lineHeight: 24,
    marginBottom: 8,
  },
});
