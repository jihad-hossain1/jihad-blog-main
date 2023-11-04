import { formatTimestamp } from "@/utils/timeStemp";

const NewBlogBadge = ({ timeSt }) => {
  return (
    <div>
      <h4 className="flex items-center space-x-2">
        <span>{formatTimestamp(timeSt)}</span>
        {/* TODO show blog are new */}
        <span
          className={
            formatTimestamp(timeSt)
              ? "rounded-xl bg-gray-100 border-green-400 border px-2 text-sm flex items-center"
              : "hidden"
          }
        >
          new
        </span>{" "}
      </h4>
    </div>
  );
};

export default NewBlogBadge;
