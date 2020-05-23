import React, {useState, useEffect} from 'react';
import axios from 'axios';
// import {useParams} from 'react-router-dom';

        const initialAccount = {
            id: "",
            name: "",
            budget: ""
        };

const EditAccount = props => {
    const [account, editAccount] = useState(initialAccount);
    const [prompt, setPrompt] = useState("");

    // const { id } = useParams();

    const handleUpdate = e => {
        editAccount({...account, [e.target.name]: e.target.value});
    };

    const handleSubmit = e => {
        e.preventDefault();
        console.log("data from EditAccount: handleSubmit: ", account);
        axios
            .put(`http://localhost:5000/api/accounts/${account.id}`, account)
            .then(res => {
                props.editAccount(res.data);
                props.history.push("/");
                console.log("from the then in handlesubmit", res.data);
                setPrompt("Updates in progress...");
                setTimeout(() => {
                }, 2000);
            })
            .catch(err => {
                console.error(err);
                setPrompt("Cannot edit this account...");
            })
            editAccount(initialAccount);
    };

    useEffect(() => {
        axios
        .get(`http://localhost:5000/api/accounts/${account.id}`)
        .then( res=>{
            console.log("update account", res.data);
            editAccount(res.data);})

    }, [account]);
    console.log("troubleshoot");

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

export default EditAccount;