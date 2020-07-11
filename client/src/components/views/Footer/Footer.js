import React from "react";
import PandaIcon from "../../../Icons/icon";

function Footer() {
  let i = 5;
  return (
    <div
      style={{
        height: "80px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1rem",
      }}
    >
      <p>
        Welcome to <PandaIcon style={{ fontSize: "32px" }} /> Room !!!
      </p>
    </div>
  );
}

export default Footer;
