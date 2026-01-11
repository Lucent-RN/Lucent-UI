import type { AppearanceMode } from 'lucent-ui';
import { TabViewGroup, TextView } from 'lucent-ui';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

interface TabViewShowcaseProps {
  theme: AppearanceMode;
}

export default function TabViewShowcase({ theme }: TabViewShowcaseProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <View style={styles.section}>
        <TextView
          style={[
            styles.sectionTitle,
            { color: theme === 'light' ? '#000000' : '#FFFFFF' },
          ]}
        >
          Tab View
        </TextView>
        <View style={styles.componentGroup}>
          <TabViewGroup
            tabs={[{ title: 'Tab 1' }, { title: 'Tab 2' }, { title: 'Tab 3' }]}
            activeTabIndex={activeTab}
            onTabChange={(index) => setActiveTab(index)}
            theme={theme}
          />
          <TextView
            style={[
              styles.helperText,
              { color: theme === 'light' ? '#666666' : '#999999' },
            ]}
          >
            Active Tab: {activeTab + 1}
          </TextView>
        </View>
      </View>
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
  helperText: {
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
});
