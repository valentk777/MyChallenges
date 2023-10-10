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
        d="M174 237.4h416v342.1H174z"
        fill={secondaryColor}
      />
      <Path
        d="M191 271.9h382V565H191z"
        fill={primaryColor}
      />
      <Path
        d="M142 601h480v29.3H142zM158 571.7h448V601H158z"
        fill={secondaryColor}
        stroke={borderColor}
        strokeWidth={14}
        strokeMiterlimit={10}
      />
      <Path
        d="M174 571.7V425M590 571.7V425M270 425v146.7M494 425v146.7"
        fill="none"
        stroke={borderColor}
        strokeWidth={14}
        strokeMiterlimit={10}
      />
      <Path
        d="M318 571.7V454.3h128v117.4"
        fill={secondaryColor}
        stroke={borderColor}
        strokeWidth={14}
        strokeMiterlimit={10}
      />
      <Path
        d="M382 454.3v117.4"
        fill="none"
        stroke={borderColor}
        strokeWidth={14}
        strokeMiterlimit={10}
      />
      <Path
        d="M206 454.3h32V513h-32zM526 454.3h32V513h-32z"
        fill={secondaryColor}
        stroke={borderColor}
        strokeWidth={14}
        strokeMiterlimit={10}
      />
      <Path
        d="M174 395.7V249M590 395.7V249"
        fill="none"
        stroke={borderColor}
        strokeWidth={14}
        strokeMiterlimit={10}
      />
      <Path
        d="M142 395.7h480V425H142zM310 249H142v-29.4h168M454 219.6h168V249H454M310 190.3h144v88H310z"
        fill={secondaryColor}
        stroke={borderColor}
        strokeWidth={14}
        strokeMiterlimit={10}
      />
      <Path
        d="M382 212.3v44M358 234.3h48"
        fill="none"
        stroke={borderColor}
        strokeWidth={14}
        strokeMiterlimit={10}
      />
      <Path
        d="M206 307.6h64v58.7h-64zM302 307.6h64v58.7h-64zM398 307.6h64v58.7h-64zM494 307.6h64v58.7h-64z"
        fill={secondaryColor}
        stroke={borderColor}
        strokeWidth={14}
        strokeMiterlimit={10}
      />
    </Svg>
  )
}

export default SvgComponent
