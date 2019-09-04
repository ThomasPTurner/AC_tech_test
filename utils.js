const calculateCosts = (call, costObj = {}) => {
    const [phoneNumber, startTime, duration, direction] = call.split(",")
    const seconds = +duration.slice(3)
    const minutes = +duration.slice(0,2) + seconds ? 1 : 0
    let cost = 0
    const origin = getOrigin(phoneNumber)
    const isInternational = (origin === "INTERNATIONAL")
    if (direction === "INCOMING") return cost
    if (origin === "INTERNATIONAL") {
        cost += 0.5
        cost += 0.8 * minutes
    }
    if (origin === "LANDLINE") {
        cost += 0.15 * minutes
    }
    if (origin === "MOBILE") {
        cost += 0.30 * minutes
    }
    if (!costObj[phoneNumber]) {
        costObj[phoneNumber] = {
            cost,
            landLineMinutes: isInternational ? 0 : minutes,
            internationalMinutes: isInternational ? minutes : 0
        }
    } else {
        costObj[phoneNumber].cost += cost
        if (isInternational) {
            costObj[phoneNumber].internationalMinutes += minutes
        } else costObj[phoneNumber].internationalMinutes += minutes
    }
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
    if (phoneNumber.slice(0,2) === "01") {
        return "LANDLINE"
    }
    if (phoneNumber.slice(0,2) === "02") {
        return "LANDLINE"
    }
}

module.exports = { calculateCosts, getOrigin }