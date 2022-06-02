const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/stocks_db');

var db = mongoose.connection;

db.on('error',()=>console.log("DB Connection failed..."));

// db.on('error', console.error.bind(console, 'connection error:'));

db.once('open',()=>console.log("Db Connection successful.."));


module.exports = db;