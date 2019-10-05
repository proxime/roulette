import React, { useState } from 'react';
import RefreshLink from '../../route/RefreshLink';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginUser } from '../../actions/auth';
import { clearAlerts } from '../../actions/deleteTrash';

import TextInput from './inputs/TextInput';
import Alert from '../layout/Alert';

const Login = ({ loginUser, clearAlerts, isAuthenticated }) => {
    const [formData, setFormaData] = useState({
        login: '',
        password: '',
    });

    const [usedData, setUsedData] = useState({
        login: false,
        password: false,
    });

    const { login, password } = formData;

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

    const onSubmit = async e => {
        e.preventDefault();
        clearAlerts();
        loginUser(login, password);
    }

    // Redirect if logged in
    if (isAuthenticated) {
        return <Redirect to="/dashboard" />
    }

    return (
        <div className="form">
            <h1 className="form__title">Logowanie</h1>
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

                <button className="form__button">Zaloguj</button>
                <p className="form__question">
                    Nie posiadasz konta?{' '}
                    <RefreshLink to="/register" className="form__answer">
                        Zarejestruj się!
                    </RefreshLink>
                </p>
            </form>
        </div>
    );
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    clearAlerts: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { loginUser, clearAlerts })(Login);