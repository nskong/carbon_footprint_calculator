const expect = require("chai").expect;
const request = require("request");

describe("Fuel Emissions", function() {
    describe("Natural Gas Calculations", function() { 
        let url = "http://localhost:3001/fuel/naturalGas/emissions?";

        it ("should calculate emissions for natural gas", function(done) { 
            let therm = 105;
    
            let route = url + "therm=" + therm; 
            request(route, function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                expect(body).to.equal("693.00");
                done();
            });
        })

        it ("should calculate the 0 total emissions on 0 therm", function(done) { 
            let therm = 0;
    
            let route = url + "therm=" + therm; 
            request(route, function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                expect(body).to.equal("0.00");
                done();
            });
        })

        it ("should expect bad request response for negative input", function(done) { 
            let miles = -1;
    
            let route = url + "miles=" + miles; 
            request(route, function(error, response, body) {
                expect(response.statusCode).to.equal(400);
                done();
            });
        })

        it ("should expect bad request response for nulls in input", function(done) { 
            let miles = null;
    
            let route = url + "miles=" + miles; 
            request(route, function(error, response, body) {
                expect(response.statusCode).to.equal(400);
                done();
            });
        })
    })
})