const request = require("supertest");
const app = require("../app");
const { payments,users } = require("../data");

// Reset users array before every test
beforeEach(() => {
  users.length = 0;
});

describe("Register new payments", () => {

    //Create example user data for test cases
    const user = {
    username: "Raisa123",
    password: "Password1",
    email: "raisa@test.com", 
    dob: "2003-11-20",
    cardNumber: "1234567890123456"
    };

    //Push new user to users array before each test
    beforeEach(() => users.push(user)); 

    //Test payments with registered credit card can be registered
    it("Check valid payment", async () => {
    const response = await request(app).post("/payments").send({
        cardNumber: "1234567890123456",
        amount: 100
    });
    expect(response.statusCode).toBe(201);
    });

    //Test payments with unregistered credit card cannot be registered
    it("Check unregistered card", async () => {
    const response = await request(app).post("/payments").send({
        cardNumber: "1234567890000000",
        amount: 100
    });
    expect(response.statusCode).toBe(404);
    });

    //Test payments with invalid amount cannot be registered
    it("Check invalid amount", async () => {
    const response = await request(app).post("/payments").send({
        cardNumber: "1234567890123456",
        amount: 1000
    });
    expect(response.statusCode).toBe(400);
    });
});
