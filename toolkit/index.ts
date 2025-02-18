import { NativeModules, Dimensions, Platform, PixelRatio } from 'react-native';
import { UseDetectDevice, UseScale } from './type';
import { devicesWithNotch } from './devicesWithNotch';

const { UtilsScale } = NativeModules;
const { checkTablet, checkSmallDevice,
    checkhasNotch, getModel, getBrand,
    deviceInch
} = UtilsScale.getConstants();

const getFontScale = PixelRatio.getFontScale();

const hasNotch = () => {
    if (Platform.OS === 'ios') {
        if (checkTablet) {
            return false;
        } else {
            return checkhasNotch;
        }
    } else {
        const model = getModel;
        const brand = getBrand;

        const notch = devicesWithNotch.findIndex(item => item.brand.toLowerCase() === brand.toLowerCase() && item.model.toLowerCase() === model.toLowerCase()) !== -1;
        return notch;
    }
}

const useScale: UseScale = {
    fontScale: (number: number = 1) => {
      const value = (deviceInch + (getFontScale + 1.5)) / 10;
      const scale = number * Number(value.toFixed(1));
      return scale;
    },
    scale: (number: number = 1) => {
      const value = (deviceInch + (getFontScale + 2)) / 10;
      const scale = number * Number(value.toFixed(1));
      return scale;
    },
  };

const useDetectDevice: UseDetectDevice = {
    isTablet: checkTablet,
    isSmallDevice: checkSmallDevice,
    isAndroid: Platform.OS === 'android',
    isIOS: Platform.OS === 'ios',
    hasNotch: hasNotch(),
    deviceInch: Number(deviceInch.toFixed(1)),
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
}

export { useScale, useDetectDevice }