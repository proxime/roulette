import React, { useState, useEffect } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextInput from '../auth/inputs/TextInput'
import { connect } from 'react-redux';
import Loading from '../layout/Loading';
import RefreshLink from '../../route/RefreshLink';
import Alert from '../layout/Alert';
import { updateUser } from '../../actions/users';
import { clearAlerts } from '../../actions/deleteTrash';

const EditProfile = ({ auth, updateUser, clearAlerts, history }) => {
    const [formData, setFormaData] = useState({
        nick: '',
        name: '',
        email: '',
    });

    const [usedData, setUsedData] = useState({
        nick: false,
        name: false,
        email: false,
    });

    const { nick, name, email } = formData;

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
        updateUser(formData, history);
    }

    useEffect(() => {
        setFormaData({
            nick: auth.user.nick,
            name: auth.user.name,
            email: auth.user.email,
        })
    }, [setFormaData]);

    if (auth.loading) return <Loading />
    if (!auth.user) return <Redirect to='/login' />
    if (!auth.user.nick) return <Redirect to='/welcome' />

    return (
        <div className="form" onSubmit={e => onSubmit(e)}>
            <h1 className="form__title">Edytuj Profil</h1>
            <Alert />
            <form className="form__form">
                <TextInput
                    type="text"
                    name="nick"
                    onchange={onChange}
                    onfocus={handleFocusData}
                    onblur={handleBlurData}
                    useData={usedData.nick}
                    formData={nick}
                    label='Nick'
                    min="3"
                    max="10"
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
                    label='E-mail'
                />
                <div className="form__buttons">
                    <RefreshLink to='/dashboard' className="form__button dark">Powrót</RefreshLink>
                    <button className="form__button">Zapisz</button>
                </div>
                <p className="form__question">Chcesz zmienić hasło? <RefreshLink to="/changePassword" className="form__answer">Kliknij tutaj!</RefreshLink>
                </p>
            </form>
        </div>
    );
}

EditProfile.propTypes = {
    auth: PropTypes.object.isRequired,
    updateUser: PropTypes.func.isRequired,
    clearAlerts: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { updateUser, clearAlerts })(withRouter(EditProfile));