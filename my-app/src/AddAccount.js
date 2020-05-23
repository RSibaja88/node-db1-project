import React, {useState} from 'react';
import axios from 'axios';

        const initialAccount = {
            id: "",
            name: "",
            budget: ""
        };

const AddAccount = props => {
    const [account, addAccount] = useState(initialAccount);
    const [prompt, setPrompt] = useState("");

    const handleUpdate = e => {
        addAccount({...account, [e.target.name]: e.target.value});
    };

    const handleSubmit = e => {
        e.preventDefault();
        console.log("data from AddAccount: handleSubmit: ", account);
        axios
            .post(`http://localhost:5000/api/accounts/${account.id}`, account)
            .then(res => {
                addAccount(res.data);
                console.log("from the AddAccount handlesubmit", res.data);
                setPrompt("Updates in progress...");
                setTimeout(() => {
                }, 2000);
            })
            .catch(err => {
                console.error(err);
                setPrompt("Cannot add this account...");
            })
            addAccount(initialAccount);
    };

    return (
        <div>
            <h1>{prompt}</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={account.name}
                    onChange={handleUpdate}
                    placeholder="Edit Name..."
                />
                <input  
                    type="number"
                    name="budget"
                    value={account.budget}
                    onChange={handleUpdate}
                    placeholder="Edit Budget..."
                />
                <input type="submit" />
            </form>
        </div>
    );
};

export default AddAccount;