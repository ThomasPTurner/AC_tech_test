const { expect } = require('chai')
const utils = require('../utils')
const filepath = "./data/example.csv"
const getMostExpensive = require('../solution')


describe('getMostExpensive', () => {
    it('returns an object in the correct format', () => {
        expect(getMostExpensive(filepath)).to.have.keys("PhoneNumber", "TotalAmount")
    });
});

describe.only('calculateCosts', () => {
    it('does not charge for incoming calls', ()=> {
        expect(utils.calculateCosts("0044123456,2019-09-04T12:42:01.636Z,01:00,INCOMING")).to.equal(0)
    })
    it('charges 50p connection charge on international calls' , () => {
        expect(utils.calculateCosts("0044123456,2019-09-04T12:42:01.636Z,00:00,OUTGOING")).to.equal(0.5)
    })
    it('charges 80p for each started minute' , () => {
        expect(utils.calculateCosts("0044123456,2019-09-04T12:42:01.636Z,00:01,OUTGOING")).to.equal(1.3)
    })
})

describe('getOrigin', ()=> {
    it('returns INTERNATIONAL for phone numbers beginning with 00', ()=> {
        expect(utils.getOrigin("0044123456")).to.equal('INTERNATIONAL')
    })
})

