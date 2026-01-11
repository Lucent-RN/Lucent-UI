import { Badge, Divider, TextView } from 'lucent-ui';
import { View, StyleSheet } from 'react-native';
import type { AppearanceMode } from 'lucent-ui';

interface BadgeShowcaseProps {
  theme: AppearanceMode;
}

export default function BadgeShowcase({ theme }: BadgeShowcaseProps) {
  return (
    <>
      <View style={styles.section}>
        <TextView
          style={[
            styles.sectionTitle,
            { color: theme === 'light' ? '#000000' : '#FFFFFF' },
          ]}
        >
          Badges
        </TextView>
        <View
          style={[
            styles.componentGroup,
            { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
          ]}
        >
          <Badge text="New" theme={theme} />
          <Badge text="Hot" theme={theme} />
          <Badge text="Sale" theme={theme} />
          <Badge text="Featured" theme={theme} />
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
