// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-unsafe-call */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
"use client";

import { DateSegment } from "./date-segment";
// eslint-disable-next-line import/no-extraneous-dependencies
import { createCalendar } from "@internationalized/date";
import { useRef } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  AriaDatePickerProps,
  DateValue,
  useDateField,
  useLocale,
} from "react-aria";
// eslint-disable-next-line import/no-extraneous-dependencies
import { useDateFieldState } from "react-stately";
import { cn } from "../../lib/utils";

function DateField(props: AriaDatePickerProps<DateValue>) {
  const ref = useRef<HTMLDivElement | null>(null);

  const { locale } = useLocale();
  // eslint-disable-next-line eslint-comments/no-duplicate-disable
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const state = useDateFieldState({
    ...props,
    locale,
    createCalendar,
  });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const { fieldProps } = useDateField(props, state, ref);

  return (
    <div
      {...fieldProps}
      ref={ref}
      className={cn(
        "inline-flex h-10 flex-1 items-center rounded-l-md border border-r-0 border-input bg-red-500 py-2 pl-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        props.isDisabled ? "cursor-not-allowed opacity-50" : ""
      )}
    >
      {state.segments.map((segment, i) => (
        // eslint-disable-next-line react/no-array-index-key, @typescript-eslint/no-unsafe-assignment
        <DateSegment key={i} segment={segment} state={state} />
      ))}
      {state.validationState === "invalid" && (
        <span aria-hidden="true">🚫</span>
      )}
    </div>
  );
}

export { DateField };
