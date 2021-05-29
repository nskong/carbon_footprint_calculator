/**
 * @summary Vehicle module that calculates the emissions for a passenger vehicle and taxi
 * I used the vehicle calculations for both taxi and vehicle because I assumed most taxis
 * used passenger vehicles. Emissions are calculated in two steps, first by calculating
 * the emissions factor, then using user mileage to calculate actual emissions
 * 
 * @param {*} app - the node app to export this module to
 * 
 * @route /vehicle/emissionsFactor - get request that returns the emissions factor 
 * @route /vehicle/emissions- get request that returns the emissions in kg CO2 for a 
 * passenger vehicle
 */
module.exports = function(app) {

    /**
     * GET request to get the emissions factor for the vehicle module 
     * @returns status 200 for valid input (>= 0), and the emissionsfactor
     * @return status 400 for invalid input (null, negative input)
     */
    app.get('/vehicle/emissionsFactor', function(req, res) {
        console.log('calculating emissions factor')

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

        res.send(emissionsFactor);
    })


    /**
     * GET request to get the emissions for the vehicle module 
     * @returns status 200 for valid input (>= 0), and the emissions in kg CO2
     * @return status 400 for invalid input (null, negative input)
     */
    app.get('/vehicle/emissions', function(req, res) {
        console.log("calculating vehicle emissions");

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
