import {
  Badge,
  Button,
  Divider,
  LoadingModal,
  OTPInput,
  TextDivider,
  TextInput,
  TextView,
} from 'lucent-ui';
import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

export default function App() {
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showLoading, setShowLoading] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

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

        {/* Button Section */}
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
              size="sm"
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
              size="lg"
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

        {/* TextInput Section */}
        <View style={styles.section}>
          <TextView
            style={[
              styles.sectionTitle,
              { color: theme === 'light' ? '#000000' : '#FFFFFF' },
            ]}
          >
            Text Input
          </TextView>
          <View style={styles.componentGroup}>
            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              theme={theme}
              isFloatingLabel={true}
            />
            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
              theme={theme}
              isFloatingLabel={true}
            />
          </View>
        </View>

        <Divider style={styles.divider} />

        {/* OTP Input Section */}
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

        {/* Badge Section */}
        <View style={styles.section}>
          <TextView
            style={[
              styles.sectionTitle,
              { color: theme === 'light' ? '#000000' : '#FFFFFF' },
            ]}
          >
            Badges
          </TextView>
          <View
            style={[
              styles.componentGroup,
              { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
            ]}
          >
            <Badge text="New" theme={theme} />
            <Badge text="Hot" theme={theme} />
            <Badge text="Sale" theme={theme} />
            <Badge text="Featured" theme={theme} />
          </View>
        </View>

        <Divider style={styles.divider} />

        {/* Divider Section */}
        <View style={styles.section}>
          <TextView
            style={[
              styles.sectionTitle,
              { color: theme === 'light' ? '#000000' : '#FFFFFF' },
            ]}
          >
            Dividers
          </TextView>
          <View style={styles.componentGroup}>
            <Divider />
            <TextDivider label="OR" labelPosition="center" />
            <TextDivider label="Left" labelPosition="left" />
            <TextDivider label="Right" labelPosition="right" />
          </View>
        </View>

        <Divider style={styles.divider} />

        {/* TextView Section */}
        <View style={styles.section}>
          <TextView
            style={[
              styles.sectionTitle,
              { color: theme === 'light' ? '#000000' : '#FFFFFF' },
            ]}
          >
            Text View
          </TextView>
          <View style={styles.componentGroup}>
            <TextView
              style={[
                styles.textExample,
                { color: theme === 'light' ? '#000000' : '#FFFFFF' },
              ]}
            >
              This is a TextView component with default styling.
            </TextView>
            <TextView
              style={[
                styles.textExample,
                { color: theme === 'light' ? '#000000' : '#FFFFFF' },
              ]}
            >
              You can customize it with your own styles.
            </TextView>
          </View>
        </View>

        <Divider style={styles.divider} />

        {/* Loading Modal Section */}
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

        {/* Footer Spacing */}
        <View style={styles.footer} />
      </ScrollView>

      {/* Loading Modal */}
      <LoadingModal visible={showLoading} theme={theme} />
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
    fontSize: 28,
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
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
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
  textExample: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
  },
  footer: {
    height: 40,
  },
});
