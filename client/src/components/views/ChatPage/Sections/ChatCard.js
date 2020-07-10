import React from "react";
import moment from "moment";
import { Comment, Avatar, Tooltip } from "antd";

const ChatCard = ({ chat }) => {
  console.log(chat);
  const {
    sender: { name, image },
    message,
    type,
    createdAt,
  } = chat;

  console.log(name, image, message, type, createdAt);

  const timeStamp = moment
    .utc(createdAt, "YYYY MM DD HH:mm:ss ZZ")
    .format("dddd, MMMM DD YYYY HH:mm");

  const renderContent = (message, type) => {
    const content = type.includes("Text") ? (
      <p>{message}</p>
    ) : type.includes("video") ? (
      <video
        style={{ maxWidth: "150px" }}
        src={`http://localhost:5000/${message}`}
        alt="video"
        type={type}
        controls
      ></video>
    ) : (
      <img
        style={{ maxWidth: "150px" }}
        src={`http://localhost:5000/${message}`}
        alt="photo"
      ></img>
    );

    return content;
  };

  return (
    <div style={{ width: "100%" }}>
      <Comment
        autho={name}
        avatar={<Avatar src={image} alt={name}></Avatar>}
        content={renderContent(message, type)}
        datetime={
          <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
            <span>{timeStamp}</span>
          </Tooltip>
        }
      ></Comment>
    </div>
  );
};

export default ChatCard;
