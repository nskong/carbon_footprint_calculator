module.exports = function(app) {
    app.get('/rail/transit/emissions', function(req, res) {
        let miles = req.query.miles;

        res.send(JSON.stringify("0"));
    })

    app.get('/rail/commuter/emissions', function(req, res) {
        let miles = req.query.miles;

        res.send(JSON.stringify("0"));
    })
}