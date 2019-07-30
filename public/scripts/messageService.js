import { Data } from "./modules.js";

const _data = new Data();

function MessageService() {}

MessageService.prototype.getMessages = function() {
  return _data
    .getUsefulContents("https://energetic-chat.herokuapp.com/messages")
    .then(function(data) {
      return data;
    });
};

MessageService.prototype.addMessage = function(message) {
  return fetch("https://energetic-chat.herokuapp.com/messages", {
    method: "POST",
    body: JSON.stringify(message),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(response => response.json());
};

export { MessageService };
