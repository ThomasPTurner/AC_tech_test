const calculateCosts = (call, costObj = {}) => {
    console.log(call)
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
    if (phoneNumber.slice(0,2) === "00") {
        return "INTERNATIONAL"
    }
}

module.exports = { calculateCosts, getOrigin }