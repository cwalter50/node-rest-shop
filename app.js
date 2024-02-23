const express = require('express');

const app = express();

const productRoutes = require('./api/routes/products');

const orderRoutes = require('./api/routes/orders');

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

// app.listen(port, () => {
//     console.log("Server Listening on PORT:", port);
// });

app.use((req, res, ext) => {
    res.status(200).json({
        message: 'It Works!'
    });
});

module.exports = app;
