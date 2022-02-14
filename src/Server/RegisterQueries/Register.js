/* eslint-disable no-unused-vars */
const { urlencoded, json } = require("body-parser");
const express = require("express");
const { connection } = require("../index");

const app = express();

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
                password,
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
