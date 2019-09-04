const calculateCosts = (call, costObj = {}) => {
    const [phoneNumber, startTime, duration, direction] = call.split(",")
    const callObj = {
        startTime,
        duration,
        direction,
        cost: 0
    }
    if (costObj[phoneNumber]) {
        costObj[phoneNumber] = callObj.cost
    } else {
        costObj[phoneNumber] += callObj.cost
    }
    return callObj
}

module.exports = { calculateCosts }