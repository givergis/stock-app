const express = require('express');

const mongoDB = require('./dbConnection');
const cors = require('cors');
const companyRoute = require('./Company/CompanyRoute');

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const port = process.env.PORT || 5005;


app.use('/Company',companyRoute);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('Frontend/challenge-app/build'))
}

app.listen(port,()=>console.log("server running on port 5005"))