import React, { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import AccountList from "./AccountList";
import Account from "./Account";
import EditAccount from "./EditAccount";
import AddAccount from "./AddAccount";
import axios from 'axios';
import './App.css';

const App = () => {
  const [accountList, setAccountList] = useState([]);

  const getAccountList = () => {
    axios
    .get("http://localhost:5000/api/accounts")
    .then(res => setAccountList(res.data))
    .catch(err => console.log(err.response));
  };

  useEffect(() => {
    getAccountList();
  }, []);

  return (
    <>
      <Route exact path="/">
          <AccountList accounts={accountList} />
      </Route>
      <Route path="/accounts/:id">
        <Account />
      </Route>
      <Route 
        path="/edit-account/:id"
        render={props => (
          <EditAccount {...props} accountList={accountList} editAccount={setAccountList} />
        )}>
        </Route>
        <Route
          path="add-account/:id"
          render={props => (
            <AddAccount {...props} accountList={accountList} addAccount={setAccountList}/>
          )}>
          <button>Add Account</button>
         </Route>
      </>
  );

};

export default App;