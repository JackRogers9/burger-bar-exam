// const { hashSync, compareSync } = require("bcrypt");
// const bodyParser = require("body-parser");
const express = require("express");
const mysql = require("mysql");

const app = express();

const connection = mysql.createConnection({
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
            postcode VARCHAR(255),
            houseNumber INT,
            roadName VARCHAR(255),
            accountNumber INT,
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
