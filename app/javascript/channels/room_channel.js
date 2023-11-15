import consumer from "channels/consumer"

consumer.subscriptions.create("RoomChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
    console.log("Connected to Room Channel");
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
    console.log("Disconnected from Room Channel");
  },

  received(data) {
    // Called when there's incoming data on the websocket for this channel
    const roomList = document.getElementById("room-list");
    const roomItem = document.createElement("li");
    const roomLink = document.createElement("a");
    roomLink.innerHTML = data.name;
    roomLink.href = `/rooms/${data.id}`
    roomItem.appendChild(roomLink);
    roomList.appendChild(roomItem);
  }
});
