const request = require("supertest");
const app = require("../app");
const { users } = require("../data");

// Reset users array before every test
beforeEach(() => {
  users.length = 0;
});

describe(" Register New Users", () => {
    //Example user data for test cases 
    const userWithCreditCard = {
    username: "Raisa123",
    password: "Password1",
    email: "raisa@test.com", 
    dob: "2003-11-20",
    cardNumber: "1234567890123456"
    };
    const userWithoutCreditCard = {
    username: "Raisa987",
    password: "Password2",
    email: "raisa123@test.com", 
    dob: "2001-01-15"
    };

    //Checks if users with credit card are filtered correctly
    it("Filter users with credit card", async () => {
    await request(app).post("/users").send(userWithCreditCard);
    await request(app).post("/users").send(userWithoutCreditCard);

    const withCard = await request(app).get("/users?CreditCard=Yes");
    expect(withCard.body).toHaveLength(1);
    });

    //Checks if users without credit card are filtered correctly
    it("Filter users without credit card", async () => {
    await request(app).post("/users").send(userWithoutCreditCard);
    await request(app).post("/users").send(userWithoutCreditCard);

    const withoutCard  = await request(app).get("/users?CreditCard=No");
    expect(withoutCard.body).toHaveLength(1);
    });

    // Test case for returning all users
    it("Return all users with no filter", async () => {
    await request(app).post("/users").send(userWithCreditCard);
    await request(app).post("/users").send(userWithoutCreditCard);

    const res = await request(app).get("/users");
    expect(res.body.length).toBe(2);
    });

    //Users with credit card can be registered
    it("Register users with credit card", async () => {
    const response = await request(app).post("/users").send(userWithCreditCard);
    expect(response.statusCode).toBe(201);
    });

    //Users without credit card can be registered
    it("Register users without credit card", async () => {
    const response = await request(app).post("/users").send(userWithoutCreditCard);
    expect(response.statusCode).toBe(201);
    });

    //Duplicate usernames are rejected from registration
    it("Reject duplicate usernames", async () => {
    await request(app).post("/users").send(userWithCreditCard);
    const duplicate = await request(app).post("/users").send(userWithCreditCard);
    expect(duplicate.statusCode).toBe(409);
    });

    // Test case for rejecting invalid password format
    it("Reject invalid password", async () => {
    const invalidPassword = { ...userWithCreditCard, username: "test123", password: "pass" };
    const res = await request(app).post("/users").send(invalidPassword);
    expect(res.status).toBe(400);
    });

    // Test case for rejecting invalid email format
    it("Reject invalid email", async () => {
    const invalidEmail = { ...userWithCreditCard, username: "test098", email: "invalidemail" };
    const res = await request(app).post("/users").send(invalidEmail);
    expect(res.status).toBe(400);
    });

    // Test case for rejecting underage users
    it("Reject underage user", async () => {
    const underage = { ...userWithCreditCard, username: "young123", dob: "2012-02-02" };
    const res = await request(app).post("/users").send(underage);
    expect(res.status).toBe(403);
    });
});


