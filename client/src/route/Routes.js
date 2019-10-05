import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import PrivateRoute from './PrivateRoute';
import Navbar from '../components/layout/Navbar';
import Landing from '../components/layout/Landing';
import Register from '../components/auth/Register';
import Login from '../components/auth/Login';
import Footer from '../components/layout/Footer';
import Dashboard from '../components/dashboard/Dashboard';
import Loading from '../components/layout/Loading';
import EditProfile from '../components/dashboard/EditProfile';
import ChangePassword from '../components/dashboard/ChangePassword';
import Luckycoins from '../components/dashboard/Luckycoins';
import Jackpot from '../components/games/Jackpot';
import { connect } from 'react-redux';


const Routes = ({ loading }) => {

    if (loading) {
        return <Loading />
    }

    return (
        <>
            <Navbar />
            <div className="min-height">
                <div className="min-container">
                    <Route exact path="/" component={Landing} />
                    <Switch>
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/jackpot" component={Jackpot} />
                        <PrivateRoute exact path="/dashboard" component={Dashboard} />
                        <PrivateRoute exact path="/editProfile" component={EditProfile} />
                        <PrivateRoute exact path="/changePassword" component={ChangePassword} />
                        <PrivateRoute exact path="/luckycoins" component={Luckycoins} />
                    </Switch>
                </div>
                <Footer />
            </div>
        </>
    );
}

Routes.propTypes = {
    loading: PropTypes.bool,
}

const mapStateToProps = state => ({
    loading: state.auth.loading
});

export default connect(mapStateToProps)(Routes);

