const calculateCosts = (call, costObj = {}) => {
    const [phoneNumber, startTime, duration, direction] = call.split(",")
    const minutes = +duration.slice(0,2)
    const seconds = +duration.slice(3)
    let cost = 0
    const origin = getOrigin(phoneNumber)
    if (direction === "INCOMING") return cost
    if (origin === "INTERNATIONAL") {
        cost += 0.5
        cost += 0.8 * (minutes + seconds ? 1 : 0)
    }
    if (costObj[phoneNumber]) {
        costObj[phoneNumber] = cost
    } else {
        costObj[phoneNumber] += cost
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