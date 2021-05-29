/**
 * @summary Rail module that calculates the emissions for a passenger given miles. 
 * Calculations are separated into transit and commuter rail. I assumed that the transit
 * rail would act as the Metro category. Emissions factors are from page 5 of this 
 * resource:
 * https://www.epa.gov/sites/production/files/2020-04/documents/ghg-emission-factors-hub.pdf
 * 
 * @param {*} app - the node app to export this module to
 * 
 * @route /rail/transit/emissions - get request that returns the emissions in kg CO2 for 
 * a transit rail trip
 * @route /rail/commuter/emissions - get request that returns the emissions in kg CO2 for
 * a commuter rail trip
 */
module.exports = function(app) {

    /**
     * GET request for emissions for the rail module for transit trips
     * @returns status 200 for valid input (> 0), and the emissions in kg CO2
     * @return status 400 for invalid input (null, negative input)
     */
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

    /**
     * GET request for emissions for the rail module for commuter trips
     * @returns status 200 for valid input (> 0), and the emissions in kg CO2
     * @return status 400 for invalid input (null, negative input)
     */
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