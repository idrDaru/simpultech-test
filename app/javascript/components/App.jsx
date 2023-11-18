import React, { useEffect, useState } from "react"
import consumer from "../channels/consumer"
import styled from "@emotion/styled";
import { injectGlobal } from "@emotion/css";
import Room from "./Room";
import Messages from "./Message";

injectGlobal`
    html, body {
        margin: 0;
        padding: 0;
        font-family: "calibri", sans-serif, "Open Sans";
        background-color: #404258;
    }
`
const Container = styled.div`
    display: grid; 
    grid-template-columns: 20% 80%; 
    height: 100vh; 
    width: 100vw; 
`;

export default function App({ initialRooms, formAuthenticityToken }){
    const [rooms, setRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [messages, setMessages] = useState(null);
    useEffect(() => {
        consumer.subscriptions.create("RoomChannel", {
            connected(){
                console.log("Connected to Room Channel");
                setRooms(initialRooms);
            },
            received(data) {
              setRooms([...rooms, data]);
            }
          });
        consumer.subscriptions.create("ChatChannel", {
            connected(){
                console.log("Connected to Chat Channel");
            },
            received(data) {
                setMessages(data.messages);
            }
        });
    }, [rooms, messages]);

    const handleSelectedRoom = (room) => {
        setSelectedRoom(room);
        setMessages(room.messages);
    }

    return <Container>
        <Room rooms={rooms} onClick={handleSelectedRoom} formAuthenticityToken={formAuthenticityToken} selectedRoom={selectedRoom}/>
        <Messages selectedRoom={selectedRoom} messages={messages} formAuthenticityToken={formAuthenticityToken}/>
    </Container>
}