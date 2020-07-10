import React from "react";
import moment from "moment";
import { Comment, Avatar, Tooltip } from "antd";

const ChatCard = ({ chat }) => {
  const {
    sender: { name, image },
    message,
    type,
  } = chat;

  console.log(name, image, message, type);

  const renderContent = (message, type) => {
    if (type.includes("video")) {
      return (
        <>
          <video
            style={{ maxWidth: "200px" }}
            src={`http://localhost:5000/${message}`}
            alt="video"
            type={type}
            controls
          ></video>
          <p>{message}</p>
        </>
      );
    }

    if (type.includes("image")) {
      return (
        <>
          <img
            style={{ maxWidth: "200px" }}
            src={`http://localhost:5000/${message}`}
            alt="photo"
          ></img>
          <p>{message}</p>
        </>
      );
    }

    if (type.includes("Text")) {
      return <p>{message}</p>;
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <Comment
        autho={name}
        avatar={<Avatar src={image} alt={name}></Avatar>}
        content={renderContent(message, type)}
        datetime={
          <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
            <span>FIX THIS!!!</span>
          </Tooltip>
        }
      ></Comment>
    </div>
  );
};

export default ChatCard;
