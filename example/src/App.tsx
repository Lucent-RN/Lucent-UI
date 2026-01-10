import {
  Accordion,
  Badge,
  Button,
  Checkbox,
  CheckboxGroup,
  Divider,
  IconButton,
  List,
  LoadingModal,
  OTPInput,
  RadioButton,
  RadioButtonGroup,
  Stepper,
  TabViewGroup,
  TextDivider,
  TextInput,
  TextView,
  Toggle,
  ToggleGroup,
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
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [checkboxGroupItems, setCheckboxGroupItems] = useState([
    { name: '1', label: 'Option 1', value: false },
    { name: '2', label: 'Option 2', value: false },
    { name: '3', label: 'Option 3', value: false },
  ]);
  const [radioSelected, setRadioSelected] = useState('option1');
  const [toggleValue, setToggleValue] = useState(false);
  const [toggleGroupItems, setToggleGroupItems] = useState([
    { id: '1', label: 'Toggle 1', value: false },
    { id: '2', label: 'Toggle 2', value: false },
    { id: '3', label: 'Toggle 3', value: false },
  ]);
  const [activeTab, setActiveTab] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

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

        <Divider style={styles.divider} />

        {/* Checkbox Section */}
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

        {/* RadioButton Section */}
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

        {/* Toggle Section */}
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

        {/* IconButton Section */}
        <View style={styles.section}>
          <TextView
            style={[
              styles.sectionTitle,
              { color: theme === 'light' ? '#000000' : '#FFFFFF' },
            ]}
          >
            Icon Button
          </TextView>
          <View
            style={[
              styles.componentGroup,
              { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
            ]}
          >
            <IconButton
              icon="⭐"
              onPress={() => console.log('Icon pressed')}
              variant="primary"
              size="lg"
              theme={theme}
            />
            <IconButton
              icon="❤️"
              onPress={() => console.log('Icon pressed')}
              variant="secondary"
              size="lg"
              theme={theme}
            />
            <IconButton
              icon="🔥"
              onPress={() => console.log('Icon pressed')}
              variant="ghost"
              size="lg"
              theme={theme}
            />
          </View>
        </View>

        <Divider style={styles.divider} />

        {/* Stepper Section */}
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

        {/* Accordion Section */}
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

        {/* List Section */}
        <View style={styles.section}>
          <TextView
            style={[
              styles.sectionTitle,
              { color: theme === 'light' ? '#000000' : '#FFFFFF' },
            ]}
          >
            List
          </TextView>
          <View style={styles.componentGroup}>
            <List
              title="Sample List"
              data={[
                {
                  leftElement: <TextView>Item 1</TextView>,
                  rightElement: <TextView>→</TextView>,
                  onPress: () => console.log('Item 1 pressed'),
                },
                {
                  leftElement: <TextView>Item 2</TextView>,
                  rightElement: <TextView>→</TextView>,
                  onPress: () => console.log('Item 2 pressed'),
                },
                {
                  leftElement: <TextView>Item 3</TextView>,
                  rightElement: <TextView>→</TextView>,
                  onPress: () => console.log('Item 3 pressed'),
                },
              ]}
              theme={theme}
            />
          </View>
        </View>

        <Divider style={styles.divider} />

        {/* TabView Section */}
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
              tabs={[
                { title: 'Tab 1' },
                { title: 'Tab 2' },
                { title: 'Tab 3' },
              ]}
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
