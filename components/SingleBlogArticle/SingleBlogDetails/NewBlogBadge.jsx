import { timeAgo } from "@/utils/timeAgo";
import { formatTimestamp } from "@/utils/timeStemp";

const NewBlogBadge = ({ timeSt }) => {
  return (
    <div>
      <h4 className="flex items-center space-x-2">
        <span>{formatTimestamp(timeSt)}</span>
        {/* TODO show blog are new */}
        <span
          className={
            timeSt
              ? "rounded-md bg-gray-100 border-green-200 border px-2 text-sm flex items-center"
              : "hidden"
          }
        >
          {timeAgo(timeSt)}
        </span>{" "}
      </h4>
    </div>
  );
};

export default NewBlogBadge;
