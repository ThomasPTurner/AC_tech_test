const calculateCosts = (call, costObj = {}) => {
    const [phoneNumber, startTime, duration, direction] = call.split(",")
    const callObj = {
        startTime,
        duration,
        direction,
        cost: 0,
        origin: getOrigin(phoneNumber)
    }
    if (callObj.direction === "INCOMING") return callObj
    if (callObj.origin === "INTERNATIONAL") {
        callObj.cost += 0.5
    }
    if (costObj[phoneNumber]) {
        costObj[phoneNumber] = callObj.cost
    } else {
        costObj[phoneNumber] += callObj.cost
    }
    return callObj
}

const getOrigin = (phoneNumber) => {
    if (phoneNumber.slice(0,2) === "00") {
        return "INTERNATIONAL"
    }
}

module.exports = { calculateCosts, getOrigin }