import { Button, Divider, LoadingModal, TextView } from 'lucent-ui';
import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import type { AppearanceMode } from 'lucent-ui';

interface LoadingModalShowcaseProps {
  theme: AppearanceMode;
}

export default function LoadingModalShowcase({
  theme,
}: LoadingModalShowcaseProps) {
  const [showLoading, setShowLoading] = useState(false);

  return (
    <>
      <View style={styles.section}>
        <TextView
          style={[
            styles.sectionTitle,
            { color: theme === 'light' ? '#000000' : '#FFFFFF' },
          ]}
        >
          Loading Modal
        </TextView>
        <View style={styles.componentGroup}>
          <Button
            title="Show Loading Modal"
            onPress={() => {
              setShowLoading(true);
              setTimeout(() => setShowLoading(false), 3000);
            }}
            variant="primary"
            theme={theme}
          />
        </View>
      </View>
      <Divider style={styles.divider} />
      <LoadingModal visible={showLoading} theme={theme} />
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
