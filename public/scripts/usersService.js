import { Data } from "./data.js";

const data = new Data();
const jsonRequestURL = "https://energetic-chat.herokuapp.com/users";

function UsersService() {}

UsersService.prototype.getUserInfo = function(name, password) {
  return data.getUsefulContents(jsonRequestURL).then(function(data) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].name === name && data[i].password === password) {
        return { userId: data[i].id, name: data[i].name };
      }
    }
    return { userId: null, name: "InvalidLogin" };
  });
};

export { UsersService };
