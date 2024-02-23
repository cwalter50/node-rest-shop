const express = require('express');
const router = express.Router();

// /orders is already in the app.js file. 
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /orders'
    });
});


router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'Handling POST requests to /orders'
    });
});

router.get('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    res.status(200).json({
        message: 'Order details',
        id: id
    });
});


router.delete('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    res.status(200).json({
        message: 'Deleted Order!',
        id: id
    });
});

module.exports = router;
