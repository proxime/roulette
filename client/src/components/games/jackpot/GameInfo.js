import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { updateJackpot } from '../../../actions/jackpot'

const GameInfo = ({ jackpot }) => {
  const [time, setTime] = useState(0)
  const [timerStatus, setTimerStatus] = useState(false)
  const [timerRunning, setTimerRunning] = useState(false)
  const [intervaIndexl, setIntervalIndex] = useState(null)

  if (jackpot.started) {
    if (!timerStatus) {
      setTime(jackpot.time)
      setTimerStatus(true)
    }
  }

  if (timerStatus) {
    if (!timerRunning) {
      setTimerRunning(true)
      let timer = 0
      const interval = setInterval(() => {
        if (timer < time) {
          timer++
          setTime(time - timer)
        } else {
          console.log('cleared')
          clearInterval(interval)
          setTimerStatus(false)
          setTimerRunning(false)
        }
      }, 1000)
      setIntervalIndex(interval)
    }
  }

  if (!jackpot.started && time > 0) {
    clearInterval(intervaIndexl)
    setTimerStatus(false)
    setTimerRunning(false)
    setTime(jackpot.time)
  }

  return (
    <div className="jackpot__info">
      <div className="jackpot__info-title">Dane Gry</div>
      <div className="jackpot__info-container">
        <div className="jackpot__info-line">
          Pula:{' '}
          <span className="jackpot__info-cash">
            {jackpot.cash} <i className="fas fa-coins"></i>
          </span>
        </div>
        <div className="jackpot__info-line">
          Liczba Graczy: {jackpot.players.length}
        </div>
        <div className="jackpot__info-line">Rozpoczęcie Gry: {time}</div>
      </div>
    </div>
  )
}

GameInfo.propTypes = {
  jackpot: PropTypes.object.isRequired,
  updateJackpot: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  jackpot: state.jackpot,
})

export default connect(mapStateToProps, { updateJackpot })(GameInfo)
