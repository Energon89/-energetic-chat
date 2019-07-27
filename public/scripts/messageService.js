import { Data } from "./data.js";

const data = new Data();
const jsonRequestURL =
  "https://my-json-server.typicode.com/Energon89/json-database/messages/";

function MessageService() {}

MessageService.prototype.getMessages = function() {
  return data.getUsefulContents(jsonRequestURL).then(function(data) {
    return data;
  });
};

export { MessageService };
