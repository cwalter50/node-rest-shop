// to run the server, type 'npm start' in terminal
// you can also run a server by typing, node server.js
// second option is not as good because you need to stop and rerun with each change.

const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

// connect to mongoDB database
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

mongoose.connect('mongodb+srv://node-shop:' + process.env.MONGO_ATLAS_PW + '@cluster0.rboohuu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

// helpful tool that tells us how long it takes to get rquests in terminal
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false})); 
app.use(bodyParser.json());

app.use((req, res, next) => {
     // * means every site has access. If you want to limit to just your site, you can do...
     // https://www.mycoolsite.com
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 
        'PUT, POST, PATCH, DELETE, GET'
        );
        return res.status(200).json({

        });
    }
    next();
});

// Routes which handle requests
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

// Error Handling
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

// this was from a different tutorial. It printed a message whenever you started the server. Does not work here.
// app.listen(port, () => {
//     console.log("Server Listening on PORT:", port);
// });

// app.use((req, res, ext) => {
//     res.status(200).json({
//         message: 'It Works!'
//     });
// });

module.exports = app;
