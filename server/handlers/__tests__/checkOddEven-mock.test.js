const httpMocks = require("node-mocks-http");
const mathHandler = require("../math.js");
const mathModel = require("../../../storage/models/math.model");

jest.mock("../../../storage/models/math.model", () => {
    return {
        checkOddEven: jest.fn()
    };
})

test("[mock] data returned always 'even'", async () => {
    const request = httpMocks.createRequest({
        method: "POST",
        url: "/checkoddeven",
        body: {
            n: 3,
        },
    });
    const response = httpMocks.createResponse();
    mathModel.checkOddEven.mockResolvedValue('even');
    await mathHandler.checkOddEven(request, response);
    expect(response.statusCode).toEqual(200);
    expect(response._getJSONData()).toEqual({
        data: 'even',
        error: null
    });
});
