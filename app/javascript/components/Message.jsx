import styled from "@emotion/styled";
import { IconButton } from "@mui/material";
import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send"

const MessageContainer = styled.div`
    display: grid;
    grid-template-rows: auto 1fr auto;
    grid-template-columns: auto;
    overflow: auto;
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
    padding: 0 10px 0 10px;
    gap: 10px;
    display: flex;
    flex-direction: column;
    overflow: auto;
    scrollbar-width: none;
    &::-webkit-scrollbar {
        display: none;
    }
`;

const Footer = styled.div`
    display: grid; 
    grid-template-columns: 1fr 10%; 
    height: 100%; 
    width: 100%;
`;
const Message = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    max-width: 100%;
    width: 100%;
    height: auto;
    background-color: #6B728E;
`;

const Typography = styled.div(props => ({
    fontSize: props.fontSize || '1vw',
    color: props.color || 'white',
    fontWeight: props.fontWeight || "normal",
    width: "100%", 
    height: "auto", 
    minHeight: 0,
    padding: "10px",
    wordBreak: "break-word",
    overflowWrap: "break-word",
    hyphens: "auto",
    margin: 0,
}));


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

const FormField = styled.div`
    padding: 1vw;
`;

const FormSubmit = styled.div`
    padding: 1vw;
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

export default function Messages({ selectedRoom, formAuthenticityToken, messages }) {
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (message !== ""){
            const formData = new FormData();
            formData.append('authenticity_token', formAuthenticityToken);
            formData.append('room[message]', message);
    
            fetch(`/rooms/${selectedRoom.id}/messages`, {
                method: "POST",
                body: formData,
            }).then((response) => {
                if (response.ok){
                    setMessage('');
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
        setMessage(e.target.value);
    }

    return <MessageContainer>
        <Header>
            <Typography fontSize="2vw" fontWeight="bold">{selectedRoom && selectedRoom.name}</Typography>
        </Header>
        <Body>
            {messages && messages.map(element => (
                <Message>
                    <Typography key={element.id} fontSize="1vw">{element.message}</Typography>
                </Message>
            ))}
        </Body>
        {selectedRoom && <form action={`/rooms/${selectedRoom.id}/messages`} method="post" acceptCharset="UTF-8" onSubmit={handleSubmit}>
            <input type="hidden" name="authenticity_token" value={formAuthenticityToken} />
            <Footer>
                <FormField>
                    <InputField type="text" name="room[message]" id="room_message" value={message} onChange={handleInputChange}/>
                </FormField>
                <FormSubmit>
                    <SubmitButton type="submit" name="commit" size="large">
                        <SendIcon fontSize="large"/>
                    </SubmitButton>
                </FormSubmit>
            </Footer>
        </form>}
    </MessageContainer>
};