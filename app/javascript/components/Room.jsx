import styled from "@emotion/styled";
import React, { useState } from "react";

const Header = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    border: 1px solid red;
`;

const Body = styled.div`
    border: 1px solid red;
    overflow-x: hidden;
`;

const Footer = styled.div`
    border: 1px solid red;
`;

const RoomButton = styled.button`
    width: 100%;
    height: 100px;
`;

export default function Room({ rooms, onClick, formAuthenticityToken }) {
    const [roomName, setRoomName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();


        const formData = new FormData();
        formData.append('authenticity_token', formAuthenticityToken);
        formData.append('room[name]', roomName);

        fetch('/rooms', {
            method: "POST",
            body: formData,
        }).then((response) => {
            if (response.ok){
                setRoomName('');
                e.target.reset();
            } else {
                console.error("Form submission failed");
            }
        }).catch((error) => {
            console.log(error);
        });
    }


    const handleInputChange = (e) => {
        setRoomName(e.target.value);
    }

    return <>
        <Header>
            <h1>Rooms</h1>
        </Header>
        <Body>
            {rooms && rooms.map(room => (
                <RoomButton onClick={() => onClick(room)} key={room.id}>{room.name}</RoomButton>
            ))}
        </Body>
        <Footer>
            <form action="/rooms" acceptCharset="UTF-8" method="post" onSubmit={handleSubmit}>
                <input type="hidden" name="authenticity_token" value={formAuthenticityToken} />
                <input type="text" name="room[name]" id="room_name" value={roomName} onChange={handleInputChange}/>
                <input type="submit" name="commit" value={"Create Room"} datadisablewith="Create Room" />
            </form>
        </Footer>
    </>
}