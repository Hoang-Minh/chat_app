import React from "react";
import moment from "moment";
import { Comment, Avatar, Tooltip } from "antd";

const ChatCard = ({ chat }) => {
  const renderMessage = (message) => {};

  console.log("Chat Card", chat);
  const {
    sender: { name, image },
    message,
  } = chat;

  console.log(name, image, message);

  return (
    <div style={{ width: "100%" }}>
      <Comment
        autho={name}
        avatar={<Avatar src={image} alt={name}></Avatar>}
        content={<p>{message}</p>}
        datetime={
          <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
            <span>FixTime</span>
          </Tooltip>
        }
      ></Comment>
    </div>
  );
};

export default ChatCard;
