import * as React from "react";
import { SVGProps, memo } from "react";
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={15}
    height={15}
    fill="#FFF"
    stroke="#FFF"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M2 21h8a1 1 0 0 0 0-2H3.071A7.011 7.011 0 0 1 10 13a5.044 5.044 0 1 0-3.377-1.337A9.01 9.01 0 0 0 1 20a1 1 0 0 0 1 1Zm8-16a3 3 0 1 1-3 3 3 3 0 0 1 3-3Zm13 11a1 1 0 0 1-1 1h-3v3a1 1 0 0 1-2 0v-3h-3a1 1 0 0 1 0-2h3v-3a1 1 0 0 1 2 0v3h3a1 1 0 0 1 1 1Z" />
  </svg>
);
const Memo = memo(SvgComponent);
export default Memo;
