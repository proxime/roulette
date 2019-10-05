import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextInput from '../auth/inputs/TextInput';
import Alert from '../layout/Alert';
import { connect } from 'react-redux';
import { deleteUser } from '../../actions/users';
import { clearAlerts } from '../../actions/deleteTrash';

const DeleteAccount = ({ toggle, deleteUser, clearAlerts }) => {
    const [formData, setFormaData] = useState({
        password: '',
    });

    const [usedData, setUsedData] = useState({
        password: false,
    });

    const { password } = formData;

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

    const handleDelete = () => {
        clearAlerts();
        deleteUser(password);
    }

    return (
        <div className="delete-account">
            <div className="delete-account__container">
                <h1 className="delete-account__title">
                    Usuń Konto
                </h1>
                <Alert />
                <p className="delete-account__desc">
                    Pamiętaj, że usuwanie konta jest permentalne i nie ma możliwości przywrócenia go!
                </p>
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
                <button onClick={() => toggle()} className="delete-account__button dark">Powrót</button>
                <button onClick={() => handleDelete()} className="delete-account__button">Chcę Usunąć Konto!</button>
            </div>
        </div>
    );
}

DeleteAccount.propTypes = {
    deleteUser: PropTypes.func.isRequired,
    clearAlerts: PropTypes.func.isRequired,
}

export default connect(null, { deleteUser, clearAlerts })(DeleteAccount);