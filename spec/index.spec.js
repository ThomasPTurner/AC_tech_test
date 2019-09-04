const { expect } = require('chai')
const utils = require('../utils')
const filepath = "./data/example.csv"
const getMostExpensive = require('../solution')


describe('getMostExpensive', () => {
    it('returns an object in the correct format', () => {
        expect(getMostExpensive(filepath)).to.have.keys("PhoneNumber", "TotalAmount")
    });
});

describe('calculateCosts', () => {
    it('does not charge for incoming calls', ()=> {
        expect(utils.calculateCosts("0044123456,2019-09-04T12:42:01.636Z,01:00,INCOMING").cost).to.equal(0)
    })
})

