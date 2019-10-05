import React, { useState } from 'react';
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types';
import TextInput from '../auth/inputs/TextInput';
import { connect } from 'react-redux';
import RefreshLink from '../../route/RefreshLink';
import Alert from '../layout/Alert';
import { clearAlerts } from '../../actions/deleteTrash';
import { setAlert } from '../../actions/alert';
import { changePassword } from '../../actions/users';

const ChangePassword = ({ history, setAlert, clearAlerts, changePassword }) => {
    const [formData, setFormaData] = useState({
        password: '',
        password2: '',
        newPassword: '',
    });

    const [usedData, setUsedData] = useState({
        password: false,
        password2: false,
        newPassword: false,
    });

    const { password, password2, newPassword } = formData;

    const onChange = e => setFormaData({
        ...formData,
        [e.target.name]: e.target.value
    });

    const handleFocusData = e => setUsedData({
        [e.target.name]: true
    });

    const handleBlurData = e => setUsedData({
        [e.target.name]: false
    });

    const onSubmit = (e) => {
        e.preventDefault();
        clearAlerts();
        if (newPassword !== password2) {
            setAlert('Hasła nie są identyczne', 'danger')
        } else {
            changePassword(history, password, newPassword);
        }
    }

    return (
        <div className="form">
            <h1 className="form__title">Zmień Hasło</h1>
            <Alert />
            <form onSubmit={(e) => onSubmit(e)} className="form__form">
                <TextInput
                    type="password"
                    name="password"
                    onchange={onChange}
                    onfocus={handleFocusData}
                    onblur={handleBlurData}
                    useData={usedData.password}
                    formData={password}
                    label='Aktualne Hasło'
                />
                <TextInput
                    type="password"
                    name="password2"
                    onchange={onChange}
                    onfocus={handleFocusData}
                    onblur={handleBlurData}
                    useData={usedData.password2}
                    formData={password2}
                    label='Nowe Hasło'
                    min="6"
                    max="16"
                />
                <TextInput
                    type="password"
                    name="newPassword"
                    onchange={onChange}
                    onfocus={handleFocusData}
                    onblur={handleBlurData}
                    useData={usedData.newPassword}
                    formData={newPassword}
                    label='Powtórz Nowe Hasło'
                    min="6"
                    max="16"
                />
                <div className="form__buttons">
                    <RefreshLink to="/dashboard" className="form__button dark">Powrót</RefreshLink>
                    <button className="form__button">Zapisz</button>
                </div>
                <p className="form__question">Chcesz zmienić inne dane? <RefreshLink to="/editProfile" className="form__answer">Kliknij tutaj!</RefreshLink>
                </p>
            </form>
        </div>
    );
}

ChangePassword.propTypes = {
    setAlert: PropTypes.func.isRequired,
    clearAlerts: PropTypes.func.isRequired,
    changePassword: PropTypes.func.isRequired,
}

export default connect(null, { setAlert, clearAlerts, changePassword })(withRouter(ChangePassword));