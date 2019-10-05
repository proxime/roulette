import React from 'react';

const TextInput = ({ type, name, onchange, onfocus, onblur, useData, formData, label, min, max, value }) => {
    return (
        <div className="input">
            <label
                className={`input__label ${(useData || formData) && 'input__label--active'}`}
                htmlFor={name}>
                {label}
            </label>

            <input
                className="input__field"
                type={type}
                name={name}
                id={name}
                autoComplete="off"
                value={formData}
                onChange={e => onchange(e)}
                onFocus={e => onfocus(e)}
                onBlur={e => onblur(e)}
                minLength={min}
                maxLength={max}
                required
            />
        </div>
    );
}

export default TextInput;