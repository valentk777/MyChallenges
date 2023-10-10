import {SvgProps} from 'react-native-svg';

export default interface CustomSvgProps extends SvgProps {
  backgroundColor: string | null;
  primaryColor: string | null;
  secondaryColor: string | null;
  borderColor: string | null;
}

export const SetDefaultColorIfNull = (parameters: CustomSvgProps) => {
  let {backgroundColor, primaryColor, secondaryColor, borderColor} = parameters;

  if (backgroundColor == null || backgroundColor == undefined) {
    backgroundColor = '#079AA4';
  }

  if (primaryColor == null || primaryColor == undefined) {
    primaryColor = '#079AA4';
  }

  if (secondaryColor == null || secondaryColor == undefined) {
    secondaryColor = '#FFFFFF';
  }

  if (borderColor == null || borderColor == undefined) {
    borderColor = '#151B28';
  }

  return {
    backgroundColor,
    primaryColor,
    secondaryColor,
    borderColor,
  };
};
