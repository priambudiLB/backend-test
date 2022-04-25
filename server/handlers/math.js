const mathModel = require("../../storage/models/math.model");

const checkOddEven = async (req, res) => {
    const { n } = req.body;
    try {
        const result = await mathModel.checkOddEven(n);
        res.json({
            data: result,
            error: null
        });
    } catch (e) {
        res.json({
            data: null,
            error: e.message
        });
    } finally {
        res.end();
    }
};

module.exports = {
    checkOddEven,
};
