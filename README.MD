# Reply Technical Assignment - Video Streaming Service API

This project is a backend API built with Node.js and Express.js for a video streaming service. It handles user registration with validation, and payment validation. The application is thoroughly tested using Jest and Supertest for automated testing. A Postman collection is included for manual testing. 

## App Overview  
### User Endpoints
- POST /users               – Register a new user 
- GET /users                – Get all users 
- GET /users?CreditCard=Yes – Get users with a credit card 
- GET /users?CreditCard=No  – Get users without a credit card

### Payment Endpoints
- POST /payments - Submit a new payment

## Validation Rules
### User Registration
- "username"   - Alphanumeric only, with no spaces.
- "password"   – Minimum 8 characters, at least one upper case letter & number.
- "email"      – Must be in valid email format.
- "dob"        - ISO 8601 format (YYYY-MM-DD) and over 18 years old.
- "cardNumber" – Optional field. If given must have 16 digits. 

### Payments Registration
- "cardNumber" – Must have 16 digits.
- "amount"     - Must be between 1-3 digits.  


## Running the application 
### 1.Node
Node must be installed in the application prior to running it. 
Running command "node -v" in the terminal allows you to check if node is present. 
Node can be installed from: https://nodejs.org/en/download

### 2.Dependencies
Unzip the file and navigate into the project root folder: cd Raisa_Silea_Technical_Assignment_Reply .

Then install required packages using:
npm install

### 3.Start the server
Launch the server with:
npm start

API will be available at: http://localhost:3000

### 4.Run tests
To execute all tests, use:
npm test

This runs all automated tests using Jest and Supertest, covering both user and payment endpoints.

### 5.Run Postman tests
A Postman collection "Reply_Technical_Assignment.postman_collection.json" is included in the zip file. 
In Postman, click Import, and then select the Reply_Technical_Assignment.postman_collection.json file. 
Requests can be ran individually, or collection runner can be used to execute all requests at once and view results. 

## Author 
Raisa Silea

