import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { changeAvatar } from '../../actions/users'

const ChangeAvatar = ({ setChangeAvatarWindow, changeAvatar, avatarL }) => {
  const [avatar, setAvatar] = useState(null)
  const [avatarLink, setAvatarLink] = useState(null)

  useEffect(() => {
    setAvatarLink(avatarL)
  }, [])

  const changeImage = e => {
    if (e.target.files[0]) {
      setAvatar(e.target.files[0])
      const fr = new FileReader()
      fr.onload = () => setAvatarLink(fr.result)
      fr.readAsDataURL(e.target.files[0])
    }
  }

  const onSubmit = e => {
    e.preventDefault()
    if (!avatar) return
    changeAvatar(avatar)
  }

  return (
    <>
      <div className="change-avatar">
        <h1 className="change-avatar__title">Zmień avatar</h1>
        <div
          className="change-avatar__avatar"
          style={avatarLink && { backgroundImage: `url(${avatarLink})` }}
        ></div>
        <form className="change-avatar__form" onSubmit={e => onSubmit(e)}>
          <label>
            <div className="change-avatar__input">Wybierz Avatar</div>
            <input
              type="file"
              name="file"
              accept="image/x-png,image/gif,image/jpeg"
              onChange={e => changeImage(e)}
            />
          </label>
          <div className="change-avatar__buttons">
            <div
              className="change-avatar__btn dark"
              onClick={() => setChangeAvatarWindow(false)}
            >
              Powrót
            </div>
            <button className="change-avatar__btn">Zatwierdź</button>
          </div>
        </form>
      </div>
      <div
        className="change-avatar__popup"
        onClick={() => setChangeAvatarWindow(false)}
      ></div>
    </>
  )
}

const mapStateToProps = state => ({
  user: state.auth.user,
})

export default connect(mapStateToProps, { changeAvatar })(ChangeAvatar)
