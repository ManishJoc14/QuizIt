import { ComponentProps } from 'react';

import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight, SymbolViewProps } from 'expo-symbols';

type IconMapping = Record<SymbolViewProps['name'], ComponentProps<typeof MaterialIcons>['name']>;
export type IconSymbolName = keyof typeof MAPPING;

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING = {
  'house.fill': 'home', // Home icon
  'paperplane.fill': 'send',  // Send icon
  'chevron.left.forwardslash.chevron.right': 'code',  // Code icon
  'person.fill': 'person', // Person icon
  'chevron.right': 'chevron-right',   // Right chevron icon
  'chevron.left': 'chevron-left',    // Left chevron icon
  'chevron.up': 'keyboard-arrow-up',      // Up chevron icon
  'chevron.down': 'keyboard-arrow-down',  // Down chevron icon 
  'arrow.up.and.down': 'import-export', // Import-export icon
  'sun.max': 'wb-sunny',  // Sunny icon
  'moon': 'brightness-2', // Moon icon
  'magnifyingglass': 'search', // Search icon
  'bell': 'notifications', // Bell icon
  'folder': 'folder', // Folder icon
  'square.grid.2x2.fill': 'widgets', // Grid icon
  'gamecontroller': 'gamepad',  // Game controller icon
  'ellipsis': 'more-horiz', // Ellipsis icon
  'trash.fill': 'delete',  // Trash icon
  'square.and.pencil': 'mode-edit', // Edit icon
  'square.and.arrow.up': 'share', // Share icon
  'checkmark.circle': 'check-circle', // Checkmark icon
  'multiply.circle': 'cancel', // Cancel icon
  'gear': 'settings', // Settings icon
} as IconMapping;

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
}
