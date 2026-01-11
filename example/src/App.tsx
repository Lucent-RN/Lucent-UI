import { TextView } from 'lucent-ui';
import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import AccordionShowcase from './showcase/AccordionShowcase';
import BadgeShowcase from './showcase/BadgeShowcase';
import ButtonShowcase from './showcase/ButtonShowcase';
import CheckboxShowcase from './showcase/CheckboxShowcase';
import DialogShowcase from './showcase/DialogShowcase';
import DividerShowcase from './showcase/DividerShowcase';
import IconButtonShowcase from './showcase/IconButtonShowcase';
import ListShowcase from './showcase/ListShowcase';
import LoadingModalShowcase from './showcase/LoadingModalShowcase';
import OTPInputShowcase from './showcase/OTPInputShowcase';
import RadioButtonShowcase from './showcase/RadioButtonShowcase';
import StepperShowcase from './showcase/StepperShowcase';
import TabViewShowcase from './showcase/TabViewShowcase';
import TextInputShowcase from './showcase/TextInputShowcase';
import TextViewShowcase from './showcase/TextViewShowcase';
import ToggleShowcase from './showcase/ToggleShowcase';
import type { AppearanceMode } from 'lucent-ui';

export default function App() {
  const [theme, setTheme] = useState<AppearanceMode>('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme === 'light' ? '#FFFFFF' : '#000000' },
      ]}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TextView
            style={[
              styles.title,
              { color: theme === 'light' ? '#000000' : '#FFFFFF' },
            ]}
          >
            Lucent UI Components
          </TextView>
          <TouchableOpacity onPress={toggleTheme} style={styles.themeToggle}>
            <TextView style={styles.themeText}>
              {theme === 'light' ? '🌙' : '☀️'}{' '}
              {theme === 'light' ? 'Dark' : 'Light'}
            </TextView>
          </TouchableOpacity>
        </View>

        {/* Showcase Components */}
        <ButtonShowcase theme={theme} />
        <TextInputShowcase theme={theme} />
        <OTPInputShowcase theme={theme} />
        <BadgeShowcase theme={theme} />
        <DividerShowcase theme={theme} />
        <TextViewShowcase theme={theme} />
        <LoadingModalShowcase theme={theme} />
        <DialogShowcase theme={theme} />
        <CheckboxShowcase theme={theme} />
        <RadioButtonShowcase theme={theme} />
        <ToggleShowcase theme={theme} />
        <IconButtonShowcase theme={theme} />
        <StepperShowcase theme={theme} />
        <AccordionShowcase theme={theme} />
        <ListShowcase theme={theme} />
        <TabViewShowcase theme={theme} />

        {/* Footer Spacing */}
        <View style={styles.footer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  header: {
    marginBottom: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  themeToggle: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F0F0F0',
  },
  themeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    height: 40,
  },
});
