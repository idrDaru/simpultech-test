import styled from "@emotion/styled";
import React, { useState } from "react";

const Header = styled.div`
    border: 1px solid red;
`;

const Body = styled.div`
border: 1px solid red;`;

const Footer = styled.div`
    border: 1px solid yellow; 
    display: grid; 
    grid-template-columns: 1fr 10%; 
    height: 100%; 
    width: 100%;
`;

const TextField = styled.input`
    border: 1px solid blue; 
    width: 100%; 
    height: 100%;
`;

const SendButton = styled.input`
    height: 100%;
    width: 100%;
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

    return <React.Fragment>
        <Header>
            <h1>{selectedRoom && selectedRoom.name}</h1>
        </Header>
        <Body>
            {messages && messages.map(element => (
                <p key={element.id}>{element.message}</p>
            ))}
        </Body>
        {selectedRoom && <form action={`/rooms/${selectedRoom.id}/messages`} method="post" acceptCharset="UTF-8" onSubmit={handleSubmit}>
            <input type="hidden" name="authenticity_token" value={formAuthenticityToken} />
            <Footer>
                <div style={{ padding: "1vw" }}>
                    <TextField type="text" name="room[message]" id="room_message" value={message} onChange={handleInputChange}/>
                </div>
                <div style={{ padding: "1vw" }}>
                    <SendButton type="submit" value={"Send"} datadisablewith="Send" name="commit"/>
                </div>
            </Footer>
        </form>}
    </React.Fragment>
};