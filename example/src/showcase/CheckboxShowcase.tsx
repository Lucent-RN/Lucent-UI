import { Checkbox, CheckboxGroup, Divider, TextView } from 'lucent-ui';
import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import type { AppearanceMode } from 'lucent-ui';

interface CheckboxShowcaseProps {
  theme: AppearanceMode;
}

export default function CheckboxShowcase({ theme }: CheckboxShowcaseProps) {
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [checkboxGroupItems, setCheckboxGroupItems] = useState([
    { name: '1', label: 'Option 1', value: false },
    { name: '2', label: 'Option 2', value: false },
    { name: '3', label: 'Option 3', value: false },
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
          Checkbox
        </TextView>
        <View style={styles.componentGroup}>
          <Checkbox
            label="Single Checkbox"
            checked={checkboxChecked}
            onChange={setCheckboxChecked}
            theme={theme}
          />
          <Checkbox
            label="Disabled Checkbox"
            checked={false}
            disabled={true}
            theme={theme}
          />
          <CheckboxGroup
            items={checkboxGroupItems.map((item) => ({
              name: item.name,
              label: item.label,
              value: item.value,
              onChange: (checked) => {
                setCheckboxGroupItems((prev) =>
                  prev.map((i) =>
                    i.name === item.name ? { ...i, value: checked } : i
                  )
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
