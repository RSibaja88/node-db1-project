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

module.exports = router;

