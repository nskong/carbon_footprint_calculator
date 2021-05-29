const port = process.env.port || 3001;

const path = require('path');
const express = require('express');

const app = express();

require('./travel/vehicle.js')(app);
require('./travel/bus.js')(app);
require('./travel/taxi.js')(app);
require('./travel/rail.js')(app);
require('./travel/flying.js')(app);

require('./housing/electricity.js')(app);

app.use(express.static(path.resolve(__dirname, '../public/build')));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/build', 'index.html'));
})

app.listen(port, () => {
    console.log('app listening on port ' + port);
});