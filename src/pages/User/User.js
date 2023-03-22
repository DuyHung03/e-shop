import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';

const User = () => {
    const { user } = useContext(AuthContext);
    return <div>user id: {user.uid}</div>;
};

export default User;
