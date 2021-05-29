/**
 * @summary Electricity emissions module that calculates the emissions from electricity usage.
 * Used example emissions factor from:
 * http://shrinkthatfootprint.com/calculate-your-carbon-footprint 
 * 
 * @param {*} app - the node app to export this module to
 * 
 * @route /electricity/emissions - GET request that returns the emissions in kg CO2 emitted 
 */
module.exports = function(app) {

    /**
     * GET request for emissions for electricity
     * @returns status 200 for valid input (> 0), and the emissions in kg CO2
     * @return status 400 for invalid input (null or negative input)
     */
    app.get('/electricity/emissions', function(req, res) {
        console.log("calculating electricity emissions");

        let kWh = req.query.kWh;

        // handle null input
        if (kWh === "null") {
            res.status(400).send("input is null");
            return;
        }

        // handle invalid input
        if (kWh < 0) {
            res.status(400).send("input is less than or equal to 0");
            return;
        }

        // valid case
        let emissions = 0.7 * kWh;
        emissions = emissions.toFixed(2);

        res.send(emissions);
    })
}