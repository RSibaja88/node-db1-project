import React from 'react';
import axios from 'axios';

const AccountCard = props => {
    const { id, name, budget } = props.account;

    const deleteAccount = e => {
        e.preventDefault();
        axios
        .delete(`http://localhost:5000/api/accounts/${id}`)
        .then(res => {
            props.setAccountList(res.data);
            props.history.push("/");
        })
        .catch(err => {
            console.log(err);
        });
    };

    return (
        <div className="account-card">
            <div className="name">
                <h2>{name}</h2>
            </div>
            <div className="budget">
                <h3>{budget}</h3>
            </div>
            <div className="delete-button">
                <button onClick={deleteAccount}>Delete Account</button>
            </div>
        </div>
    );
};

export default AccountCard;