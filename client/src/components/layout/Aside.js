import React from 'react';
import RefreshLink from '../../route/RefreshLink';

const Aside = ({ onclick, isAuthenticated, loading, user }) => {
    const handleClick = e => {
        if (e.target.classList.contains('leftbar')) {
            onclick();
        }
    }

    const authLinks = (
        <>
            <ul className="leftbar__list">
                <li><RefreshLink to="/dashboard">Mój Profil</RefreshLink></li>
                <li><a href="/jackpot">Jackpot</a></li>
                <li><a href="#!">Ruletka</a></li>
            </ul>
            {user && user.nick && (
                <div className="leftbar__user-buttons">
                    <RefreshLink to="/dashboard" className="leftbar__avatar"></RefreshLink>
                    <RefreshLink to="/dashboard" className="leftbar__nick">{user.nick}</RefreshLink>
                </div>
            )}
        </>
    )

    const guestLinks = (
        <>
            <ul className="leftbar__list">
                <li><RefreshLink to="/">Strona główna</RefreshLink></li>
                <li><a href="/jackpot">Jackpot</a></li>
                <li><a href="#!">Ruletka</a></li>
            </ul>
            <div className="leftbar__login-buttons">
                <div className="leftbar__register-btn"><RefreshLink to="/register">Rejestracja</RefreshLink></div>
                <div className="leftbar__login-btn"><RefreshLink to="/login">Logowanie</RefreshLink></div>
            </div>
        </>
    )

    return (
        <aside className="leftbar" onClick={e => handleClick(e)}>
            <div className="leftbar__bar">
                <h1 className="leftbar__title">Menu</h1>
                {!loading && (<>
                    {isAuthenticated ? authLinks : guestLinks}
                </>)}
            </div>
        </aside>
    );
}

export default Aside;