import React, {useState, useEffect} from 'react';
import axios from  'axios';
import { useParams, Link } from 'react-router-dom';
import AccountCard from "./AccountCard";


function Account() {
    const [account, setAccount] = useState();
    const params = useParams();

    const fetchAccount = (id) => {
        axios
        .get(`http://localhost:5000/api/accounts/${id}`)
        .then((res) => setAccount(res.data))
        .catch((err) => console.log(err.response));
    };

    useEffect(() => {
        fetchAccount(params.id);
    }, [params.id]);
    if (!account) {
        return <div>Loading account info...</div>;
    }

    return (
        <div className="account-wrapper">
            <AccountCard account={account} />
            <Link to={`/edit-account/${account.id}`}>
                <button>Edit Account</button>
            </Link>
        </div>
    );
}

export default Account;