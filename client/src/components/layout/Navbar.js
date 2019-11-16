import React, { useState } from 'react'
import RefreshLink from '../../route/RefreshLink'
import Aside from './Aside'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const Navbar = ({ auth: { isAuthenticated, loading, user } }) => {
  const [aside, setAside] = useState(false)

  const authLinks = (
    <>
      <div className="menu__list-container">
        <ul className="menu__list">
          <li className="menu__list-item">
            <RefreshLink to="/dashboard">Mój Profil</RefreshLink>
          </li>
          <li className="menu__list-item">
            <a href="/jackpot">Jackpot</a>
          </li>
          <li className="menu__list-item">
            <a href="#!">Ruletka</a>
          </li>
        </ul>
      </div>
      <div className="menu__user-icons">
        <div className="menu__value">
          <span className="menu__cash">{user && user.luckycoins}</span>{' '}
          <i className="fas fa-coins"></i>
        </div>
        {user && user.nick && (
          <RefreshLink to="/dashboard" className="menu__user">
            <div className="menu__nick">{user.nick}</div>
            <div
              className="menu__avatar"
              style={user && { backgroundImage: `url(avatars/${user.avatar})` }}
            ></div>
          </RefreshLink>
        )}
      </div>
    </>
  )

  const guestLinks = (
    <>
      <div className="menu__list-container">
        <ul className="menu__list">
          <li className="menu__list-item">
            <RefreshLink to="/">Strona główna</RefreshLink>
          </li>
          <li className="menu__list-item">
            <a href="/jackpot">Jackpot</a>
          </li>
          <li className="menu__list-item">
            <a href="#!">Ruletka</a>
          </li>
        </ul>
      </div>
      <div className="menu__login">
        <div className="menu__register-btn">
          <RefreshLink to="/register">Rejestracja</RefreshLink>
        </div>
        <div className="menu__login-btn">
          <RefreshLink to="/login">Logowanie</RefreshLink>
        </div>
      </div>
    </>
  )

  return (
    <>
      <nav className="menu">
        <div onClick={() => setAside(!aside)} className="menu__burger">
          <i className="fas fa-bars"></i>
        </div>
        <div className="menu__logo">
          <RefreshLink to="/">Luckyspin</RefreshLink>
        </div>
        {!loading && <>{isAuthenticated ? authLinks : guestLinks}</>}
      </nav>
      {aside && (
        <Aside
          user={user}
          isAuthenticated={isAuthenticated}
          loading={loading}
          onclick={() => setAside(!aside)}
        />
      )}
    </>
  )
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})

export default connect(mapStateToProps)(Navbar)
