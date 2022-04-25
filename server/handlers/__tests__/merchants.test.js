const httpMocks = require("node-mocks-http");
const merchantHandler = require("../merchants.js");

const mockFindOne = jest.fn();
const mockCreate = jest.fn();
const mockBcryptHash = jest.fn();
jest.mock("bcrypt", () => {
    return {
        hash: () => mockBcryptHash(),
        genSalt: jest.fn()
    };
})
jest.mock("../../../storage", () => {
    return {
        models: {
            merchant: {
                findOne: () => mockFindOne(),
                create: () => mockCreate(),
            },
        }
    };
})

test("getById found return expected output", async () => {
    const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/merchants/1",
        params: {
            id: 1,
        },
    });
    const response = httpMocks.createResponse();

    mockFindOne.mockResolvedValue({
        id: "1",
        merchant: {
            name: "bagas",
            age: 120
        }
    })
    await merchantHandler.getById(request, response);

    expect(response.statusCode).toEqual(200);
    expect(response._getJSONData()).toEqual({
        id: "1",
        merchant: {
            name: "bagas",
            age: 120
        }
    });
});

test("getById notfound return expected output", async () => {
    const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/merchants/2",
        params: {
            id: 2,
        },
    });
    const response = httpMocks.createResponse();

    mockFindOne.mockResolvedValue(null)
    await merchantHandler.getById(request, response);

    expect(response.statusCode).toEqual(404);
    expect(response._getData()).toEqual('404 - Not found');
});

test("create, without id, return correct response", async () => {
    const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/merchants",
        body: {
            name: 'bagas',
            address: 'address',
            phone_number: '0800000000',
            password: 'password'
        },
    });
    const response = httpMocks.createResponse();

    // mockBcryptHash.mockResolvedValue('010100101010')
    // mockCreate.mockResolvedValue({
    //     id: '1',
    //     password: '010100101010',
    //     name: 'bagas',
    //     address: 'address',
    //     join_date: 1647662016646,
    //     phone_number: '0800000000'
    // })
    await merchantHandler.create(request, response);

    expect(response.statusCode).toEqual(201);
    expect(response._getJSONData()).toEqual({
        success: true
    });
});

test("create, with id, return correct response", async () => {
    const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/merchants",
        body: {
            id: '1',
            name: 'bagas',
            address: 'address',
            phone_number: '0800000000',
            password: 'password'
        },
    });
    const response = httpMocks.createResponse();

    await merchantHandler.create(request, response);

    expect(response.statusCode).toEqual(400);
    expect(response._getJSONData()).toEqual({
        error: "id should not be provided, since it is determined automatically by the database"
    });
});