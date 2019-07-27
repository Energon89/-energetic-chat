import { Data } from "./data.js";

const data = new Data();
const jsonRequestURL =
  "https://my-json-server.typicode.com/Energon89/json-database/users/";

function UsersService() {}

UsersService.prototype.getUserInfo = function(name, password) {
  return data.getUsefulContents(jsonRequestURL).then(function(data) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].name === name && data[i].password === password) {
        return { userId: data[i].userId, name: data[i].name };
      }
    }
    return { userId: null, name: "InvalidLogin" };
  });
};

export { UsersService };
