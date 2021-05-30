const expect = require("chai").expect;
const request = require("request");

describe("Fuel Emissions", function() {
    describe("Natural Gas Calculations", function() { 
        let url = "http://localhost:3001/fuel/emissions?type=naturalGas&";

        it ("should calculate emissions for natural gas", function(done) { 
            let unit = 105;
    
            let route = url + "unit=" + unit; 
            request(route, function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                expect(body).to.equal("693.00");
                done();
            });
        })

        it ("should calculate the 0 total emissions on 0 unit", function(done) { 
            let unit = 0;
    
            let route = url + "unit=" + unit; 
            request(route, function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                expect(body).to.equal("0.00");
                done();
            });
        })

        it ("should expect bad request response for negative input", function(done) { 
            let unit = -1;
    
            let route = url + "unit=" + unit; 
            request(route, function(error, response, body) {
                expect(response.statusCode).to.equal(400);
                done();
            });
        })

        it ("should expect bad request response for nulls in input", function(done) { 
            let unit = null;
    
            let route = url + "unit=" + unit; 
            request(route, function(error, response, body) {
                expect(response.statusCode).to.equal(400);
                done();
            });
        })
    })

    describe("Heating Oil Calculations", function() { 
        let url = "http://localhost:3001/fuel/emissions?type=oil&";

        it ("should calculate emissions for heating oil", function(done) { 
            let unit = 105;
    
            let route = url + "unit=" + unit; 
            request(route, function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                expect(body).to.equal("1218.00");
                done();
            });
        })
    })


    describe("LPG Calculations", function() { 
        let url = "http://localhost:3001/fuel/emissions?type=lpg&";

        it ("should calculate emissions for lpg", function(done) { 
            let unit = 105;
    
            let route = url + "unit=" + unit; 
            request(route, function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                expect(body).to.equal("714.00");
                done();
            });
        })
    })
})