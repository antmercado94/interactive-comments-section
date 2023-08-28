import { daysToWeeks, formatDistanceToNowStrict, parseISO } from "date-fns";

function formatTimestamp(timestamp: string) {
  let timeAgo = "";

  const date = parseISO(timestamp);
  const days = formatDistanceToNowStrict(date, {
    unit: "day",
    addSuffix: false,
  }).split(" ")[0];

  const weeks = daysToWeeks(+days);

  // 1, 2, 3
  if (weeks > 0 && weeks < 4) {
    timeAgo = weeks === 1 ? `${weeks} week ago` : `${weeks} weeks ago`;
  } else {
    timeAgo = formatDistanceToNowStrict(date, { addSuffix: true });
  }

  return timeAgo;
}

export default formatTimestamp;
