import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { clearAlerts } from '../../actions/deleteTrash';
import { addCoins } from '../../actions/users';
import Alert from '../layout/Alert';

const Luckycoins = ({ addCoins, clearAlerts, history }) => {
    const handleAddCoins = coins => {
        clearAlerts();
        addCoins(coins, history);
    }

    return (
        <div className="container">
            <div className="dashboard">
                <Alert />
                <h1 className="dashboard__title">Luckycoins</h1>
                <div className="luckycoins">
                    <div className="luckycoins__item">
                        <div className="luckycoins__title">Zestaw Nowicjusza</div>
                        <div className="luckycoins__icon">
                            <i className="fas fa-coins"></i>
                        </div>
                        <div className="luckycoins__value">
                            10
                    </div>
                        <div className="luckycoins__break"></div>
                        <div onClick={() => handleAddCoins(10)} className="luckycoins__button">
                            Wybierz
                    </div>
                    </div>
                    <div className="luckycoins__item">
                        <div className="luckycoins__title">Mały Zestaw</div>
                        <div className="luckycoins__icon">
                            <i className="fas fa-coins"></i>
                        </div>
                        <div className="luckycoins__value">
                            20
                    </div>
                        <div className="luckycoins__break"></div>
                        <div onClick={() => handleAddCoins(20)} className="luckycoins__button">
                            Wybierz
                    </div>
                    </div>
                    <div className="luckycoins__item">
                        <div className="luckycoins__title">Średni Zestaw</div>
                        <div className="luckycoins__icon">
                            <i className="fas fa-coins"></i>
                        </div>
                        <div className="luckycoins__value">
                            50
                    </div>
                        <div className="luckycoins__break"></div>
                        <div onClick={() => handleAddCoins(50)} className="luckycoins__button">
                            Wybierz
                    </div>
                    </div>
                    <div className="luckycoins__item">
                        <div className="luckycoins__title">
                            Zestaw Premium
                    </div>
                        <div className="luckycoins__icon">
                            <i className="fas fa-coins"></i>
                        </div>
                        <div className="luckycoins__value">
                            100
                    </div>
                        <div className="luckycoins__break"></div>
                        <div onClick={() => handleAddCoins(100)} className="luckycoins__button">
                            Wybierz
                    </div>
                    </div>
                    <div className="luckycoins__item">
                        <div className="luckycoins__title">Zestaw Eksperta</div>
                        <div className="luckycoins__icon">
                            <i className="fas fa-coins"></i>
                        </div>
                        <div className="luckycoins__value">
                            200
                    </div>
                        <div className="luckycoins__break"></div>
                        <div onClick={() => handleAddCoins(200)} className="luckycoins__button">
                            Wybierz
                    </div>
                    </div>
                    <div className="luckycoins__item">
                        <div className="luckycoins__title">Mistrzowski Zestaw</div>
                        <div className="luckycoins__icon">
                            <i className="fas fa-coins"></i>
                        </div>
                        <div className="luckycoins__value">
                            500
                    </div>
                        <div className="luckycoins__break"></div>
                        <div onClick={() => handleAddCoins(500)} className="luckycoins__button">
                            Wybierz
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

Luckycoins.propTypes = {
    addCoins: PropTypes.func.isRequired,
    clearAlerts: PropTypes.func.isRequired,
}

export default connect(null, { addCoins, clearAlerts })(withRouter(Luckycoins));