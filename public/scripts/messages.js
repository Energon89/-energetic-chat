import { MessageService } from "./messageService.js";

const messageService = new MessageService();

var newMessages = [];

function Messages() {}

Messages.prototype.init = function(uid) {
  messageService
    .getMessages()
    .then(function(data) {
      newMessages = data;
    })
    .then(function() {
      showMessages(uid);
    });
};

const htmlElements = {
  messageOutput: document.querySelector("ul.messages"),
  messageInput: document.querySelector("textarea"),
  messageForm: document.querySelector(".chat-footer"),
  sendButton: document.querySelector(".chat-footer .btn-green"),
  authorName: document.querySelector(".chat-header__author")
};

htmlElements.messageForm.addEventListener("submit", sendMessage);
htmlElements.messageForm.addEventListener("keydown", function(e) {
  if (e.keyCode === 13) sendMessage(e);
});
// Toggle for the button.
htmlElements.messageInput.addEventListener("input", toggleButton);

function showMessages(uid) {
  htmlElements.messageOutput.innerHTML = "";

  for (let i = 0; i < newMessages.length; i++) {
    const currentMessage = newMessages[i];

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
    if (currentMessage.userId == uid) {
      newMessage.classList.add("message--mine");
    }

    newMessage.appendChild(authorPhoto);
    newMessage.appendChild(authorNameSpan);
    newMessage.appendChild(newMessageText);
    htmlElements.messageOutput.appendChild(newMessage);
    scrollDown();
  }
}

function sendMessage(event) {
  event.preventDefault();
  const newMessageText = htmlElements.messageInput.value;
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");

  newMessages.push({
    userId: userId,
    name: userName,
    text: newMessageText
  });
  showMessages(userId);

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

export { Messages };
