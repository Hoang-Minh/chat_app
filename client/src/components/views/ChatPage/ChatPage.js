import React from "react";
import { Form, Icon, Input, Button, Row, Col } from "antd";
import io from "socket.io-client";
import { connect } from "react-redux";
import Dropzone, { useDropzone } from "react-dropzone";
import moment from "moment";
import { getChats, afterPostMessage } from "../../../_actions/chat_actions";
import ChatCard from "./Sections/ChatCard";
import axios from "axios";

class ChatPage extends React.Component {
  state = { chatMessage: "" };

  componentDidMount() {
    const server = "https://agile-stream-99792.herokuapp.com/";
    console.log("component Did Mount");

    this.props.dispatch(getChats());
    this.socket = io(server);
    this.socket.on("Output chat message", (messageFromServer) => {
      this.props.dispatch(afterPostMessage(messageFromServer));
    });

    this.scrollToBottom();
  }

  componentDidUpdate() {
    console.log("component did update");
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  };

  hanleSearchChange = (event) => {
    this.setState({ chatMessage: event.target.value });
  };

  onDrop = async (files) => {
    if (this.props.user.userData && !this.props.user.userData.isAuth) {
      return alert("Please Log in first");
    }

    let formData = new FormData();

    const config = {
      header: { "content-type": "multipart/form-data" },
    };

    formData.append("file", files[0]);

    const response = await axios.post(
      "api/chats/uploadfiles",
      formData,
      config
    );

    if (response.data.success) {
      console.log("success");
      let chatMessage = response.data.url;
      let userId = this.props.user.userData._id;
      let userName = this.props.user.userData.name;
      let userImage = this.props.user.userData.image;
      let nowTime = moment();
      let type = response.data.type;

      this.socket.emit("Input Chat Message", {
        chatMessage,
        userId,
        userName,
        userImage,
        nowTime,
        type,
      });
    }
  };

  renderCards = () => {
    const { chats } = this.props.chats;
    if (chats) {
      console.log("renderChats", chats);
      return chats.map((chat) => (
        <ChatCard chat={chat} key={chat._id}></ChatCard>
      ));
    }
  };

  submitChatMessage = (event) => {
    event.preventDefault();

    const chatMessage = this.state.chatMessage;
    const userId = this.props.user.userData._id;
    const username = this.props.user.userData.name;
    const userImage = this.props.user.userData.image;
    const nowTime = moment();
    const type = "Text";

    this.socket.emit("Input Chat Message", {
      chatMessage,
      userId,
      username,
      userImage,
      nowTime,
      type,
    });

    this.setState({ chatMessage: "" });
  };

  render() {
    return (
      <React.Fragment>
        <div>
          <p style={{ fontSize: "2rem", textAlign: "center" }}>
            {" "}
            Real Time Chat
          </p>
        </div>

        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div
            className="infinite-container"
            style={{ height: "500px", overflowY: "scroll" }}
          >
            {this.props.chats && <div>{this.renderCards()}</div>}
            <div
              ref={(el) => {
                this.messagesEnd = el;
              }}
              style={{ float: "left", clear: "both" }}
            />
          </div>

          <Row>
            <Form layout="inline" onSubmit={this.submitChatMessage}>
              <Col span={18}>
                <Input
                  id="message"
                  prefix={
                    <Icon type="message" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Let's start talking"
                  type="text"
                  value={this.state.chatMessage}
                  onChange={this.hanleSearchChange}
                />
              </Col>
              <Col span={2}>
                <Dropzone onDrop={this.onDrop}>
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <Button>
                          <Icon type="upload"></Icon>
                        </Button>
                      </div>
                    </section>
                  )}
                </Dropzone>
              </Col>

              <Col span={4}>
                <Button
                  type="primary"
                  style={{ width: "100%" }}
                  onClick={this.submitChatMessage}
                  htmlType="submit"
                >
                  <Icon type="enter" />
                </Button>
              </Col>
            </Form>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    chats: state.chats,
  };
};

export default connect(mapStateToProps)(ChatPage);
