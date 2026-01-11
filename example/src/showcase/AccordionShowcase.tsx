import { Accordion, Divider, TextView } from 'lucent-ui';
import { View, StyleSheet } from 'react-native';
import type { AppearanceMode } from 'lucent-ui';

interface AccordionShowcaseProps {
  theme: AppearanceMode;
}

export default function AccordionShowcase({ theme }: AccordionShowcaseProps) {
  return (
    <>
      <View style={styles.section}>
        <TextView
          style={[
            styles.sectionTitle,
            { color: theme === 'light' ? '#000000' : '#FFFFFF' },
          ]}
        >
          Accordion
        </TextView>
        <View style={styles.componentGroup}>
          <Accordion
            title="Accordion Item 1"
            content="This is the content for accordion item 1. You can put any content here."
            theme={theme}
          />
          <Accordion
            title="Accordion Item 2"
            content="This is the content for accordion item 2. It can be expanded and collapsed."
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
