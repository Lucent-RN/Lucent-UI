# Lucent UI

A collection of pure, reusable React Native UI components extracted from the Lucent app. These components are designed to be used independently across multiple projects.

## Features

- 🎨 **Theme System**: Configurable light/dark theme support
- 📱 **Cross-platform**: Works on iOS and Android
- 🎯 **Pure Components**: No dependencies on app-specific code
- 🔧 **TypeScript**: Fully typed components
- 📦 **Modular**: Import only what you need

## Installation

```bash
npm install lucent-ui
# or
yarn add lucent-ui
```

### Peer Dependencies

Make sure you have these installed:

```bash
npm install react react-native react-native-safe-area-context
```

## Usage

### Basic Example

```tsx
import { Button, TextView, TextDivider } from 'lucent-ui';

function App() {
  return (
    <View>
      <TextView>Hello World</TextView>
      <Button
        title="Click Me"
        onPress={() => console.log('Pressed')}
        variant="primary"
        size="md"
      />
      <TextDivider label="OR" />
    </View>
  );
}
```

### With Theme

```tsx
import { Button, AppearanceMode } from 'lucent-ui';

function App() {
  return (
    <Button
      title="Dark Button"
      onPress={() => {}}
      theme="dark"
      variant="primary"
    />
  );
}
```

## Components

### Available Components

- **Button**: Customizable button with variants (primary, secondary, underline, destructive)
- **TextView**: Text component with default styling
- **TextDivider**: Divider with optional label
- **TextInput**: Floating label text input (iOS/Android specific)
- **Checkbox**: Customizable checkbox component
- **RadioButton**: Radio button group
- **Toggle**: Toggle switch component
- **IconButton**: Button with icon support
- **LoadingModal**: Loading modal with animation
- **OTPInput**: OTP code input
- **Stepper**: Step indicator component
- **Badge**: Badge component
- **Accordion**: Accordion component
- **List**: List component
- **TabView**: Tab view component
- **DatePickerModal**: Date picker modal
- **CircularSlider**: Circular slider component
- **Divider**: Simple divider component

### Component Status

✅ **Completed**:

- Button
- TextView
- TextDivider
- Theme System
- Utils & Constants

🚧 **In Progress**:

- Other components are being migrated from the Lucent app

## Theme System

The library includes a comprehensive theme system with light and dark modes.

### Using Theme

```tsx
import { getThemeColors, AppearanceMode } from 'lucent-ui';

const colors = getThemeColors('light'); // or 'dark'
```

### Customizing Theme

You can extend the theme by importing and modifying the color constants:

```tsx
import { LIGHT_COLORS, DARK_COLORS } from 'lucent-ui';

// Customize colors as needed
const customColors = {
  ...LIGHT_COLORS,
  button: {
    ...LIGHT_COLORS.button,
    primary: '#FF0000', // Custom primary color
  },
};
```

## Project Structure

```
lucent-ui/
├── src/
│   ├── components/      # UI components
│   │   └── ui/         # Individual components
│   ├── theme/          # Theme configuration
│   ├── utils/          # Utility functions
│   ├── constants/      # Constants
│   └── index.tsx       # Main export
├── lib/                # Built files
└── package.json
```

## Development

### Building

```bash
npm run prepare
```

### Type Checking

```bash
npm run typecheck
```

### Linting

```bash
npm run lint
```

## Migration from Lucent App

If you're migrating components from the Lucent app:

1. **Remove app-specific dependencies**: Replace `@/app/theme` with `../../theme`
2. **Remove hooks**: Replace hooks like `useAppTheme()` with props
3. **Remove asset dependencies**: Make components accept icon sources as props
4. **Update imports**: Change from `@/shared/utils` to `../../utils`
5. **Make components pure**: Ensure no side effects or external state dependencies

### Example Migration

**Before (Lucent app)**:

```tsx
import { scaleWidth } from '@/app/theme';
import { useAppTheme } from '@/providers/theme-provider';

function Component() {
  const { colors } = useAppTheme();
  // ...
}
```

**After (lucent-ui)**:

```tsx
import { scaleWidth } from '../../theme';
import { getThemeColors, AppearanceMode } from '../../utils';

interface ComponentProps {
  theme?: AppearanceMode;
}

function Component({ theme = 'light' }: ComponentProps) {
  const colors = getThemeColors(theme);
  // ...
}
```

## Contributing

1. Extract components from `Lucent/src/shared/components`
2. Remove app-specific dependencies
3. Make components pure (accept props instead of using hooks)
4. Update imports to use relative paths
5. Add to exports in `src/components/ui/index.ts`
6. Test in example app

## License

MIT

## Author

Kien Nguyen <trungkiennguyen0310@gmail.com>
