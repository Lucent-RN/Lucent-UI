# Migration Guide: Extracting Components to Lucent UI

This guide helps you extract components from the Lucent app into the lucent-ui library.

## Step-by-Step Process

### 1. Identify Component Dependencies

Before extracting, check what the component depends on:

```bash
# Search for imports in the component
grep -r "from '@/" Lucent/src/shared/components/ui/[component-name]
```

Common dependencies to replace:

- `@/app/theme` → `../../theme`
- `@/shared/utils` → `../../utils`
- `@/shared/constants` → `../../constants`
- `@/shared/hooks` → Remove or make optional props
- `@/providers/*` → Remove, use props instead
- `@assets/*` → Make component accept assets as props

### 2. Create Component File Structure

```
lucent-ui/src/components/ui/[component-name]/
├── [ComponentName].tsx
├── utils.ts (if needed)
└── index.ts
```

### 3. Update Imports

**Before:**

```tsx
import { scaleWidth, fonts } from '@/app/theme';
import { getThemeColors } from '@/shared/utils';
import { useAppTheme } from '@/providers/theme-provider';
import { icons } from '@assets/icons';
```

**After:**

```tsx
import { scaleWidth, fonts } from '../../theme';
import { getThemeColors } from '../../utils';
// Remove hooks, use props instead
// Remove asset imports, accept as props
```

### 4. Remove Hook Dependencies

**Before:**

```tsx
function Component() {
  const { colors } = useAppTheme();
  const { isTablet } = useIsTablet();
  // ...
}
```

**After:**

```tsx
interface ComponentProps {
  theme?: AppearanceMode;
  isTablet?: boolean; // Optional, with default
}

function Component({ theme = 'light', isTablet = false }: ComponentProps) {
  const colors = getThemeColors(theme);
  // ...
}
```

### 5. Remove Asset Dependencies

**Before:**

```tsx
import { icons } from '@assets/icons';

function Component() {
  return <Image source={icons.back} />;
}
```

**After:**

```tsx
interface ComponentProps {
  icon?: ImageSourcePropType;
}

function Component({ icon }: ComponentProps) {
  return icon ? <Image source={icon} /> : null;
}
```

### 6. Update Component Exports

Add to `lucent-ui/src/components/ui/index.ts`:

```tsx
export * from './[component-name]';
```

### 7. Test the Component

Create a simple test in the example app to ensure it works:

```tsx
import { ComponentName } from 'lucent-ui';

function TestScreen() {
  return <ComponentName theme="light" />;
}
```

## Common Patterns

### Pattern 1: Theme Provider → Props

```tsx
// Before
const { colors } = useAppTheme();

// After
interface Props {
  theme?: AppearanceMode;
}
const colors = getThemeColors(theme || 'light');
```

### Pattern 2: Device Info Hook → Props

```tsx
// Before
const { isTablet } = useIsTablet();

// After
interface Props {
  isTablet?: boolean;
}
// Or use a utility function if needed
```

### Pattern 3: Asset Icons → Props

```tsx
// Before
import { icons } from '@assets/icons';
<Image source={icons.back} />;

// After
interface Props {
  icon?: ImageSourcePropType;
}
{
  icon && <Image source={icon} />;
}
```

### Pattern 4: Platform-specific Components

```tsx
// Before
import ComponentIOS from './component.ios';
import ComponentAndroid from './component.android';
const Component = Platform.select({
  ios: ComponentIOS,
  android: ComponentAndroid,
});

// After (keep the same pattern)
import ComponentIOS from './component.ios';
import ComponentAndroid from './component.android';
const Component = Platform.select({
  ios: ComponentIOS,
  android: ComponentAndroid,
});
```

## Checklist

- [ ] Component file created in `lucent-ui/src/components/ui/[name]/`
- [ ] All `@/app/theme` imports replaced with `../../theme`
- [ ] All `@/shared/*` imports replaced with relative paths
- [ ] Hooks removed and replaced with props
- [ ] Asset dependencies removed, accept as props
- [ ] Component exported in `src/components/ui/index.ts`
- [ ] TypeScript types are correct
- [ ] Component tested in example app
- [ ] README updated with component documentation

## Example: Complete Migration

### Original Component (Lucent/src/shared/components/ui/example/Example.tsx)

```tsx
import { scaleWidth } from '@/app/theme';
import { useAppTheme } from '@/providers/theme-provider';
import { icons } from '@assets/icons';
import React from 'react';
import { View, Image } from 'react-native';

export function Example() {
  const { colors } = useAppTheme();
  return (
    <View style={{ padding: scaleWidth(16) }}>
      <Image source={icons.logo} />
    </View>
  );
}
```

### Migrated Component (lucent-ui/src/components/ui/example/Example.tsx)

```tsx
import { scaleWidth } from '../../theme';
import { getThemeColors, AppearanceMode } from '../../utils';
import React from 'react';
import { View, Image, ImageSourcePropType } from 'react-native';

interface ExampleProps {
  theme?: AppearanceMode;
  icon?: ImageSourcePropType;
}

export function Example({ theme = 'light', icon }: ExampleProps) {
  const colors = getThemeColors(theme);
  return (
    <View style={{ padding: scaleWidth(16) }}>
      {icon && <Image source={icon} />}
    </View>
  );
}
```

### Export (lucent-ui/src/components/ui/example/index.ts)

```tsx
export { Example } from './Example';
export type { ExampleProps } from './Example';
```

### Update Main Index (lucent-ui/src/components/ui/index.ts)

```tsx
export * from './example';
```

## Notes

- Keep components pure (no side effects)
- Prefer props over hooks
- Make optional props have sensible defaults
- Maintain backward compatibility when possible
- Document all props with JSDoc comments
