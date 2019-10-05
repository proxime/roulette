import React from 'react';

const Loading = () => {
    return (
        <div className="loading">
            <svg className="loading__svg">
                <rect></rect>
            </svg>
            <h1 className="loading__title">Luckyspin</h1>
        </div>
    );
}

export default Loading;