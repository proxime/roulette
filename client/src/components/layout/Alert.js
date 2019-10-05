import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeAlert } from '../../actions/alert';

const Alert = ({ alerts, removeAlert, place }) => {
    const alertsArray = alerts !== null && alerts.length > 0 && alerts.map(alert => (
        <div
            key={alert.id}
            className={`alert__item ${place && `alert__item--${place}`} ${alert.alertType && `alert__item--${alert.alertType}`}`}
        >
            {alert.msg}
            <div className="alert__remove" onClick={() => removeAlert(alert.id)}>
                <i className="fas fa-times"></i>
            </div>
        </div>
    ))

    return (
        <div className="alert">
            {alertsArray}
        </div>
    );
}

Alert.propTypes = {
    alerts: PropTypes.array.isRequired,
    removeAlert: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    alerts: state.alert
})

export default connect(mapStateToProps, { removeAlert })(Alert);