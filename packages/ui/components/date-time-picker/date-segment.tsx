// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
"use client";

import { useRef } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { useDateSegment } from "react-aria";
import type {
  DateFieldState,
  DateSegment as IDateSegment,
} from "react-stately";
import { cn } from "../../lib/utils";

interface DateSegmentProps {
  segment: IDateSegment;
  state: DateFieldState;
  // hello: string;
}

function DateSegment({ segment, state }: DateSegmentProps) {
  const ref = useRef(null);

  const {
    segmentProps: { ...segmentProps },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  } = useDateSegment(segment, state, ref);

  return (
    <div
      {...segmentProps}
      ref={ref}
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      className={cn(
        "focus:rounded-[2px] focus:bg-accent focus:text-accent-foreground focus:outline-none",
        // eslint-disable-next-line eslint-comments/no-duplicate-disable
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        segment.type !== "literal" ? "px-[1px]" : "",
        // eslint-disable-next-line eslint-comments/no-duplicate-disable
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        segment.isPlaceholder ? "text-muted-foreground" : ""
      )}
    >
      {segment.text}
      {/* hello */}
    </div>
  );
}

export { DateSegment };
