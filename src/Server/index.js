/* eslint-disable prefer-template */
/* eslint-disable no-unused-vars */
const { hashSync, compareSync } = require("bcrypt");
const { urlencoded, json } = require("body-parser");
const { createConnection } = require("mysql");
const express = require("express");

const app = express();

const connection = createConnection({
    host: "localhost",
    user: "newuser",
    password: "password",
    database: "burger_bar_exam",
});

const createTables = () => {
    connection.query(
        `CREATE TABLE if not exists accounts (
            id INT auto_increment,
            email VARCHAR(255),
            firstName VARCHAR(255),
            lastName VARCHAR(255),
            password VARCHAR(255),
            postcode VARCHAR(255),
            houseNumber INT,
            roadName VARCHAR(255),
            cardNumber VARCHAR(255),
            sortCode INT,
            cvc INT,
            primary key (id)
        );`
    );

    connection.query(
        `CREATE TABLE if not exists basket (
            id INT auto_increment,
            name VARCHAR(255),
            displayPrice VARCHAR(255),
            price INT,
            category VARCHAR(255),
            primary key (id)
        );`
    );

    connection.query(
        `CREATE TABLE if not exists previous_orders (
            id INT auto_increment,
            email VARCHAR(255),
            accounts_id INT,
            items JSON,
            totalPrice INT,
            primary key (id)
        );`
    );
};

connection.connect((err) => {
    if (err) throw err;
    console.log("Connected to the Database");

    createTables();
});

app.listen(5000, () => {
    console.log("Listening to port 5000.");
});

const namePattern = /^[a-zA-Z]{3,15}$/;
const emailPattern = /[a-z0-9]+@[a-z]+.[a-z]{2,6}/;
const passwordPattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-;:]).{8,}$/;

app.use(urlencoded({ extended: true }));
app.use(json());

app.post("/registerNewUser", async (request, response) => {
    const {
        email,
        firstName,
        lastName,
        password,
        postcode,
        houseNumber,
        roadName,
        cardNumber,
        sortCode,
        cvc,
    } = request.body;

    let errorMessage = "";

    if (!emailPattern.test(email)) {
        errorMessage = "The email has an invalid format";
    }
    if (!namePattern.test(firstName)) {
        errorMessage = "The first name is invalid";
    }
    if (!namePattern.test(lastName)) {
        errorMessage = "The last name is invalid";
    }
    if (!passwordPattern.test(password)) {
        errorMessage =
            "The password is invalid. It needs to be 8+ characters and include at least one upper and lower case character, a number, and a symbol.";
    }

    if (errorMessage === "") {
        connection.query(
            "INSERT into accounts (email, firstName, lastName, password, postcode, houseNumber, roadName, cardNumber, sortCode, cvc) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [
                email,
                firstName,
                lastName,
                hashSync(password, 10),
                postcode,
                houseNumber,
                roadName,
                cardNumber,
                sortCode,
                cvc,
            ],
            (error, results) => {
                if (error) console.log(error);

                response.status(200).json({
                    success: true,
                    message: errorMessage,
                });
            }
        );
    } else {
        response.status(200).json({
            success: false,
            message: errorMessage,
        });
    }
});

const loginTokens = {};

const getToken = (id) => {
    const token = Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2);
    loginTokens[token] = id;

    return token;
};

app.post("/login", async (request, response) => {
    const { email, password } = request.body;

    connection.query(`SELECT * FROM accounts where email = "` + email + `"`, (error, results) => {
        if (error) console.log(error);
        const auth = compareSync(password, results[0].password);

        response.status(200).json({
            token: auth ? getToken(results[0].id) : "",
            message: auth ? "" : "Incorrect Password",
        });
    });
});
