const expect = require("chai").expect;
const request = require("request");

describe("Taxi Emissions", function() {
    describe("Emissions Factor Calculations", function() { 
        let url = "http://localhost:3001/taxi/emissionsFactor?";

        it ("should calculate the emissions factor for a vehicle", function(done) { 
            let fuelEconomy = 25;
            let expectedLifetimeMiles = 150000;
    
            let route = url + "fuelEconomy=" + fuelEconomy + "&expectedLifetimeMiles=" + expectedLifetimeMiles;
            request(route, function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                expect(response.body.emissionsFactor).to.equal(473.2);
                done();
            });
        })

        it ("should calculate the emissions factor for a vehicle with a high fuel economy", function(done) { 
            let fuelEconomy = 36;
            let expectedLifetimeMiles = 150000;

            let route = url + "fuelEconomy=" + fuelEconomy + "&expectedLifetimeMiles=" + expectedLifetimeMiles;
            request(route, function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                expect(response.body.emissionsFactor).to.equal(346.94);
                done();
            });
        })

        it ("should expect bad request for negative input", function(done) { 
            let fuelEconomy = -1;
            let expectedLifetimeMiles = 150000;

            let route = url + "fuelEconomy=" + fuelEconomy + "&expectedLifetimeMiles=" + expectedLifetimeMiles;
            request(route, function(error, response, body) {
                expect(response.statusCode).to.equal(400);
                done();
            });
        })

        it ("should expect bad request for nulls in input", function(done) { 
            let fuelEconomy = null;
            let expectedLifetimeMiles = 150000;
    
            let route = url + "fuelEconomy=" + fuelEconomy + "&expectedLifetimeMiles=" + expectedLifetimeMiles;
            request(route, function(error, response, body) {
                expect(response.statusCode).to.equal(400);
                done();
            });
        })
    })
   

    describe("Emissions (co2) Calculations", function() { 
        let url = "http://localhost:3001/taxi/emissions?";

        it ("should calculate co2 emissions given miles and an emissions factor", function (done) { 
            let emissionsFactor = 473.2;
            let miles = 10000;

            let route = url + "miles=" + miles + "&emissionsFactor=" + emissionsFactor;
            request(route, function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                expect(response.body.emissions).to.equal(4732000);
                done();
            });
        })
    
        it ("should calculate c02 emissions given a low number of miles and an emissions factor", function (done) { 
            let emissionsFactor = 473.2;
            let miles = 7;

            let route = url + "miles=" + miles + "&emissionsFactor=" + emissionsFactor;
            request(route, function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                expect(response.body.emissions).to.equal(3312.4);
                done();
            });
        })

        it ("should expect bad request status code for negative input", function(done) { 
            let emissionsFactor = -1;
            let miles = 7;

            let route = url + "miles=" + miles + "&emissionsFactor=" + emissionsFactor;
            request(route, function(error, response, body) {
                expect(response.statusCode).to.equal(400);
                done();
            });
        })

        it ("should handle nulls in input", function(done) { 
            let emissionsFactor = 473.2;
            let miles = null;

            let route = url + "miles=" + miles + "&emissionsFactor=" + emissionsFactor;
            request(route, function(error, response, body) {
                expect(response.statusCode).to.equal(400);
                done();
            });
        })
    })
})