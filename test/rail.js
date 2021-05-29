const expect = require("chai").expect;
const request = require("request");

describe("Rail Emissions", function() {
    describe("Commuter Rail Calculations", function() { 
        let url = "http://localhost:3001/rail/commuter/emissions?";

        it ("should calculate the emissions for a commuter rail", function(done) { 
            let miles = 25;
    
            let route = url + "miles=" + miles; 
            request(route, function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                expect(body).to.equal(3700);
                done();
            });
        })

        it ("should calculate the 0 total emissions on 0 miles", function(done) { 
            let miles = 0;
    
            let route = url + "miles=" + miles; 
            request(route, function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                expect(body).to.equal(0);
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


    describe("Transit Rail Calculations", function() { 
        let url = "http://localhost:3001/rail/transit/emissions?";

        it ("should calculate the emissions for a transit rail", function(done) { 
            let miles = 25;
    
            let route = url + "miles=" + miles; 
            request(route, function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                expect(body).to.equal(99);
                done();
            });
        })

        it ("should calculate the 0 total emissions on 0 miles", function(done) { 
            let miles = 0;
    
            let route = url + "miles=" + miles; 
            request(route, function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                expect(body).to.equal(0);
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