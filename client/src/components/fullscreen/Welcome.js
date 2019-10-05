import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextInput from '../auth/inputs/TextInput';
import Alert from '../layout/Alert';
import { connect } from 'react-redux';
import { setNick } from '../../actions/users';
import { clearAlerts } from '../../actions/deleteTrash';

const Welcome = ({ setNick, clearAlerts, auth }) => {

    const [formData, setFormaData] = useState({
        nick: '',
    });

    const [usedData, setUsedData] = useState({
        nick: false,
    });

    const { nick } = formData;

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

    const [cardBody, setCardBody] = useState(true)

    if (!auth.loading) {
        if (!auth.user) return <Redirect to="/login" />
        else if (auth.user.nick) return <Redirect to="/dashboard" />
    }

    const onSubmit = async e => {
        clearAlerts();
        setNick(nick);
    }

    return (
        <div className="first-login">
            <div className="first-login__container">
                {cardBody ? (
                    <div className="first-login__item">
                        <div className="first-login__title">Pierwsze Logowanie</div>
                        <div className="first-login__body">
                            <p>Dziękujemy za rejestrację w serwisie Luckyspin.</p>
                            <p> Mamy nadzieję, że będziesz się dobrze bawił.</p>
                            <p>Twoje konto jest już prawie gotowe, jedny co musisz zrobić to przejść i dalej i wybrać swój Nick.
                    </p>
                            <div className="first-login__after-body"></div>
                        </div>
                        <div onClick={() => setCardBody(!cardBody)} className="first-login__button">Dalej</div>
                    </div>
                ) : (
                        <div className="first-login__item">
                            <div className="first-login__title">Wybierz Nick</div>
                            <div className="alert">
                                {/* <div className="alert__item alert__item--first-login">
                                Podany nick jest już w użyciu
                                </div> */}
                                <Alert place='first-login' />
                                <div className="first-login__body">
                                    <p>Proszę wybierz swój nowy nick.</p>
                                </div>
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
                            </div>
                            <div onClick={() => onSubmit()} className="first-login__button">Zapisz</div>
                        </div>
                    )}
            </div>
        </div>
    );
}

Welcome.propTypes = {
    setNick: PropTypes.func.isRequired,
    clearAlerts: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { setNick, clearAlerts })(Welcome);