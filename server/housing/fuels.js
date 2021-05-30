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
 * @function getEmissionsFactor - helper function which returns the correct emissions 
 * factor given the type of fuel used
 */
 module.exports = function(app) {

    /**
     * Helper function which returns the correct emissions factor given the type of 
     * fuel in the request
     * @param {string} type - type of fuel
     */
    getEmissionsFactor = (type) => { 
        if (type === "naturalGas") { 
            return 6.6
        } else if (type === "oil") { 
            return 11.6
        } else if (type === "lpg") {
            return 6.8
        }
    }

    /**
     * GET request for emissions from natural gas
     * @returns status 200 for valid input (> 0), and the emissions in kg CO2
     * @return status 400 for invalid input (null or negative input)
     */
    app.get('/fuel/emissions', function(req, res) {
        console.log("calculating natural gas emissions");

        let unit = req.query.unit;
        let type = req.query.type;

        // handle null input
        if ((unit === "null") || (type === "null")) {
            res.status(400).send("input is null");
            return;
        }

        // handle invalid input
        if (unit < 0) {
            res.status(400).send("input is less than or equal to 0");
            return;
        }

        // handle invalid type
        if ((type != "naturalGas") & (type != "oil") & (type != "lpg")) {
            res.status(400).send("invalid type");
            return;
        }

        let emissionsFactor = getEmissionsFactor(type);

        // valid case
        let emissions = emissionsFactor * unit;
        emissions = emissions.toFixed(2);

        res.send(emissions);
    })
}