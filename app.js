// to run the server, type 'npm start' in terminal
// you can also run a server by typing, node server.js
// second option is not as good because you need to stop and rerun with each change.

const express = require('express');
const app = express();
const morgan = require('morgan');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

// helpful tool that tells us how long it takes to get rquests in terminal
app.use(morgan('dev')); 

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
