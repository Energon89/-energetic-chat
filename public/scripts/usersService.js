import { Data } from "./modules.js";

const _data = new Data();

class UsersService {
  getUserInfo(name, password) {
    return _data
      .getUsefulContents("https://energetic-chat.herokuapp.com/users")
      .then(data => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].name === name && data[i].password === password) {
            return { userId: data[i].id, name: data[i].name };
          }
        }
        return { userId: null, name: "InvalidLogin" };
      });
  }

  checkUser(name) {
    return fetch("https://energetic-chat.herokuapp.com/users")
      .then(response => {
        return response.json();
      })
      .then(users => {
        let value = false;
        users.forEach(user => {
          if (user.name === name) {
            value = true;
          }
        });
        return { value, name };
      });
  }

  addUser(user) {
    return fetch("https://energetic-chat.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => response.json());
  }

  // deleteUser(id) {
  //   return fetch(`https://energetic-chat.herokuapp.com/users/${id}`, {
  //     method: "DELETE"
  //   }).then(response => response.status);
  // }
}

export { UsersService };
