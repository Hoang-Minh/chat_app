import React from "react";
import { FaCode } from "react-icons/fa";
import { Typography } from "antd";
const { Paragraph, Text } = Typography;

function LandingPage() {
  return (
    <>
      <div className="app">
        <FaCode style={{ fontSize: "4rem" }} />
        <br />
        <span style={{ fontSize: "2rem" }}>Let's Start Coding!</span>
      </div>

      <div style={{ textAlign: "center", fontWeight: "bold" }}>
        Thanks For Using This Boiler Plate by John Ahn
      </div>
    </>
  );
}

export default LandingPage;
