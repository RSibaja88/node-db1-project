const express = require('express');
const db = require('./data/dbConfig');
const router = express.Router();


//api posts here
router.get('/', (req, res) => {
db('accounts')
   .then((accounts) => {
       res.status(200).json(accounts);
   })
   .catch((err) => {
       res.status(500).json({message: "failed to get accounts"});
   });
});

router.get("/:id", (req, res) => {
    const {id} = req.params;
    db.select()
        .from('accounts')
        .where({id})
        .then(accounts => {
            const account = accounts[0];
            if (account) {
                res.status(200).json(account);
            } else {
                res.status(400).json({message: "account with that id not found."})
            }
        })
        .catch(err => res.status(500).json({message: err.message}))
});

router.post('/', (req, res) => {
    const postAcct = req.body;
    db.select()
    .from('accounts')
    .insert(postAcct)
    .then(account => {
        res.status(201).json(account);
    })
    .catch(err => {
        res.status(500).json({message: "failed to add new account.", err});
    });
});

router.put('/:id', (req, res) => {
    const {id} = req.params;
    const changes = req.body;
    db.select()
    .from('accounts')
    .where({id})
    .update(changes)
    .then(count => {
        if (count) {
            res.json(count);
        } else {
            res.status(404).json({message: "invalid ID"});
        }
    })
    .catch(err => {
        res.status(500).json({message: "error updating", err})
    });
});

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    db.select()
    .from('accounts')
    .where({id})
    .del()
    .then(count => {
        if (count > 0) {
            res.status(200).json({message: "account was deleted"})
        } else {
            res.status(404).json({message: "account does not exist"});
        }
    })
    .catch(err => {
        res.status(500).json({message: "could not delete this account", err});
    });    
});

module.exports = router;

