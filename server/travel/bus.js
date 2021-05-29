module.exports = function(app) {
    app.get('/bus/emissions', function(req, res) {
        let miles = req.query.miles;

        res.send(JSON.stringify("0"));
    })
}