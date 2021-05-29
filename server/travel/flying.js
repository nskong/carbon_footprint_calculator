module.exports = function(app) {
    app.get('/flying/short/emissions', function(req, res) {
        let miles = req.query.miles;

        res.send(JSON.stringify("0"));
    })

    app.get('/rail/medium/emissions', function(req, res) {
        let miles = req.query.miles;

        res.send(JSON.stringify("0"));
    })

    app.get('/rail/long/emissions', function(req, res) {
        let miles = req.query.miles;

        res.send(JSON.stringify("0"));
    })
}