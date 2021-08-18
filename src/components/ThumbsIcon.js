import { FiThumbsDown, FiThumbsUp } from "react-icons/fi";
import { FaRegSadCry } from "react-icons/fa";
import { BiHappyAlt } from "react-icons/bi";
export const ThumbsIcon = () => {
  return (
    <div className="thumbsIconContainer">
      <BiHappyAlt className="thumb icon" />
      <FiThumbsDown className="thumb icon" />
      <FiThumbsUp className="thumb icon" />
      <FaRegSadCry className="thumb icon" />
    </div>
  );
};
