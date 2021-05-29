/**
 * @summary Bus module that calculates the emissions for a bus given miles. Used this
 * resource for emissions factor on page 5: 
 * https://www.epa.gov/sites/production/files/2020-04/documents/ghg-emission-factors-hub.pdf
 * 
 * @param {*} app - the node app to export this module to
 * 
 * @route /bus/emissions - get request that returns the emissions in kg CO2 emitted 
 * based upon the miles in the route
 */
module.exports = function(app) {

    /**
     * get request for the bus module
     * @returns status 200 for valid input (> 0), and the emissions in kg CO2
     * @return status 400 for invalid input (null or negative input)
     */
    app.get('/bus/emissions', function(req, res) {
        console.log("calculating bus emissions");

        let miles = req.query.miles;

        // handle null input
        if (miles === "null") {
            res.status(400).send("input is null");
            return;
        }

        // handle invalid input
        if (miles < 0) {
            res.status(400).send("input is less than or equal to 0");
            return;
        }

        // valid case
        let emissions = 53 * miles;
        emissions = emissions.toFixed(2);

        res.send(emissions);
    })
}