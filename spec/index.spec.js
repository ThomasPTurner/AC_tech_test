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
    it('charges 50p connection charge on international calls' , () => {
        expect(utils.calculateCosts("0044123456,2019-09-04T12:42:01.636Z,00:00,OUTGOING").cost).to.equal(0.5)
    })
})

describe('getOrigin', ()=> {
    it('returns INTERNATIONAL for phone numbers beggining with 00', ()=> {
        expect(utils.getOrigin("0044123456")).to.equal('INTERNATIONAL')
    })
})

