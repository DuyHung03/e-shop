import { Modal } from 'antd';
import React, { useContext, useState } from 'react';
import { AppContext } from '../../../../context/AppProvider';
import validator from 'validator';
import './ModalResetPassword.scss';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../../../firebase/firebase';

const ModalResetPassword = () => {
    const { isOpenModal, setIsOpenModal } =
        useContext(AppContext);

    const [email, setEmail] = useState('');

    const handleCloseModal = () => {
        setIsOpenModal(false);
    };

    const handleResetPassword = () => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setIsOpenModal(false);
            })
            .catch((error) => {
                alert(error);
            });
    };

    const handleEmail = (e) => {
        const email = e.target.value;
        e.preventDefault();
        setEmail(validator.trim(email));
    };

    return (
        <Modal
            open={isOpenModal}
            title="Reset Password"
            onCancel={handleCloseModal}
            onOk={handleResetPassword}
            centered
            okText="Send"
        >
            <input
                required
                type="email"
                value={email}
                onChange={handleEmail}
                placeholder="Enter Your Email "
            />
        </Modal>
    );
};

export default ModalResetPassword;
