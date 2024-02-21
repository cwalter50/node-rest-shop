const express = require('express');

const app = express();

// app.listen(port, () => {
//     console.log("Server Listening on PORT:", port);
// });

app.use((req, res, ext) => {
    res.status(200).json({
        message: 'It Works!'
    });
});

module.exports = app;
