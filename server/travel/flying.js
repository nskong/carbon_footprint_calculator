/**
 * @summary Flying module that calculates the emissions for a passenger given miles. 
 * Calculations are separated into short haul trips, medium haul trips, and long haul 
 * trips. Emissions factors are from page 5 of this resource:
 * https://www.epa.gov/sites/production/files/2020-04/documents/ghg-emission-factors-hub.pdf
 * 
 * @param {*} app - the node app to export this module to
 * 
 * @route /flying/short/emissions - get request that returns the emissions in kg CO2 
 * emitted based upon the miles for trips less than 300 miles
 * @route /flying/medium/emissions - get request that returns the emissions in kg CO2 
 * emitted for trips between 300 and 2300 miles
 * @route /flying/long/emissions - get request that returns the emissions in kg CO2 
 * emitted for trips greater than 2300 miles
 */
module.exports = function(app) {

    /**
     * GET request for emissions for the flying module for short trips
     * @returns status 200 for valid input (> 0), and the emissions in kg CO2
     * @return status 400 for invalid input (null, negative input or mileage > 300)
     */
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

     /**
     * GET request for emissions for the flying module for medium trips
     * @returns status 200 for valid input (> 0), and the emissions in kg CO2
     * @return status 400 for invalid input (null, negative input or mileage outside of
     * the correct range)
     */
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

     /**
     * GET request for emissions for the flying module for long trips
     * @returns status 200 for valid input (> 0), and the emissions in kg CO2
     * @return status 400 for invalid input (null, negative input or mileage < 2300)
     */
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