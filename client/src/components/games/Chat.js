import React from 'react';
import SimpleBar from 'simplebar-react';

const Chat = ({ onSubmit, textarea, setTextarea, chat }) => {
    const chatItems = chat.map((chatItem, index) => (
        <p key={index} className="chat__item">
            <span className="chat__nick" style={{ color: chatItem.color }}>{chatItem.user}: </span>
            {chatItem.msg}
        </p>
    ))

    return (
        <>
            <div className="chat">
                <div className="chat__title">Chat - Jackpot</div>

                <SimpleBar className='chat__body'>
                    {chatItems}
                </SimpleBar>

                <form className="chat__form" onSubmit={e => onSubmit(e)}>
                    <textarea value={textarea} onChange={(e) => setTextarea(e.target.value)} placeholder="Napisz coś..." name="" id="" className="chat__textarea"></textarea>
                    <button className="chat__button">Wyślij</button>
                </form>
            </div>
        </>
    );
}

export default Chat;