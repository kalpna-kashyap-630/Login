const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require ('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');
const path = require('path');
require('dotenv').config();
require('./Models/db');

const PORT = process.env.PORT || 8080;
app.get('/hlw', (req,res) => {
    res.send('New User');
})

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());


app.use('/auth',AuthRouter);
app.use('/images', express.static(path.join(__dirname, 'images')));
console.log(path.join(__dirname, 'images'));
app.use('/products',ProductRouter)


app.listen(PORT, ()=>{
    console.log(`Server is running on  ${PORT}`);
})