/* eslint-disable no-unused-vars */
// const { hashSync, compareSync } = require("bcrypt");
const { createConnection } = require("mysql");
const express = require("express");

const app = express();

export const connection = createConnection({
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

const loginTokens = {};

const getToken = (id) => {
    const token = Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2);
    loginTokens[token] = id;

    return token;
};
