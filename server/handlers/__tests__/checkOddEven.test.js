const httpMocks = require("node-mocks-http");
const mathHandler = require("../math.js");

test.each([
    [3, "odd", null, 200],
    [4, "even", null, 200],
    ["4", null, "n must be a number", 200],
])("input %d should return data: '%s', error: '%s', status code: %d", async (input, expectedData, errorMessage, statusCode) => {
    const request = httpMocks.createRequest({
        method: "POST",
        url: "/checkoddeven",
        body: {
            n: input,
        },
    });
    const response = httpMocks.createResponse();
    await mathHandler.checkOddEven(request, response);
    expect(response.statusCode).toEqual(statusCode);
    expect(response._getJSONData()).toEqual({
        data: expectedData,
        error: errorMessage
    });
});

