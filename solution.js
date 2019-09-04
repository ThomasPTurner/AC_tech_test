const fs = require('fs');
const utils = require('./utils')

const getMostExpensive = (filepath) => {
    const dataArray = fs.readFileSync(filepath,'utf8').split("\n")
    const costsObj = {}
    dataArray.forEach((call) => {
        utils.calculateCosts(call, costsObj)
    })
    console.log(costsObj)
    let PhoneNumber = 0 
    let TotalAmount = 0
    for(let caller in costsObj) {
        if (costsObj[caller].cost > TotalAmount) {
            PhoneNumber = caller,
            TotalAmount = costsObj[caller].cost
        }
    }
    return {
        PhoneNumber,
        TotalAmount
    }
}   



module.exports = getMostExpensive