const fs = require('fs');
const utils = require('./utils')

const getMostExpensive = (filepath) => {
    const dataArray = fs.readFileSync(filepath,'utf8').split("\n")
    const costsObj = {}
    dataArray.forEach((call) => {
        utils.calculateCosts(call, costsObj)
    })
    let PhoneNumber = 0
    let TotalAmount = 0
    for(let caller in costsObj) {
        if (costsObj[caller].cost > TotalAmount) {
            PhoneNumber = caller,
            TotalAmount = costsObj[caller].cost
        }
    }
    if (TotalAmount === 0) return null
    return {
        PhoneNumber,
        TotalAmount: `£${TotalAmount.toFixed(2)}`
    }
}   



module.exports = getMostExpensive