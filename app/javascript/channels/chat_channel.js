import consumer from "channels/consumer"

consumer.subscriptions.create("ChatChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
    console.log("Connected to Chat Channel");
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
    console.log("Disconnected from Chat Channel");
  },

  received(data) {
    // Called when there's incoming data on the websocket for this channel
    const messagesList = document.getElementById("messages");
    const messageP = document.createElement("p");
    messageP.innerHTML = data.message;
    messagesList.appendChild(messageP);
  },
});
