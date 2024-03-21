import { parseISO, formatDistanceToNow } from "date-fns";

export const formatToDays = (unformattedTime) => {
  const parsedDate = parseISO(unformattedTime);
  const distance = formatDistanceToNow(parsedDate, { addSuffix: false });

  if (distance.indexOf("day") !== -1) {
    const days = parseInt(distance);
    return `${days}d`;
  }

  return formatDistanceToNow(parsedDate, { addSuffix: true });
};
