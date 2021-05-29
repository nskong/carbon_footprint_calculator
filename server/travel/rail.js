module.exports = function(app) {
    app.get('/rail/transit/emissions', function(req, res) {
        console.log("calculating transit rail emissions")

        let miles = req.query.miles;

        if (miles === "null") {
            res.status(400).send("input is null");
            return;
        }

        if (miles < 0) {
            res.status(400).send("input is less than or equal to 0");
            return;
        }

        let emissions = 99 * miles;
        emissions = emissions.toFixed(2);

        res.send(emissions);
    })

    app.get('/rail/commuter/emissions', function(req, res) {
        console.log("calculating commuter rail emissions")

        let miles = req.query.miles;

        if (miles === "null") {
            res.status(400).send("input is null");
            return;
        }

        if (miles < 0) {
            res.status(400).send("input is less than or equal to 0");
            return;
        }

        let emissions = 148 * miles;
        emissions = emissions.toFixed(2);

        res.send(emissions);
    })
}