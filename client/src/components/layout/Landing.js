import React from 'react';
import PropTypes from 'prop-types';
import RefreshLink from '../../route/RefreshLink'
import ruletkaImg from '../../img/ruletka.jpg';
import jackpotImg from '../../img/jackpot.jpg';
import { connect } from 'react-redux';

const Landing = ({ isAuthenticated }) => {
    return (
        <>
            <header className="home">
                <div className="home__container">
                    <h1 className="home__logo">Luckyspin</h1>
                    <p className="home__desc">Luckyspin to internetowe kasyno w którym możesz zagrać w Ruletkę lub spróbować
                        szczęścia w Jackpocie z innymi graczami. Nie zwlekaj i dołącz już teraz do licznego grona Luckyspin!
                    </p>
                    <div className="home__buttons">
                        {isAuthenticated ? (
                            <>
                                <RefreshLink to="/dashboard" className="home__login-btn">Mój Profil</RefreshLink>
                            </>
                        ) : (
                                <>
                                    <RefreshLink to="/register" className="home__register-btn">Rejestracja</RefreshLink>
                                    <RefreshLink to="/login" className="home__login-btn">Logowanie</RefreshLink>
                                </>
                            )}
                    </div>
                </div>
            </header>

            <div className="home-page">
                <section className="about">
                    <h1 className="about__title">
                        GRY w Luckyspin
                    </h1>
                    <div className="about__item">
                        <div className="about__desc">
                            <h1 className="about__head"><a href="/jackpot">Jackpot</a></h1>
                            <p className="about__body">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, excepturi! Nam minus sunt
                                corrupti
                                inventore quisquam ducimus eum dolorem temporibus atque
                            </p>
                        </div>
                        <div className="about__image">
                            <img src={jackpotImg} alt="Jackpot" />
                        </div>
                    </div>
                    <div className="about__item about__item--left">
                        <div className="about__desc">
                            <h1 className="about__head"><a href="#!">Ruletka</a></h1>
                            <p className="about__body">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, odit dolor eveniet
                                reprehenderit
                        nostrum saepe ratione obcaecati vel, ipsam consequuntur culpa quaerat nobis soluta magnam atque </p>
                        </div>
                        <div className="about__image">
                            <img src={ruletkaImg} alt="Ruletka" />
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

Landing.propTypes = {
    isAuthenticated: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);