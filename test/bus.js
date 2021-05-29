const expect = require("chai").expect;
const request = require("request");

describe("Bus Emissions", function() {
    describe("Emissions (co2) Calculations", function() { 
        let url = "http://localhost:3001/bus/emissions?";

        it ("should calculate the total emissions for a bus", function(done) { 
            let miles = 25;
    
            let route = url + "miles=" + miles; 
            request(route, function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                expect(response.body.emissions).to.equal(1325);
                done();
            });
        })

        it ("should calculate the total emissions a bus might emit in a day", function(done) { 
            let miles = 81;
    
            let route = url + "miles=" + miles; 
            request(route, function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                expect(response.body.emissions).to.equal(4293);
                done();
            });
        })

        it ("should calculate the total emissions a bus might emit in a week", function(done) { 
            let miles = 405;
    
            let route = url + "miles=" + miles; 
            request(route, function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                expect(response.body.emissions).to.equal(21465);
                done();
            });
        })

        it ("should calculate the 0 total emissions on 0 miles", function(done) { 
            let miles = 0;
    
            let route = url + "miles=" + miles; 
            request(route, function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                expect(response.body.emissions).to.equal(0);
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