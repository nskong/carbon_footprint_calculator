
module.exports = function(app) {
    app.get('/vehicle/emissionsFactor', function(req, res) {
        let fuelEconomy = req.query.fuelEconomy;
        let expectedLifetimeMiles = req.query.expectedLifetimeMiles;

        res.send(JSON.stringify("0"));
    })

    app.get('/vehicle/emissions', function(req, res) {
        let miles = req.query.miles;
        let emissionsFactor = req.query.emissionsFactor;

        res.send(JSON.stringify("0"));
    })
}
