function checkOddEven(num) {
    if (typeof num === "string") {
        throw new Error("n must be a number")
    }
    return num % 2 === 0 ? 'even' : 'odd';
}

module.exports = {
    checkOddEven,
};
