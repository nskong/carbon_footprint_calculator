module.exports = function(app) {
    app.get('/bus/emissions', function(req, res) {
        console.log("calculating bus emissions");

        let miles = req.query.miles;

        if (miles === "null") {
            res.status(400).send("input is null");
            return;
        }

        if (miles < 0) {
            res.status(400).send("input is less than or equal to 0");
            return;
        }

        let emissions = 53 * miles;
        emissions = emissions.toFixed(2);

        res.send(emissions);
    })
}