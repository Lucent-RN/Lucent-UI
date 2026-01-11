import { Divider, OTPInput, TextView } from 'lucent-ui';
import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import type { AppearanceMode } from 'lucent-ui';

interface OTPInputShowcaseProps {
  theme: AppearanceMode;
}

export default function OTPInputShowcase({ theme }: OTPInputShowcaseProps) {
  const [otp, setOtp] = useState('');

  return (
    <>
      <View style={styles.section}>
        <TextView
          style={[
            styles.sectionTitle,
            { color: theme === 'light' ? '#000000' : '#FFFFFF' },
          ]}
        >
          OTP Input
        </TextView>
        <View style={styles.componentGroup}>
          <OTPInput
            numberOfDigits={4}
            onChange={setOtp}
            theme={theme}
            autoFocus={false}
          />
          <TextView
            style={[
              styles.helperText,
              { color: theme === 'light' ? '#666666' : '#999999' },
            ]}
          >
            OTP: {otp || 'Enter code'}
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
  helperText: {
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
});
