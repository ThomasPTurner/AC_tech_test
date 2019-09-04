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
            landLineMinutes: isInternational ? 0 : minutes,
            internationalMinutes: isInternational ? minutes : 0
        }
    }
    if (time > 20 || time < 9) {
        chargeRate = 1 / 3
    }
    if (direction === "INCOMING") return cost
    if (origin === "INTERNATIONAL") {
        cost += 0.5
        cost += 0.8 * minutes * chargeRate
    }
    if (origin === "LANDLINE") {
        if (costObj[phoneNumber] && costObj[phoneNumber].landLineMinutes + minutes <= 100) {
            cost = 0
        }
        else cost += 0.15 * minutes * chargeRate
    }
    if (origin === "MOBILE") {
        cost += 0.30 * minutes * chargeRate
    }
    // fix JS being bad at floats  
    cost = Math.round(cost * 100) / 100
    
    costObj[phoneNumber].cost += cost
    if (isInternational) {
        costObj[phoneNumber].internationalMinutes += minutes
    } else costObj[phoneNumber].landLineMinutes += minutes
    // returns cost purely for testing
    console.log(time, chargeRate)
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