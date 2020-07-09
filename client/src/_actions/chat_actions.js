import axios from "axios";
import { GET_CHATS, AFTER_POST_MESSAGE } from "./types";
import { CHAT_SERVER } from "../components/Config.js";

export function getChats() {
  const response = axios
    .get(`${CHAT_SERVER}/getChats`)
    .then((response) => response.data);

  return {
    type: GET_CHATS,
    payload: response,
  };
}

export const afterPostMessage = (data) => {
  return {
    type: AFTER_POST_MESSAGE,
    payload: data,
  };
};
