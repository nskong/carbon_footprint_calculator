module.exports = function(app) {
    app.get('/flying/short/emissions', function(req, res) {
        console.log("calculating short haul flying emissions")

        let miles = req.query.miles;

        if (miles === "null") {
            res.status(400).send("input is null");
            return;
        }

        if (miles < 0) {
            res.status(400).send("input is less than or equal to 0");
            return;
        }

        if (miles > 300) {
            res.status(400).send("miles are greater than 300, try medium or long haul");
            return;
        }

        let emissions = 215 * 1.09 * miles;
        emissions = emissions.toFixed(2);

        res.send(emissions)
    })

    app.get('/flying/medium/emissions', function(req, res) {
        console.log("calculating medium haul flying emissions")

        let miles = req.query.miles;

        if (miles === "null") {
            res.status(400).send("input is null");
            return;
        }

        if (miles <= 300) {
            res.status(400).send("input is less than 300, try short haul");
            return;
        }

        if (miles > 2300) {
            res.status(400).send("miles are greater than 2300, try long haul");
            return;
        }

        let emissions = 133 * 1.09 * miles;
        emissions = emissions.toFixed(2);

        res.send(emissions)
    })

    app.get('/flying/long/emissions', function(req, res) {
        console.log("calculating long haul flying emissions")

        let miles = req.query.miles;

        if (miles === "null") {
            res.status(400).send("input is null");
            return;
        }

        if (miles <= 2300) {
            res.status(400).send("input is less than 300, try short or medium haul");
            return;
        }

        let emissions = 165 * 1.09 * miles;
        emissions = emissions.toFixed(2);

        res.send(emissions)
    })
}