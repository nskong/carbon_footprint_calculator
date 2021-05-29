
module.exports = function(app) {
    app.get('/vehicle/emissionsFactor', function(req, res) {
        let fuelEconomy = req.query.fuelEconomy;
        let expectedLifetimeMiles = req.query.expectedLifetimeMiles;
    })

    app.get('/vehicle/emissions', function(req, res) {
        let miles = req.query.miles;
        let emissionsFactor = req.query.emissionsFactor;
    })
}
