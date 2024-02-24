// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-unsafe-call */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
"use client";

import { useRef } from "react";
import type { AriaTimeFieldProps, TimeValue } from "react-aria";
// eslint-disable-next-line import/no-extraneous-dependencies
import { useLocale, useTimeField } from "react-aria";
// eslint-disable-next-line import/no-extraneous-dependencies
import { useTimeFieldState } from "react-stately";
import { cn } from "../../lib/utils";
import { DateSegment } from "./date-segment";

function TimeField(props: AriaTimeFieldProps<TimeValue>) {
  const ref = useRef<HTMLDivElement | null>(null);

  const { locale } = useLocale();
  // eslint-disable-next-line eslint-comments/no-duplicate-disable
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const state = useTimeFieldState({
    ...props,
    locale,
  });
  const {
    fieldProps: { ...fieldProps },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    labelProps,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  } = useTimeField(props, state, ref);

  return (
    <div
      {...fieldProps}
      className={cn(
        "inline-flex ml-2 h-6 w-2/6 flex rounded-md border border-input bg-violet-200 px-3 py-2 text-violet-600 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-violet-600 focus-within:ring-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 focus-visible:ring-offset-2 justify-center items-center",
        props.isDisabled ? "cursor-not-allowed opacity-50" : ""
      )}
      ref={ref}
    >
      {state.segments.map((segment, i) => (
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        <DateSegment key={i} segment={segment} state={state} />
      ))}
    </div>
  );
}

export { TimeField };
