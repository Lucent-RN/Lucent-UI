import { Button, Divider, TextView } from 'lucent-ui';
import { View, StyleSheet } from 'react-native';
import type { AppearanceMode } from 'lucent-ui';

interface ButtonShowcaseProps {
  theme: AppearanceMode;
}

export default function ButtonShowcase({ theme }: ButtonShowcaseProps) {
  return (
    <>
      <View style={styles.section}>
        <TextView
          style={[
            styles.sectionTitle,
            { color: theme === 'light' ? '#000000' : '#FFFFFF' },
          ]}
        >
          Buttons
        </TextView>
        <View style={styles.componentGroup}>
          <Button
            title="Primary"
            onPress={() => console.log('Primary pressed')}
            variant="primary"
            size="md"
            theme={theme}
          />
          <Button
            title="Secondary"
            onPress={() => console.log('Secondary pressed')}
            variant="secondary"
            size="md"
            theme={theme}
          />
          <Button
            title="Underline"
            onPress={() => console.log('Underline pressed')}
            variant="underline"
            size="md"
            theme={theme}
          />
          <Button
            title="Destructive"
            onPress={() => console.log('Destructive pressed')}
            variant="destructive"
            size="md"
            theme={theme}
          />
        </View>
        <View style={styles.componentGroup}>
          <Button
            title="Small"
            onPress={() => {}}
            variant="primary"
            size="md"
            theme={theme}
          />
          <Button
            title="Medium"
            onPress={() => {}}
            variant="primary"
            size="md"
            theme={theme}
          />
          <Button
            title="Large"
            onPress={() => {}}
            variant="primary"
            size="md"
            theme={theme}
          />
        </View>
        <View style={styles.componentGroup}>
          <Button
            title="Loading"
            onPress={() => {}}
            variant="primary"
            isLoading={true}
            loadingMode="replace"
            theme={theme}
          />
          <Button
            title="Disabled"
            onPress={() => {}}
            variant="primary"
            disabled={true}
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
