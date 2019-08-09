import { MessageService } from "./modules.js";

const _messageService = new MessageService();

const socket = io("http://localhost:3000"); //connect web socket

const userId = localStorage.getItem("userId");

function Messages() {}

Messages.prototype.init = function() {
  _messageService.getMessages().then(function(data) {
    showMessages(data);
  });
};

//Create DOM elements
const htmlElements = {
  messageOutput: document.querySelector("ul.messages"),
  messageInput: document.querySelector("textarea"),
  messageForm: document.querySelector(".chat-footer"),
  sendButton: document.querySelector(".chat-footer .btn-green"),
  authorName: document.querySelector(".chat-header__author")
};

htmlElements.messageForm.addEventListener("submit", sendMessage);
//send a message by pressing enter, go to another line when you click on shift plus enter
htmlElements.messageForm.addEventListener("keydown", function(e) {
  if (e.keyCode === 13 && !e.shiftKey) sendMessage(e);
});
// Toggle for the button.
htmlElements.messageInput.addEventListener("input", toggleButton);

function showMessages(messages) {
  htmlElements.messageOutput.innerHTML = "";
  for (let i = 0; i < messages.length; i++) {
    printMessage(messages[i]);
  }
}

function printMessage(currentMessage) {
  const authorPhoto = document.createElement("img");
  authorPhoto.classList.add("message__photo");
  authorPhoto.setAttribute("src", "images/default_photo_profile.png");
  authorPhoto.setAttribute("alt", "photo_profile");

  const authorNameSpan = document.createElement("span");
  authorNameSpan.classList.add("message__author");
  authorNameSpan.innerText = currentMessage.name;

  const newMessageText = document.createElement("div");
  newMessageText.className = "message__text";
  newMessageText.innerText = currentMessage.text;

  const newMessage = document.createElement("li");
  newMessage.className = "message";
  if (currentMessage.uid == localStorage.getItem("userId")) {
    newMessage.classList.add("message--mine");
  }

  newMessage.appendChild(authorPhoto);
  newMessage.appendChild(authorNameSpan);
  newMessage.appendChild(newMessageText);
  htmlElements.messageOutput.appendChild(newMessage);
  scrollDown();
}

function sendMessage(event) {
  event.preventDefault();

  const newMessageText = htmlElements.messageInput.value;

  const newMessage = {
    name: localStorage.getItem("userName"),
    text: newMessageText,
    uid: localStorage.getItem("userId")
  };

  _messageService.addMessage(newMessage);

  socket.emit("chat", newMessage);

  htmlElements.messageInput.value = "";
  toggleButton();
}

function toggleButton() {
  if (htmlElements.messageInput.value) {
    htmlElements.sendButton.removeAttribute("disabled");
  } else {
    htmlElements.sendButton.setAttribute("disabled", "true");
  }
}

function scrollDown() {
  htmlElements.messageOutput.scrollTop =
    htmlElements.messageOutput.scrollHeight;
}

socket.on("connect", () => console.log("socket online"));
socket.on("chat", message => printMessage(message));

export { Messages };
