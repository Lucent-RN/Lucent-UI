import { Divider, Stepper, TextView } from 'lucent-ui';
import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import type { AppearanceMode } from 'lucent-ui';

interface StepperShowcaseProps {
  theme: AppearanceMode;
}

export default function StepperShowcase({ theme }: StepperShowcaseProps) {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <>
      <View style={styles.section}>
        <TextView
          style={[
            styles.sectionTitle,
            { color: theme === 'light' ? '#000000' : '#FFFFFF' },
          ]}
        >
          Stepper
        </TextView>
        <View style={styles.componentGroup}>
          <Stepper
            steps={[
              {
                label: 'Step 1',
                icon: '1',
                children: <TextView>Step 1 Content</TextView>,
              },
              {
                label: 'Step 2',
                icon: '2',
                children: <TextView>Step 2 Content</TextView>,
              },
              {
                label: 'Step 3',
                icon: '3',
                children: <TextView>Step 3 Content</TextView>,
              },
            ]}
            activeStep={activeStep}
            onStepChange={setActiveStep}
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
