import React from 'react';
import styles from './ModalInput.module.scss';

const ModalInput = ({tag: Tag, type, name, label, maxLength, setValue, value, ...props}) => (
    <div className={styles.wrapper}>
        <Tag onChange={setValue}
            value={value}
            autoComplete='off'
            placeholder=" "
            type={type}
            name={name}
            maxLength={maxLength}
            required
            className={Tag==='textarea' ? styles.textarea : styles.input}
        />
        <label htmlFor={name}>{label}</label>
    </div>
)

ModalInput.defaultProps = {
    tag: 'input',
    maxLength: 200,
}

export default ModalInput;