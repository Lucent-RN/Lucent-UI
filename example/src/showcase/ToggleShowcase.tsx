import { Divider, TextView, Toggle, ToggleGroup } from 'lucent-ui';
import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import type { AppearanceMode } from 'lucent-ui';

interface ToggleShowcaseProps {
  theme: AppearanceMode;
}

export default function ToggleShowcase({ theme }: ToggleShowcaseProps) {
  const [toggleValue, setToggleValue] = useState(false);
  const [toggleGroupItems, setToggleGroupItems] = useState([
    { id: '1', label: 'Toggle 1', value: false },
    { id: '2', label: 'Toggle 2', value: false },
    { id: '3', label: 'Toggle 3', value: false },
  ]);

  return (
    <>
      <View style={styles.section}>
        <TextView
          style={[
            styles.sectionTitle,
            { color: theme === 'light' ? '#000000' : '#FFFFFF' },
          ]}
        >
          Toggle
        </TextView>
        <View style={styles.componentGroup}>
          <Toggle
            label="Toggle Switch"
            value={toggleValue}
            onValueChange={setToggleValue}
            theme={theme}
          />
          <Toggle
            label="Disabled Toggle"
            value={false}
            disabled={true}
            theme={theme}
          />
          <ToggleGroup
            items={toggleGroupItems.map((item) => ({
              id: item.id,
              label: item.label,
              value: item.value,
              onValueChange: (value) => {
                setToggleGroupItems((prev) =>
                  prev.map((i) => (i.id === item.id ? { ...i, value } : i))
                );
              },
            }))}
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
