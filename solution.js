const fs = require('fs');
const utils = require('./utils')

const getMostExpensive = (filepath) => {
    const dataArray = fs.readFileSync(filepath,'utf8').split("\n")
    const costsObj = {}
    dataArray.forEach((call) => {
        utils.calculateCosts(call, costsObj)
    })
    return {
        PhoneNumber: 0,
        TotalAmount: 0,
    }
}   



module.exports = getMostExpensive