import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import RefreshLink from '../../route/RefreshLink';
import Moment from 'react-moment';
import Loading from '../layout/Loading';
import DeleteAccount from './DeleteAccount'

const Dashboard = ({ auth, logout }) => {
    const [deleteAcc, setDeleteAcc] = useState(false);

    if (auth.loading || !auth.user) {
        return <Loading />
    }

    if (!auth.user.nick) {
        return <Redirect to='/welcome' />
    }



    return (
        <>
            {deleteAcc && <DeleteAccount toggle={() => setDeleteAcc(!deleteAcc)} />}

            <div className="container">
                <div className="dashboard">
                    <h1 className="dashboard__title">Mój profil</h1>
                    <div className="dashboard__profile">
                        <div className="dashboard__avatar">
                            <div className="dashboard__change-avatar">
                                <a href="#!">Edytuj Zdjęcie</a>
                            </div>
                        </div>
                        <h1 className="dashboard__nick">{(auth.user && auth.user.nick) ? auth.user.nick : ''}</h1>
                        <div className="dashboard__info-item">
                            <div className="dashboard__info-title">
                                Imię i Nazwisko
                    </div>
                            <div className="dashboard__info-value">
                                {auth.user.name}
                            </div>
                        </div>
                        <div className="dashboard__info-item">
                            <div className="dashboard__info-title">
                                E-mail
                    </div>
                            <div className="dashboard__info-value">
                                {auth.user.email}
                            </div>
                        </div>
                        <div className="dashboard__info-item">
                            <div className="dashboard__info-title">
                                Data Dołączenia
                    </div>
                            <div className="dashboard__info-value">
                                <Moment format="YYYY/MM/DD">{auth.user.date}</Moment>
                            </div>
                        </div>
                    </div>
                    <div className="dashboard__cards">
                        <div className="dashboard__item">
                            <h1>Edytuj Profil</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae vitae dolorum facere fuga dolores
                        molestias possimus nam deleniti, illo asperiores?</p>
                            <RefreshLink to='/editProfile' className='dashboard__link'>Edytuj Profil</RefreshLink>
                        </div>
                        <div className="dashboard__item">
                            <h1>Luckycoins</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae vitae dolorum facere fuga dolores
                        molestias possimus nam deleniti, illo asperiores?</p>
                            <RefreshLink to="/luckycoins" className='dashboard__link'>Luckycoins</RefreshLink>
                        </div>
                        <div className="dashboard__item">
                            <h1>Usuń Konto</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae vitae dolorum facere fuga dolores
                        molestias possimus nam deleniti, illo asperiores?</p>
                            <div style={{ cursor: 'pointer' }} className='dashboard__link' onClick={() => setDeleteAcc(!deleteAcc)}>Usuń Konto</div>
                        </div>
                        <div className="dashboard__item">
                            <h1>Wyloguj</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae vitae dolorum facere fuga dolores
                        molestias possimus nam deleniti, illo asperiores?</p>
                            <RefreshLink className='dashboard__link' onClick={() => logout()} to="/">Wyloguj</RefreshLink>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Dashboard);