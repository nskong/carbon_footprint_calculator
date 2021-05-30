/**
 * @summary Fuel emissions module that calculates the emissions fuel usage. Fuel 
 * emissions includes natural gas, fuel oil, and LPG. Used example emissions factor 
 * from:
 * http://shrinkthatfootprint.com/calculate-your-carbon-footprint 
 * 
 * @param {*} app - the node app to export this module to
 * 
 * @route /fuel/naturalGas/emissions - GET request that returns the emissions in kg CO2 
 * emitted from natural gas
 */
 module.exports = function(app) {

    /**
     * GET request for emissions from natural gas
     * @returns status 200 for valid input (> 0), and the emissions in kg CO2
     * @return status 400 for invalid input (null or negative input)
     */
    app.get('/fuel/naturalGas/emissions', function(req, res) {
        console.log("calculating natural gas emissions");

        let therm = req.query.therm;

        // handle null input
        if (therm === "null") {
            res.status(400).send("input is null");
            return;
        }

        // handle invalid input
        if (therm < 0) {
            res.status(400).send("input is less than or equal to 0");
            return;
        }

        // valid case
        let emissions = 6.6 * therm;
        emissions = emissions.toFixed(2);

        res.send(emissions);
    })
}