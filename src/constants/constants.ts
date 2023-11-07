import {Dimensions} from 'react-native';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
const screenAspectRatio =
  screenWidth < screenHeight
    ? screenHeight / screenWidth
    : screenWidth / screenHeight;

export default {
  screenWidth,
  screenHeight,
  screenAspectRatio,
};
