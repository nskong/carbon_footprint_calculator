/**
 * @deprecated Since taxis are mostly the same as passenger vehicles, I used the 
 * same calculations for both
 */
module.exports = function(app) {
    app.get('/taxi/emissionsFactor', function(req, res) {
        console.log('calculating taxi emissions factor')

        let fuelEconomy = req.query.fuelEconomy;
        let expectedLifetimeMiles = req.query.expectedLifetimeMiles;

        if ((fuelEconomy === "null") || (expectedLifetimeMiles === "null")) { 
            res.status(400).send("input is null");
            return;
        }

        if ((fuelEconomy <= 0) || (expectedLifetimeMiles <= 0)) { 
            res.status(400).send("input is less than or equal to 0");
            return;
        }

        let directEmissions = 8.78 / fuelEconomy * 1000;
        let indirectEmissions = 1.55 / fuelEconomy * 1000;
        let constructionEmissions = 9000 / expectedLifetimeMiles * 1000;

        let emissionsFactor = directEmissions + indirectEmissions + constructionEmissions;
        emissionsFactor = emissionsFactor.toFixed(2);

        res.send(emissionsFactor)
    })

    app.get('/taxi/emissions', function(req, res) {
        console.log("calculating taxi emissions");

        let miles = req.query.miles;
        let emissionsFactor = req.query.emissionsFactor;

        if ((miles == "null") || (emissionsFactor == "null")) { 
            res.status(400).send("input is null");
            return;
        }

        if ((miles <= 0) || (emissionsFactor <= 0)) { 
            res.status(400).send("input is less than or equal to 0");
            return;
        }

        let emissions = miles * emissionsFactor;
        emissions = emissions.toFixed(2)

        res.send(emissions);
    })
}




 
