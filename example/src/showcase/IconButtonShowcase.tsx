import { Divider, IconButton, TextView } from 'lucent-ui';
import { View, StyleSheet } from 'react-native';
import type { AppearanceMode } from 'lucent-ui';

interface IconButtonShowcaseProps {
  theme: AppearanceMode;
}

export default function IconButtonShowcase({ theme }: IconButtonShowcaseProps) {
  return (
    <>
      <View style={styles.section}>
        <TextView
          style={[
            styles.sectionTitle,
            { color: theme === 'light' ? '#000000' : '#FFFFFF' },
          ]}
        >
          Icon Button
        </TextView>
        <View
          style={[
            styles.componentGroup,
            { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
          ]}
        >
          <IconButton
            icon="⭐"
            onPress={() => console.log('Icon pressed')}
            variant="primary"
            size="sm"
            theme={theme}
          />
          <IconButton
            icon="❤️"
            onPress={() => console.log('Icon pressed')}
            variant="secondary"
            size="sm"
            theme={theme}
          />
          <IconButton
            icon="🔥"
            onPress={() => console.log('Icon pressed')}
            variant="ghost"
            size="sm"
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
