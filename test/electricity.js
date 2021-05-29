const expect = require("chai").expect;
const request = require("request");

describe("Electricity Emissions", function() {
    describe("Emissions (co2) Calculations", function() { 
        let url = "http://localhost:3001/electricity/emissions?";

        it ("should calculate the total emissions given a kWh number", function(done) { 
            let kWh = 30;
    
            let route = url + "kWh=" + kWh; 
            request(route, function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                expect(body).to.equal("21.00");
                done();
            });
        })

        it ("should calculate the total emissions from electricity given a larger kWh number", function(done) { 
            let kWh = 2104.01;
    
            let route = url + "kWh=" + kWh; 
            request(route, function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                expect(body).to.equal("1472.81");
                done();
            });
        })

        it ("should calculate the 0 total emissions for 0 kWh", function(done) { 
            let kWh = 0;
    
            let route = url + "kWh=" + kWh; 
            request(route, function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                expect(body).to.equal("0.00");
                done();
            });
        })

        it ("should expect bad request response for negative input", function(done) { 
            let kWh = -1;
   
            let route = url + "kWh=" + kWh;
            request(route, function(error, response, body) {
                expect(response.statusCode).to.equal(400);
                done();
            });
        })

        it ("should expect bad request response for nulls in input", function(done) { 
            let kWh = null;
    
            let route = url + "kWh=" + kWh; 
            request(route, function(error, response, body) {
                expect(response.statusCode).to.equal(400);
                done();
            });
        })
    })
})