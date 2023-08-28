import formatTimestamp from "~/utils/formatTimestamp";

const TimeAgo = ({ timestamp }: { timestamp: string }) => {
  return (
    <div className="text-neutral-grayish-blue">
      {formatTimestamp(timestamp)}
    </div>
  );
};

export default TimeAgo;
