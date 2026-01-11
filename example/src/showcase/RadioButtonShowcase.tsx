import { Divider, RadioButton, RadioButtonGroup, TextView } from 'lucent-ui';
import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import type { AppearanceMode } from 'lucent-ui';

interface RadioButtonShowcaseProps {
  theme: AppearanceMode;
}

export default function RadioButtonShowcase({
  theme,
}: RadioButtonShowcaseProps) {
  const [radioSelected, setRadioSelected] = useState('option1');

  return (
    <>
      <View style={styles.section}>
        <TextView
          style={[
            styles.sectionTitle,
            { color: theme === 'light' ? '#000000' : '#FFFFFF' },
          ]}
        >
          Radio Button
        </TextView>
        <View style={styles.componentGroup}>
          <RadioButton
            label="Option 1"
            selected={radioSelected === 'option1'}
            onPress={() => setRadioSelected('option1')}
            theme={theme}
          />
          <RadioButton
            label="Option 2"
            selected={radioSelected === 'option2'}
            onPress={() => setRadioSelected('option2')}
            theme={theme}
          />
          <RadioButton
            label="Disabled"
            selected={false}
            disabled={true}
            theme={theme}
          />
          <RadioButtonGroup
            options={[
              { value: 'group1', label: 'Group Option 1' },
              { value: 'group2', label: 'Group Option 2' },
              { value: 'group3', label: 'Group Option 3' },
            ]}
            selectedValue={radioSelected}
            onChange={setRadioSelected}
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
