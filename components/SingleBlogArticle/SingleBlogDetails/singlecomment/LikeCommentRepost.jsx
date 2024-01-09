import { FiThumbsUp } from "react-icons/fi";
import { TbMessage } from "react-icons/tb";
import { BiRepost } from "react-icons/bi";
import { IoIosSend } from "react-icons/io";

const LikeCommentRepost = ({ isFormToggle, setisFormToggle }) => {
  return (
    <>
      <div className="">
        <div className="flex items-center gap-1">
          <button className="flex items-center gap-1 hover:bg-gray-300/90 px-3 hover:rounded-md py-2 transition-all duration-300">
            <FiThumbsUp size={22} />
            <span> Like</span>
          </button>
          <button className="flex items-center gap-1 hover:bg-gray-300/90 px-3 hover:rounded-md py-2 transition-all duration-300">
            <TbMessage size={22} />
            <span> Conmment</span>
          </button>
          <button className="flex items-center gap-1 hover:bg-gray-300/90 px-3 hover:rounded-md py-2 transition-all duration-300">
            <BiRepost size={22} />
            <span> Repost</span>
          </button>
          <button className="flex items-center gap-1 hover:bg-gray-300/90 px-3 hover:rounded-md py-2 transition-all duration-300">
            <IoIosSend size={22} />
            <span> Send</span>
          </button>
        </div>
      </div>
      <hr className="my-2 bg-slate-800" />
    </>
  );
};

export default LikeCommentRepost;
