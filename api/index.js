const express = require('express');
const _ = require('lodash');
const fetch = require('node-fetch');


const app = express();
const port = 8080;

app.get('/', (req, res) =>{
 res.send('Hello, library'); 
})

app.listen(port, () =>{
  console.log('Listening on port', port);
})

