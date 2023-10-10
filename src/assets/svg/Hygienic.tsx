import * as React from "react"
import Svg, { Path, Ellipse, Circle } from "react-native-svg"
import CustomSvgProps, { SetDefaultColorIfNull } from "../CustomSvgProps";

const SvgComponent = (props: CustomSvgProps) => {

  const { backgroundColor, primaryColor, secondaryColor, borderColor } = SetDefaultColorIfNull(props);

  return (
    <Svg
      viewBox="0 0 800 800"
      {...props}
    >
      <Path
        d="M537.8 366.9C383.5 333 510 119.1 298.6 136.8S-113.3 641.3 262 755.3s568.8-324.2 275.8-388.4z"
        fill={backgroundColor}
      />
      <Path
        d="M200.6 271.2V650h149.7V271.2l-37.4-40.3H238z"
        fill={secondaryColor}
      />
      <Path
        d="M312.9 230.9v-32.3H238v32.3M253 198.6v-32.2h44.9v32.2M200.6 319.5h149.7v274H200.6z"
        fill={secondaryColor}
      />
      <Path
        d="M230.5 367.9h89.8v177.3h-89.8z"
        fill={secondaryColor}
      />
      <Path
        d="M320.4 400.1h-44.9c-8.3 0-15 7.2-15 16.1 0 8.9 6.7 16.1 15 16.1s15 7.2 15 16.1c0 8.9-6.7 16.1-15 16.1s-15 7.2-15 16.1c0 8.9 6.7 16.1 15 16.1h44.9M380.2 456.5h179.6v161.2c0 17.8-13.4 32.2-29.9 32.2H410.2c-16.5 0-29.9-14.4-29.9-32.2V456.5h-.1zM500 456.5V392l15-32.2V247h15c8.3 0 15 7.2 15 16.1v104.8l-15 32.2v56.4"
        fill={secondaryColor}
      />
      <Path
        d="M515 247h-30v80.6h30M485 271.2h30M485 295.4h30M410.2 456.5V392l15-32.2V247h15c8.3 0 15 7.2 15 16.1v104.8l-15 32.2v56.4"
        fill={secondaryColor}
      />
      <Path
        d="M425.1 247h-29.9v80.6h29.9M395.2 271.2h29.9M395.2 295.4h29.9M380.2 488.8h179.7"
        fill={secondaryColor}
      />
      <Ellipse
        cx={619.7}
        cy={247}
        rx={29.9}
        ry={32.2}
        fill={secondaryColor}
      />
      <Ellipse
        cx={597.3}
        cy={351.8}
        rx={22.5}
        ry={24.2}
        fill={secondaryColor}
      />
      <Ellipse
        cx={537.4}
        cy={190.6}
        rx={22.5}
        ry={24.2}
        fill={secondaryColor}
      />
      <Path
        d="M470.1 488.8v64.5c0 8.9 6.7 16.1 15 16.1s15-7.2 15-16.1c0-8.9 6.7-16.1 15-16.1s15 7.2 15 16.1v32.2c0 8.9 6.7 16.1 15 16.1s15-7.2 15-16.1v-96.7"
        fill={secondaryColor}
      />
      <Circle
        cx={545.8}
        cy={201}
        r={17.4}
        fill={primaryColor}
      />
      <Circle
        cx={631.5}
        cy={260.5}
        r={22.1}
        fill={primaryColor}
      />
      <Circle
        cx={606.3}
        cy={362.8}
        r={16.4}
        fill={primaryColor}
      />
      <Path
        d="M226.3 620h121v30h-121zM410.2 500.2h149.7V611c0 12.2-11.2 22.2-24.9 22.2h-99.8c-13.8 0-24.9-9.9-24.9-22.2V500.2h-.1z"
        fill={primaryColor}
      />
      <Path
        d="M470.1 488.8v64.5c0 8.9 6.7 16.1 15 16.1s15-7.2 15-16.1c0-8.9 6.7-16.1 15-16.1s15 7.2 15 16.1v32.2c0 8.9 6.7 16.1 15 16.1s15-7.2 15-16.1v-96.7"
        fill={secondaryColor}
      />
      <Path
        d="M320.4 403.5h-44.9c-8.3 0-15 7.2-15 16.1 0 8.9 6.7 16.1 15 16.1s15 7.2 15 16.1c0 8.9-6.7 16.1-15 16.1s-15 7.2-15 16.1c0 8.9 6.7 16.1 15 16.1h44.9M340.4 319.5c1 0 5.3-1.1 5.7-1.9 2.4-5 1.1-44.8.5-45.1-3.7-5.5-7.5-11-11.2-16.4h-74.8l-37.4 40.3v23.2c16.6.6 113.6.1 117.2-.1z"
        fill={primaryColor}
      />
      <Path
        d="M200.6 274.5v378.8h149.7V274.5l-37.4-40.3H238zM312.9 234.2V202H238v32.2M253 202v-32.3h44.9V202"
        fill="none"
        stroke={borderColor}
        strokeWidth={14}
        strokeLinejoin="round"
        strokeMiterlimit={50}
      />
      <Path
        d="M200.6 322.9h149.7v274H200.6z"
        fill="none"
        stroke={borderColor}
        strokeWidth={14}
        strokeLinejoin="round"
        strokeMiterlimit={50}
      />
      <Path
        d="M230.6 371.2h89.8v177.3h-89.8z"
        fill="none"
        stroke={borderColor}
        strokeWidth={14}
        strokeLinejoin="round"
        strokeMiterlimit={50}
      />
      <Path
        d="M320.4 403.5h-44.9c-8.3 0-15 7.2-15 16.1 0 8.9 6.7 16.1 15 16.1s15 7.2 15 16.1c0 8.9-6.7 16.1-15 16.1s-15 7.2-15 16.1c0 8.9 6.7 16.1 15 16.1h44.9M380.2 459.9h179.6v161.2c0 17.8-13.4 32.2-29.9 32.2H410.2c-16.5 0-29.9-14.4-29.9-32.2V459.9h-.1zM500 459.9v-64.5l15-32.2V250.3h15c8.3 0 15 7.2 15 16.1v104.8l-15 32.2v56.4"
        fill="none"
        stroke={borderColor}
        strokeWidth={14}
        strokeLinejoin="round"
        strokeMiterlimit={50}
      />
      <Path
        d="M515 250.3h-30v80.6h30M485 274.5h30M485 298.7h30M410.2 459.9v-64.5l15-32.2V250.3h15c8.3 0 15 7.2 15 16.1v104.8l-15 32.2v56.4"
        fill="none"
        stroke={borderColor}
        strokeWidth={14}
        strokeLinejoin="round"
        strokeMiterlimit={50}
      />
      <Path
        d="M425.1 250.3h-29.9v80.6h29.9M395.2 274.5h29.9M395.2 298.7h29.9M380.2 492.1h179.7"
        fill="none"
        stroke={borderColor}
        strokeWidth={14}
        strokeLinejoin="round"
        strokeMiterlimit={50}
      />
      <Ellipse
        cx={619.7}
        cy={250.3}
        rx={29.9}
        ry={32.2}
        fill="none"
        stroke={borderColor}
        strokeWidth={14}
        strokeLinejoin="round"
        strokeMiterlimit={50}
      />
      <Ellipse
        cx={597.3}
        cy={355.1}
        rx={22.5}
        ry={24.2}
        fill="none"
        stroke={borderColor}
        strokeWidth={14}
        strokeLinejoin="round"
        strokeMiterlimit={50}
      />
      <Ellipse
        cx={537.4}
        cy={193.9}
        rx={22.5}
        ry={24.2}
        fill="none"
        stroke={borderColor}
        strokeWidth={14}
        strokeLinejoin="round"
        strokeMiterlimit={50}
      />
      <Path
        d="M470.1 492.1v64.5c0 8.9 6.7 16.1 15 16.1s15-7.2 15-16.1c0-8.9 6.7-16.1 15-16.1s15 7.2 15 16.1v32.2c0 8.9 6.7 16.1 15 16.1s15-7.2 15-16.1v-96.7"
        fill="none"
        stroke={borderColor}
        strokeWidth={14}
        strokeLinejoin="round"
        strokeMiterlimit={50}
      />
    </Svg>
  )
}

export default SvgComponent
