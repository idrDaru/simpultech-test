import styled from "@emotion/styled";
import { IconButton } from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";

const RoomContainer = styled.div`
    display: grid;
    grid-template-rows: auto 1fr auto;
    grid-template-columns: 1fr;
    overflow: auto;
    border-right: 1px solid #6B728E;
    height: 100%;
    width: 100%;
`;

const Header = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
`;

const Body = styled.div`
    display: grid;
    overflow: auto;
    scrollbar-width: none;
    &::-webkit-scrollbar {
        display: none;
    }
`;

const Footer = styled.div``;

const RoomButton = styled.button`
  position: relative;
  width: 100%;
  height: 100px;
  background-color: ${props => props.backgroundColor || "white"};
  border: none;
  cursor: pointer;
  transition: background-color 0.1s;
  overflow: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar {
      display: none;
  }
  word-break: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
  margin: 0;
  
  &:active {
    border: none;
  }

  &:hover {
    background-color: #6B728E;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 90%;
    height: 1px;
    background-color: #6B728E;
    transform: translateX(-50%);
  }
`;

const Typography = styled.p(props => ({
    fontSize: props.fontSize || '14px',
    color: props.color || 'white',
    fontWeight: props.fontWeight || "normal",
}));

const Form = styled.form`
    display: grid; 
    grid-template-columns: 1fr 30%; 
    height: 100%; 
    width: 100%;
`;

const FormField = styled.div`
    padding: 1vw;
`;

const FormSubmit = styled.div`
    padding: 1vw;
`;

const InputField = styled.input`
    height: 100%;
    width: 100%;
    background-color: #50577A;
    border: none;
    border-radius: 10px;
    color: white;
    transition: border-radius 0.5s;

    &:focus {
        outline: none;
        border: none;
        border-radius: 5px;
    }
`;

const SubmitButton = styled(IconButton)`
    height: 100%;
    width: 100%;
    cursor: pointer;
    background-color: #FAF0E6;
    border-radius: 5px;
    font-size: 10px;
    color: #191A19;

    &:hover {
        background-color: #B9B4C7;
    }
`;

export default function Room({ rooms, onClick, formAuthenticityToken, selectedRoom }) {
    const [roomName, setRoomName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (roomName !== ""){
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
    }


    const handleInputChange = (e) => {
        setRoomName(e.target.value);
    }

    return <RoomContainer>
        <Header>
            <Typography fontSize="2vw" fontWeight="bold">Rooms</Typography>
        </Header>
        <Body>
            {rooms && rooms.map((room) => (
                <RoomButton onClick={() => onClick(room)} key={room.id} backgroundColor={selectedRoom && selectedRoom.id === room.id ? "#6B728E" : "#474E68"}>
                    <Typography fontSize="1vw">{room.name}</Typography>
                </RoomButton>
            ))}
        </Body>
        <Footer>
            <Form action="/rooms" acceptCharset="UTF-8" method="post" onSubmit={handleSubmit}>
                <FormField>
                    <input type="hidden" name="authenticity_token" value={formAuthenticityToken} />
                    <InputField type="text" name="room[name]" id="room_name" value={roomName} onChange={handleInputChange}/>
                </FormField>
                <FormSubmit>
                    <SubmitButton type="submit" name="commit" size="large">
                        <AddIcon fontSize="large"/>
                    </SubmitButton>
                </FormSubmit>
            </Form>
        </Footer>
    </RoomContainer>
}