import React, { useEffect, useRef } from 'react'
import SimpleBar from 'simplebar-react'

const Chat = ({ onSubmit, textarea, setTextarea, chat }) => {
  const chatEl = useRef(null)

  useEffect(() => {
    const footer = document.querySelector('.footer')

    const setChatPosition = () => {
      const chatPos = window.scrollY + window.innerHeight
      const footerPos = footer.offsetTop
      if (chatPos >= footerPos) {
        chatEl.current.style.position = 'absolute'
        chatEl.current.style.top = `${footerPos -
          chatEl.current.offsetHeight}px`
      } else {
        chatEl.current.style = ''
      }
    }

    window.addEventListener('scroll', setChatPosition)

    return () => {
      window.removeEventListener('scroll', setChatPosition)
    }
  }, [])

  const chatItems = chat.map((chatItem, index) => (
    <p key={index} className="chat__item">
      <span className="chat__nick" style={{ color: chatItem.color }}>
        {chatItem.user}:{' '}
      </span>
      {chatItem.msg}
    </p>
  ))

  const enterApply = e => {
    if (e.keyCode === 13) {
      onSubmit(e)
    }
  }

  return (
    <>
      <div className="chat" ref={chatEl}>
        <div className="chat__title">Chat - Jackpot</div>

        <SimpleBar className="chat__body">{chatItems}</SimpleBar>

        <form className="chat__form" onSubmit={e => onSubmit(e)}>
          <textarea
            value={textarea}
            onChange={e => setTextarea(e.target.value)}
            placeholder="Napisz coś..."
            name=""
            id=""
            className="chat__textarea"
            onKeyDown={e => enterApply(e)}
          ></textarea>
          <button className="chat__button">Wyślij</button>
        </form>
      </div>
    </>
  )
}

export default Chat
