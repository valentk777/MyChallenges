import * as React from "react"
import Svg, { SvgProps, Path, G } from "react-native-svg"
const SvgComponent = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    viewBox="0 0 800 800"
    {...props}
  >
    <Path
      fill="#079AA4"
      d="M537.8 366.9C383.5 333 510 119.1 298.6 136.8S-113.3 641.3 262 755.3s568.8-324.2 275.8-388.4z"
    />
    <Path fill="none" d="M-526.3 70h671v506.7h-671z" />
    <Path fill="#FFF" d="M152 246.3h500.4V585H152z" />
    <Path
      fill="#FFF"
      d="M226.1 554.2h55.6v138.6h-55.6zM281.7 538.8h92.7v169.4h-92.7zM377.2 581.7h182.6v77.4H377.2z"
    />
    <Path fill="#FFF" d="M559.7 544.9h92.7v163.3h-92.7z" />
    <Path fill="#FFF" d="M652.4 551H708v141.7h-55.6z" />
    <G fill="#079AA4">
      <Path d="M192.6 354.1h56.7V400h-56.7zM278.4 354.1h64.3V404h-64.3zM374.4 354.1H430V400h-55.6zM285.3 431.1h52.1v42.6h-52.1zM374.4 508H430v46.2h-55.6zM467.1 508h55.6v43h-55.6zM371 431.1h59v42.6h-59zM463.7 431.1h58.9v46.2h-58.9zM565.6 508h49.7v30.8h-49.7zM577.1 560.3h75.3V706h-75.3zM181.1 261.6h471.3v61.8H181.1zM295.7 560.3H371V706h-75.3z" />
    </G>
    <G
      fill="none"
      stroke="#151B28"
      strokeLinejoin="round"
      strokeMiterlimit={50}
      strokeWidth={14}
    >
      <Path d="M281.7 538.8h92.7v169.4h-92.7zM226.1 554.2h55.6v138.6h-55.6zM559.7 538.8h92.7v169.4h-92.7z" />
      <Path d="M652.4 554.2H708v138.6h-55.6zM374.4 585h185.3v77H374.4zM652.4 538.8V246.3H152V585h74.1M152 323.3h500.4" />
      <Path d="M189.1 354.1h55.6v46.2h-55.6zM281.7 354.1h55.6v46.2h-55.6zM374.4 354.1H430v46.2h-55.6zM467.1 354.1h55.6v46.2h-55.6zM189.1 431.1h55.6v46.2h-55.6zM281.7 431.1h55.6v46.2h-55.6zM374.4 431.1H430v46.2h-55.6zM467.1 431.1h55.6v46.2h-55.6zM559.7 354.1h55.6v46.2h-55.6zM559.7 431.1h55.6v46.2h-55.6zM189.1 508h55.6v46.2h-55.6zM281.7 538.8V508h55.6v30.8M374.4 508H430v46.2h-55.6zM467.1 508h55.6v46.2h-55.6zM559.7 538.8V508h55.6v30.8M152 277.1h120.5M531.9 292.5h120.5" />
    </G>
  </Svg>
)
export default SvgComponent
