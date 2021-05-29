const vehicle = require("../server/travel/vehicle");
const expect = require("chai").expect

describe("Vehicle emissions", function() { 
    describe("Emissions Factor Calculations", function() { 
        it ("should calculate the emissions factor for a vehicle", function() { 
            let fuelEconomy = 25;
            let expectedLifetimeMiles = 150000;
    
            let emissionsFactor = vehicle.calculateEmissionsFactor(fuelEconomy, 
                expectedLifetimeMiles);
    
            expect(emissionsFactor).to.equal(473.2);
        })

        it ("should calculate the emissions factor for a vehicle with a high fuel economy", function() { 
            let fuelEconomy = 36;
            let expectedLifetimeMiles = 150000;
    
            let emissionsFactor = vehicle.calculateEmissionsFactor(fuelEconomy, 
                expectedLifetimeMiles);
    
            expect(emissionsFactor).to.equal(346.94);
        })

        it ("should handle negative numbers in input", function() { 
            let fuelEconomy = -1;
            let expectedLifetimeMiles = 150000;
    
            let emissionsFactor = vehicle.calculateEmissionsFactor(fuelEconomy, 
                expectedLifetimeMiles);
    
            expect(emissionsFactor).to.equal(-1);
        })

        it ("should handle nulls in input", function() { 
            let fuelEconomy = null;
            let expectedLifetimeMiles = 150000;
    
            let emissionsFactor = vehicle.calculateEmissionsFactor(fuelEconomy, 
                expectedLifetimeMiles);
    
            expect(emissionsFactor).to.equal(-1);
        })
    })
    
    describe("Emissions Calculations", function() { 
        it ("should calculate c02 emissions given miles and an emissions factor", function () { 
            let emissionsFactor = 473.2;
            let miles = 10000;
    
            let emissions = vehicle.calculateEmissions(miles, emissionsFactor);
    
            expect(emissions).to.equal(4732000);
        })
    
        it ("should calculate c02 emissions given a low number of miles and an emissions factor", function () { 
            let emissionsFactor = 473.2;
            let miles = 7;
    
            let emissions = vehicle.calculateEmissions(miles, emissionsFactor);
    
            expect(emissions).to.equal(3312.4);
        })

        it ("should handle negative numbers in input", function() { 
            let emissionsFactor = -1;
            let miles = 7;
    
            let emissions = vehicle.calculateEmissions(miles, emissionsFactor);
    
            expect(emissions).to.equal(-1);
        })

        it ("should handle nulls in input", function() { 
            let emissionsFactor = 473.2;
            let miles = null;
    
            let emissions = vehicle.calculateEmissions(miles, emissionsFactor);
    
            expect(emissions).to.equal(-1);
        })
    })
})