import { Dimensions, Platform } from 'react-native';

const DESIGN_WIDTH = 375;
const DESIGN_HEIGHT = 812;
const SMALL_WIDTH = 402;

function getWidth(): number {
  return Dimensions.get('window').width;
}

function getHeight(): number {
  return Dimensions.get('window').height;
}

const isSmallScreen = getWidth() < SMALL_WIDTH;

function scaleWidth<T extends number>(value: T): T {
  const width = getWidth();
  const height = getHeight();
  // @ts-ignore
  const isPad = Platform.OS === 'ios' && Platform.isPad === true;
  const isLandscape = width > height;

  // For iPad in landscape mode, use min(width, height) as base to prevent over-scaling
  const effectiveWidth = isPad && isLandscape ? Math.min(width, height) : width;
  return ((effectiveWidth * value) / DESIGN_WIDTH) as T;
}

function scaleHeight<T extends number>(value: T): T {
  const width = getWidth();
  const height = getHeight();
  // @ts-ignore
  const isPad = Platform.OS === 'ios' && Platform.isPad === true;
  const isLandscape = width > height;

  // For iPad in landscape mode, use min(width, height) as base height to prevent over-scaling
  const effectiveHeight =
    isPad && isLandscape ? Math.min(width, height) : height;
  return ((effectiveHeight * value) / DESIGN_HEIGHT) as T;
}

// Export width as a getter function to always get current value
const width = getWidth();

export { isSmallScreen, scaleHeight, scaleWidth, width };
