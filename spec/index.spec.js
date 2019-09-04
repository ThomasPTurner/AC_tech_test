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
    it('returns MOBILE for phone numbers beginning with 07', () => {
        expect(utils.getOrigin("0744123456")).to.equal('MOBILE')
    })
    it('does not return MOBILE for phone numbers beginning with 076', () => {
        expect(utils.getOrigin("0764123456")).to.not.equal('MOBILE')
    })
    it('special mobile case for 07624', () => {
        expect(utils.getOrigin("0762423456")).to.equal('MOBILE')
    })
    it('returns LANDLINE for phone numbers beginning with 01 or 02', () => {
        expect(utils.getOrigin("0162423456")).to.equal('LANDLINE')
        expect(utils.getOrigin("0262423456")).to.equal('LANDLINE')
    })
})

