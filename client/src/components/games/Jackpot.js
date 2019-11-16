import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { setJackpotMessages } from '../../actions/messages'
import {
  setUpBet,
  updateJackpot,
  endGame,
  updateJackpotGames,
} from '../../actions/jackpot'
import { clearAlerts } from '../../actions/deleteTrash'
import PlayerList from './jackpot/PlayersList'
import GameInfo from './jackpot/GameInfo'
import LastGames from './jackpot/LastGames'
import JackpotDraw from './jackpot/JackpotDraw'
import TextInput from '../auth/inputs/TextInput'
import Alert from '../layout/Alert'
import Chat from './Chat'
import io from 'socket.io-client'

const Jackpot = ({
  auth,
  history,
  jackpotMessages,
  setJackpotMessages,
  setUpBet,
  clearAlerts,
  updateJackpot,
  jackpot,
  endGame,
  updateJackpotGames,
}) => {
  const [socket, setSocket] = useState(null)
  const [textarea, setTextarea] = useState('')

  const [formData, setFormaData] = useState({
    luckycoins: '',
  })

  const { luckycoins } = formData

  const [usedData, setUsedData] = useState({
    luckycoins: false,
  })

  const onChange = e =>
    setFormaData({
      ...formData,
      [e.target.name]: e.target.value,
    })

  const onSubmit = e => {
    e.preventDefault()
    if (!auth.isAuthenticated) history.push('/login')
    clearAlerts()
    setUpBet(luckycoins, socket)
    setFormaData({ luckycoins: '' })
  }

  const handleFocusData = e =>
    setUsedData({
      [e.target.name]: true,
    })

  const handleBlurData = e =>
    setUsedData({
      [e.target.name]: false,
    })

  useEffect(() => {
    const socket = io.connect('/')
    updateJackpotGames()
    socket.on('chat output', res => {
      setJackpotMessages(res)
    })
    socket.on('setUpBet', res => {
      updateJackpot(res)
    })
    socket.on('endGame', res => {
      endGame(res)
    })
    setSocket(socket)
  }, [])

  const typeOnChat = e => {
    e.preventDefault()
    if (!textarea) return
    if (!auth.isAuthenticated) return history.push('/login')
    if (!auth.user.nick) return history.push('/dashboard')
    socket.emit('chat input', {
      msg: textarea,
      user: auth.user.nick,
      color: auth.user.color,
    })
    setTextarea('')
  }

  return (
    <>
      <div className="game-conatianer">
        <Chat
          onSubmit={typeOnChat}
          textarea={textarea}
          setTextarea={setTextarea}
          chat={jackpotMessages}
        />
        <div className="jackpot">
          <JackpotDraw jackpot={jackpot} />
          <Alert />
          <div className="jackpot__body">
            <div className="jackpot__section">
              <div className="jackpot__add-bet">
                <div className="jackpot__add-bet-title">Dodaj Zakład</div>
                <form
                  onSubmit={e => onSubmit(e)}
                  className="jackpot__add-bet-form"
                >
                  <TextInput
                    type="number"
                    name="luckycoins"
                    onchange={onChange}
                    onfocus={handleFocusData}
                    onblur={handleBlurData}
                    useData={usedData.luckycoins}
                    formData={luckycoins}
                    label="Luckycoins"
                  />
                  <button className="jackpot__add-bet-button">Dodaj</button>
                </form>
              </div>
              <GameInfo />
            </div>
            <div className="jackpot__section">
              <PlayerList jackpot={jackpot} />
              <LastGames jackpot={jackpot} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

Jackpot.propTypes = {
  auth: PropTypes.object.isRequired,
  jackpotMessages: PropTypes.array.isRequired,
  jackpot: PropTypes.object.isRequired,
  setJackpotMessages: PropTypes.func.isRequired,
  setUpBet: PropTypes.func.isRequired,
  clearAlerts: PropTypes.func.isRequired,
  updateJackpot: PropTypes.func.isRequired,
  endGame: PropTypes.func.isRequired,
  updateJackpotGames: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
  jackpotMessages: state.messages.jackpotMessages,
  jackpot: state.jackpot,
})

export default connect(mapStateToProps, {
  setJackpotMessages,
  setUpBet,
  clearAlerts,
  updateJackpot,
  endGame,
  updateJackpotGames,
})(withRouter(Jackpot))
