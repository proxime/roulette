import React, { useState } from 'react';
import { connect } from 'react-redux';
import RefreshLink from '../../route/RefreshLink';
import { Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import { clearAlerts } from '../../actions/deleteTrash';
import PropTypes from 'prop-types';

import TextInput from './inputs/TextInput';
import Alert from '../layout/Alert';

const Register = ({ setAlert, register, clearAlerts, isAuthenticated }) => {
    const [formData, setFormaData] = useState({
        login: '',
        name: '',
        email: '',
        password: '',
        password2: '',
        year: false,
        regulations: false
    });

    const [usedData, setUsedData] = useState({
        login: false,
        name: false,
        email: false,
        password: false,
        password2: false,
    });

    const { login, name, email, password, password2, year, regulations } = formData;

    const onChange = e => setFormaData({
        ...formData,
        [e.target.name]: e.target.value
    });

    const onCheck = e => setFormaData({
        ...formData,
        [e.target.name]: e.target.checked
    });

    const handleFocusData = e => setUsedData({
        [e.target.name]: true
    });

    const handleBlurData = e => setUsedData({
        [e.target.name]: false
    });

    const onSubmit = async e => {
        e.preventDefault();
        clearAlerts();
        if (password !== password2) {
            setAlert('Hasła nie są identyczne', 'danger')
        } else {
            register({
                login,
                name,
                email,
                password,
                year,
                regulations
            });
        }
    }

    // Redirect if logged in
    if (isAuthenticated) {
        return <Redirect to="/dashboard" />
    }

    return (
        <div className="form">
            <h1 className="form__title">Rejestracja</h1>
            <Alert />
            <form className="form__form" onSubmit={e => onSubmit(e)}>
                <TextInput
                    type="text"
                    name="login"
                    onchange={onChange}
                    onfocus={handleFocusData}
                    onblur={handleBlurData}
                    useData={usedData.login}
                    formData={login}
                    label='Login'
                    min="6"
                    max="16"
                />
                <TextInput
                    type="text"
                    name="name"
                    onchange={onChange}
                    onfocus={handleFocusData}
                    onblur={handleBlurData}
                    useData={usedData.name}
                    formData={name}
                    label='Imię i Nazwisko'
                />
                <TextInput
                    type="email"
                    name="email"
                    onchange={onChange}
                    onfocus={handleFocusData}
                    onblur={handleBlurData}
                    useData={usedData.email}
                    formData={email}
                    label='E-Mail'
                />
                <TextInput
                    type="password"
                    name="password"
                    onchange={onChange}
                    onfocus={handleFocusData}
                    onblur={handleBlurData}
                    useData={usedData.password}
                    formData={password}
                    label='Hasło'
                />
                <TextInput
                    type="password"
                    name="password2"
                    onchange={onChange}
                    onfocus={handleFocusData}
                    onblur={handleBlurData}
                    useData={usedData.password2}
                    formData={password2}
                    label='Powtórz Hasło'
                />

                <div className="check">
                    <label className="check__label" htmlFor="year">
                        {year && <i className="fas fa-check"></i>}
                    </label>
                    <input
                        className="check__input"
                        type="checkbox"
                        name="year"
                        id="year"
                        checked={year}
                        onChange={e => onCheck(e)}
                    />
                    <p className="check__desc">
                        Potwierdzam, że mam ukończone 18 lat.
                    </p>
                </div>

                <div className="check">
                    <label className="check__label" htmlFor="regulations">
                        {regulations && <i className="fas fa-check"></i>}
                    </label>
                    <input
                        className="check__input"
                        type="checkbox"
                        name="regulations"
                        id="regulations"
                        checked={regulations}
                        onChange={e => onCheck(e)}
                    />
                    <p className="check__desc">
                        Zapoznałem się z regulaminem serwisu i akceptuję go.
                    </p>
                </div>

                <button className="form__button">Zarejestruj</button>
                <p className="form__question">
                    Posiadasz już konto?{' '}
                    <RefreshLink to="/login" className="form__answer">
                        Zaloguj się!
                    </RefreshLink>
                </p>
            </form>
        </div>
    );
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    clearAlerts: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register, clearAlerts })(Register);