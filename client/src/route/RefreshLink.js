import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteTrash } from '../actions/deleteTrash';
import PropTypes from 'prop-types';

const RefreshLink = ({ deleteTrash, ...rest }) => {
    const handleClick = () => {
        deleteTrash();
        if (rest.onClick) {
            rest.onClick();
        }
    }

    return (
        <Link
            className={rest.className}
            to={rest.to}
            onClick={() => handleClick()}
        >
            {rest.children}
        </Link>
    )
}

RefreshLink.propTypes = {
    deleteTrash: PropTypes.func.isRequired,
    to: PropTypes.string.isRequired,
    className: PropTypes.string,
}

export default connect(null, { deleteTrash })(RefreshLink);