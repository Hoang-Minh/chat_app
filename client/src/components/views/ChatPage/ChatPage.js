import React from "react";
import { Form, Icon, Input, Button, Row, Col } from "antd";
import io from "socket.io-client";
import { connect } from "react-redux";
import moment from "moment";

class ChatPage extends React.Component {
  state = { chatMessage: "" };

  componentDidMount() {
    const server = "localhost:5000";
    this.socket = io(server);
    this.socket.on("Output chat message", (messageFromServer) => {
      console.log(messageFromServer);
    });
  }

  hanleSearchChange = (event) => {
    this.setState({ chatMessage: event.target.value });
  };

  submitChatMessage = (event) => {
    event.preventDefault();

    const chatMessage = this.state.chatMessage;
    const userId = this.props.user.userData_id;
    const username = this.props.user.userData.name;
    const userImage = this.props.user.userData.image;
    const nowTime = moment();
    const type = "Image";

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
          <div className="infinite-container">
            {/* {this.props.chats && (
                            <div>{this.renderCards()}</div>
                        )} */}
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
              <Col span={2}></Col>

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
  };
};

export default connect(mapStateToProps)(ChatPage);
