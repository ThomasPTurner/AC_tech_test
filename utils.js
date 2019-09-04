const calculateCosts = (call, costObj = {}) => {
    const moment = require('moment')
    const [phoneNumber, startTime, duration, direction] = call.split(",")
    const seconds = (+duration.slice(3) > 0)
    let minutes = +duration.slice(0,2)
    if (seconds > 0) minutes += 1
    let cost = 0
    const origin = getOrigin(phoneNumber)
    const isInternational = (origin === "INTERNATIONAL")
    const time = moment(startTime).hour()
    let chargeRate = 1
    // create entry if doesn't exist    
    if (!costObj[phoneNumber]) {
        costObj[phoneNumber] = {
            cost,
            landLineMinutes: 0,
            internationalMinutes: 0
        }
    }
    if (time > 20 || time < 9) {
        chargeRate = 1 / 3
    }
    if (direction === "INCOMING") return cost
    if (origin === "INTERNATIONAL") {
        cost += 0.5
        if (costObj[phoneNumber].internationalMinutes < 10) {
            const difference = -10 + costObj[phoneNumber].internationalMinutes + minutes
            cost += difference > 0 ? 0.8 * difference * chargeRate : 0
        } else cost += minutes * 0.8 * chargeRate
    }
    if (origin === "LANDLINE") {
        if (costObj[phoneNumber].landLineMinutes <= 100) {
            const difference = -100 + costObj[phoneNumber].landLineMinutes + minutes
            cost = difference > 0 ? 0.15 * difference * chargeRate : 0
        }
        else cost += 0.15 * minutes * chargeRate
    }
    if (origin === "MOBILE") {
        if (costObj[phoneNumber].landLineMinutes <= 100) {
            const difference = -100 + costObj[phoneNumber].landLineMinutes + minutes
            cost = difference > 0 ? 0.30 * difference * chargeRate : 0
        }
        else cost += 0.30 * minutes * chargeRate
    }
    // fix JS being bad at floats  
    cost = Math.round(cost * 100) / 100
    
    costObj[phoneNumber].cost += cost
    if (isInternational) {
        costObj[phoneNumber].internationalMinutes += minutes
    } else costObj[phoneNumber].landLineMinutes += minutes
    // returns cost purely for testing
    return cost
}


const getOrigin = (phoneNumber) => {
    if (phoneNumber.slice(0,5) === "07624") {
        return "MOBILE"
    }
    if (phoneNumber.slice(0,3) === "076") {
        return "INVALID"
    }
    if (phoneNumber.slice(0,2) === "00") {
        return "INTERNATIONAL"
    }
    if (phoneNumber.slice(0,2) === "07") {
        return "MOBILE"
    }
    if (phoneNumber.slice(0,2) === "01" || phoneNumber.slice(0,2) === "02") {
        return "LANDLINE"
    }
}
module.exports = { calculateCosts, getOrigin }