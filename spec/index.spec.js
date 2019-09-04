const { expect } = require('chai')
const filepath = "./data/example.csv"
const getMostExpensive = require('../solution')


describe('getMostExpensive', () => {
    it('returns an object in the correct format', () => {
        expect(getMostExpensive(filepath)).to.have.keys("PhoneNumber", "TotalAmount")
    });
});

describe('calculateCosts', () => {
    it('does not charge for incoming calls', ()=> {
        expect(calculateCosts().cost)
    })
})

