const expect = require("chai").expect;
const request = require("request");

describe("Flying Emissions", function() {
    describe("Short Haul Calculations", function() { 
        let url = "http://localhost:3001/flying/short/emissions?";

        it ("should calculate the emissions for a short haul flight", function(done) { 
            let miles = 25;
    
            let route = url + "miles=" + miles; 
            request(route, function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                expect(body).to.equal("5858.75");
                done();
            });
        })

        it ("should calculate the emissions for a short haul flight", function(done) { 
            let miles = 300;
    
            let route = url + "miles=" + miles; 
            request(route, function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                expect(body).to.equal("70305.00");
                done();
            });
        })

        it ("should expect bad request response for miles over 300", function(done) {
            let miles = 301;
    
            let route = url + "miles=" + miles; 
            request(route, function(error, response, body) {
                expect(response.statusCode).to.equal(400);
                done();
            });
        })

        it ("should calculate the 0 total emissions on 0 miles", function(done) { 
            let miles = 0;
    
            let route = url + "miles=" + miles; 
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

    
    describe("Medium Haul Calculations", function() { 
        let url = "http://localhost:3001/flying/medium/emissions?";

        it ("should calculate the emissions for a medium haul flight", function(done) { 
            let miles = 2000;
    
            let route = url + "miles=" + miles; 
            request(route, function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                expect(body).to.equal("289940.00");
                done();
            });
        })

        it ("should expect bad request response for miles less than or equal to 300", function(done) {
            let miles = 300;
    
            let route = url + "miles=" + miles; 
            request(route, function(error, response, body) {
                expect(response.statusCode).to.equal(400);
                done();
            });
        })

        it ("should expect bad request response for miles over 2300", function(done) {
            let miles = 2301;
    
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


    describe("Long Haul Calculations", function() { 
        let url = "http://localhost:3001/flying/long/emissions?";

        it ("should calculate the emissions for a long haul flight", function(done) { 
            let miles = 2500;
    
            let route = url + "miles=" + miles; 
            request(route, function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                expect(body).to.equal("449625.00");
                done();
            });
        })

        it ("should expect bad request response for miles under 2301", function(done) {
            let miles = 2300;
    
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