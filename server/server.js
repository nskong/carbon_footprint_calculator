const port = process.env.port || 3001;

const path = require('path');
const express = require('express');

const app = express();

app.use(express.static(path.resolve(__dirname, '../public/build')));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/build', 'index.html'));
})

app.listen(port, () => {
    console.log('app listening on port ' + port);
});