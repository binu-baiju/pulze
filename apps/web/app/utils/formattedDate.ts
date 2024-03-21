import { formatDistanceToNow, isToday, isYesterday, parseISO } from "date-fns";

export const formattedDate = (unformattedTime) => {
  if (!unformattedTime) {
    return "no unformattedTime given"; // Return empty string or handle the case as needed
  }
  const parsedDate = parseISO(unformattedTime);
  const formattedDate = isToday(parsedDate)
    ? formatDistanceToNow(parsedDate, { addSuffix: true })
    : isYesterday(parsedDate)
      ? `Yesterday ${formatDistanceToNow(parsedDate, { addSuffix: true })}`
      : formatDistanceToNow(parsedDate, { addSuffix: true });
  return formattedDate;
};
