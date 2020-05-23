import React from 'react';
import { Link } from 'react-router-dom';
import AccountCard from "./AccountCard";

function AccountList({ accounts }) {
    return (
        <div className="account-list">
            {
                accounts.map(account => (
                    <Link key={account.id} to={`/accounts/${account.id}`}>
                        <AccountCard account={account} />
                    </Link>
                ))
            }
        </div>
    );
}

export default AccountList;