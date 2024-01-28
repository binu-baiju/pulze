import * as React from "react";
import { SVGProps, memo } from "react";
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={22}
    fill="#42D55A"
    stroke="#42D55A"
    viewBox="-51.2 -51.2 614.4 614.4"
    {...props}
  >
    <g id="SVGRepo_iconCarrier">
      <defs>
        <style>
          {
            ".cls-1{fill:none;stroke:#42d55a;stroke-linecap:round;stroke-linejoin:round;stroke-width:20px}"
          }
        </style>
      </defs>
      <g id="Layer_2" data-name="Layer 2">
        <g
          id="E408_Success_Media_media_player_multimedia"
          data-name="E408, Success, Media, media player, multimedia"
        >
          <circle cx={256} cy={256} r={246} className="cls-1" />
          <path d="m115.54 268.77 85.13 85.13 195.79-195.8" className="cls-1" />
        </g>
      </g>
    </g>
  </svg>
);
const Memo = memo(SvgComponent);
export default Memo;
