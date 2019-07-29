import { Data } from "./data.js";

const data = new Data();
const jsonRequestURL = "https://energetic-chat.herokuapp.com/messages";

function MessageService() {}

MessageService.prototype.getMessages = function() {
  return data.getUsefulContents(jsonRequestURL).then(function(data) {
    return data;
  });
};

MessageService.prototype.addMessage = function(message) {
  return fetch(jsonRequestURL, {
    method: "POST",
    body: JSON.stringify(message),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(response => response.json());
};

export { MessageService };
