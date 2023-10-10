import * as React from "react"
import Svg, { Path } from "react-native-svg"
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
        d="M141.6 332.1h239.2v46.1H141.6zM156.6 301.4h209.3v30.7H156.6z"
        fill={secondaryColor}
      />
      <Path
        d="m357.5 533.3 8.4-155.1H156.6l14.9 276.4H336M358.4 439.6H164M186.5 224.6h29.9v76.8h-29.9z"
        fill={secondaryColor}
      />
      <Path
        d="M283.7 439.6V501c0 8.5-6.7 15.4-15 15.4s-15-6.9-15-15.4v-15.4c0-8.5-6.7-15.4-15-15.4s-15 6.9-15 15.4v46.1c0 8.5-6.7 15.4-15 15.4s-15-6.9-15-15.4v-92.1M545.3 685.3H365.9c-16.5 0-29.9-13.8-29.9-30.7v-15.4h239.2v15.4c0 17-13.4 30.7-29.9 30.7z"
        fill={secondaryColor}
      />
      <Path
        d="M343.5 593.2h224.3c12.4 0 22.4 10.3 22.4 23s-10 23-22.4 23H343.5c-12.4 0-22.4-10.3-22.4-23-.1-12.7 10-23 22.4-23zM425.7 501h59.8c49.5 0 89.7 41.3 89.7 92.1H336c0-50.8 40.1-92.1 89.7-92.1zM590.1 245.4l-29.9-30.7-44.8 46.1-44.9-46.1-29.9 30.7 44.9 46.1-44.9 46.1 29.9 30.7 44.9-46.1 44.8 46.1 29.9-30.7-44.8-46.1z"
        fill={secondaryColor}
      />
      <Path
        d="M441.1 516.4h55.1c45.6 0 82.6 32.1 82.6 71.8H358.4c0-39.7 37-71.8 82.7-71.8zM168.1 345.8h212.8v27.4H168.1zM184.9 400h179.2v42.1H184.9z"
        fill={primaryColor}
      />
      <Path
        d="M458 272.3h112v21.9H458z"
        fill={primaryColor}
        transform="rotate(45.001 513.974 283.239)"
      />
      <Path
        d="M514 223.2h30v152.3h-30z"
        fill={primaryColor}
        transform="rotate(45.001 529.014 299.307)"
      />
      <Path
        d="M528.1 291.3h38.5v74.1h-38.5z"
        fill={primaryColor}
        transform="rotate(134.999 547.333 328.416)"
      />
      <Path
        d="M530.1 226.4h38.5v74.1h-38.5z"
        fill={primaryColor}
        transform="rotate(-136.828 549.401 263.508)"
      />
      <Path
        d="M141.6 327.1h239.2v46.1H141.6zM156.6 296.4h209.3v30.7H156.6z"
        stroke={borderColor}
        fill="none"
        strokeWidth={14}
        strokeLinejoin="round"
        strokeMiterlimit={50}
      />
      <Path
        d="m357.5 528.3 8.4-155.1H156.6l14.9 276.4H336M358.4 434.6H164M186.5 219.6h29.9v76.8h-29.9z"
        stroke={borderColor}
        fill="none"
        strokeWidth={14}
        strokeLinejoin="round"
        strokeMiterlimit={50}
      />
      <Path
        d="M283.7 434.6V496c0 8.5-6.7 15.4-15 15.4s-15-6.9-15-15.4v-15.4c0-8.5-6.7-15.4-15-15.4s-15 6.9-15 15.4v46.1c0 8.5-6.7 15.4-15 15.4s-15-6.9-15-15.4v-92.1M545.3 680.3H365.9c-16.5 0-29.9-13.8-29.9-30.7v-15.4h239.2v15.4c0 17-13.4 30.7-29.9 30.7z"
        stroke={borderColor}
        fill="none"
        strokeWidth={14}
        strokeLinejoin="round"
        strokeMiterlimit={50}
      />
      <Path
        d="M343.5 588.2h224.3c12.4 0 22.4 10.3 22.4 23s-10 23-22.4 23H343.5c-12.4 0-22.4-10.3-22.4-23-.1-12.7 10-23 22.4-23zM425.7 496h59.8c49.5 0 89.7 41.3 89.7 92.1H336c0-50.8 40.1-92.1 89.7-92.1zM590.1 250.3l-29.9-30.7-44.8 46.1-44.9-46.1-29.9 30.7 44.9 46.1-44.9 46 29.9 30.8 44.9-46.1 44.8 46.1 29.9-30.8-44.8-46z"
        stroke={borderColor}
        fill="none"
        strokeWidth={14}
        strokeLinejoin="round"
        strokeMiterlimit={50}
      />
    </Svg>
  )
}

export default SvgComponent
