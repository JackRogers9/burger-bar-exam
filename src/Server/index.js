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
            userID INT,
            email VARCHAR(255),
            firstName VARCHAR(255),
            lastName VARCHAR(255),
            password VARCHAR(255),
            postcode VARCHAR(255),
            houseNumber INT,
            roadName VARCHAR(255),
            primary key (id)
        );`
    );

    connection.query(
        `CREATE TABLE if not exists card_details (
            id INT auto_increment,
            userID INT,
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
            userID INT,
            items JSON,
            totalPrice INT,
            orderDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
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
    const { userID, email, firstName, lastName, password, postcode, houseNumber, roadName } =
        request.body;

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
            "INSERT into accounts (userID, email, firstName, lastName, password, postcode, houseNumber, roadName) VALUES(?, ?, ?, ?, ?, ?, ?, ?)",
            [
                userID,
                email,
                firstName,
                lastName,
                hashSync(password, 10),
                postcode,
                houseNumber,
                roadName,
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

app.post("/saveCardDetails", async (request, response) => {
    const { userID, cardNumber, sortCode, cvc } = request.body;

    connection.query(
        "INSERT into card_details (userID, cardNumber, sortCode, cvc) VALUES(?, ?, ?, ?)",
        [userID, cardNumber, sortCode, cvc],
        (error, results) => {
            if (error) console.log(error);

            response.status(200).json({
                success: true,
            });
        }
    );
});

const loginTokens = {};

const getToken = (id) => {
    const token = Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2);
    loginTokens[token] = id;

    return token;
};

app.post("/login", async (request, response) => {
    const { email, password } = request.body;

    connection.query("SELECT * FROM accounts where email = ?", [email], (error, results) => {
        if (error) console.log(error);
        const auth = compareSync(password, results[0].password);

        response.status(200).json({
            token: auth ? getToken(results[0].id) : "",
            message: auth ? "" : "Incorrect Password",
        });
    });
});

app.post("/getUserDetails", async (request, response) => {
    const { token } = request.body;
    let id;

    if (token) {
        id = loginTokens[token];
    }

    if (id) {
        connection.query("SELECT * FROM accounts where id = ?", [id], (error, results) => {
            if (error) console.log(error);
            response.status(200).json(results);
        });
    }
});

app.post("/addToBasket", async (request, response) => {
    const { name, displayPrice, price, category } = request.body;

    connection.query(
        "INSERT into basket (name, displayPrice, price, category) VALUES(?, ?, ?, ?)",
        [name, displayPrice, price, category],
        (error, results) => {
            if (error) console.log(error);

            response.status(200).json({
                success: true,
            });
        }
    );
});

app.post("/getItemsInBasket", async (request, response) => {
    connection.query("SELECT * FROM basket", (error, results) => {
        if (error) console.log(error);
        response.status(200).json(results);
    });
});

app.post("/removeFromBasket", async (request, response) => {
    const { id } = request.body;

    connection.query("DELETE from basket WHERE id = ?", [id], (error, results) => {
        if (error) console.log(error);

        response.status(200).json({
            success: true,
        });
    });
});

app.post("/removeAllFromBasket", async (request, response) => {
    connection.query("DELETE from basket", (error, results) => {
        if (error) console.log(error);

        response.status(200).json({
            success: true,
        });
    });
});

app.post("/addToPreviousOrders", async (request, response) => {
    const { userID, items, totalCost } = request.body;

    connection.query(
        "INSERT into previous_orders (userID, items, totalPrice) VALUES(?, ?, ?)",
        [userID, JSON.stringify(items), totalCost],
        (error, results) => {
            if (error) console.log(error);

            response.status(200).json({
                success: true,
            });
        }
    );
});

app.post("/getPreviousOrders", async (request, response) => {
    const { userID } = request.body;

    connection.query(
        "SELECT * FROM previous_orders where userID = ?",
        [userID],
        (error, results) => {
            if (error) console.log(error);
            response.status(200).json(results);
        }
    );
});
