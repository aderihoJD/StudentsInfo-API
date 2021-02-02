const http = require('http');
const fs = require('fs');
const path = require('path');
const config = require('./config')
const mysql = require('mysql2/promise');
const Sequelize = require("sequelize");
const url = require('url');
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const sequelize = new Sequelize(config.database, config.login, config.pass, config.options);

const Student = sequelize.define("students", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isAlpha: true
        }
    },
    surname: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isAlpha: true
        }
    },
    date_of_birth: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            isDate: true
        }
    },
    average: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            isFloat: true
        }
    },
    age: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            isNumeric: true
        }
    },
    university: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isAlpha: true
        }
    }
});
sequelize.sync().then()
    .catch(err => console.log(err));


app.get('/getUser', function (req, res) {
    let urlRequest = url.parse(req.url, true);
    // console.log(urlRequest.query);
    Student.findAll({ where: urlRequest.query, raw: true })
        .then(users => {
            res.end(JSON.stringify(users))
        }).catch(err => console.log(err));
})
app.get('/getAllUsers', function (req, res) {
    Student.findAll({ raw: true }).then(users => {
        res.end(JSON.stringify(users));
    }).catch(err => console.log(err));
})
app.post('/addUser', function (req, res) {
    console.log(req.body);
    Student.create(req.body)
        .then(() => {
            res.status(200).end("OK");
        })
        .catch((insertError) => {
            console.log(insertError);
            res.status(422).end(JSON.stringify(insertError));
        });
});
app.put('/updateUser', function (req, res) {
    console.log(req.body);
    Student.update(req.body.data, {
        where: req.body.where
    }).then((response) => {
        res.status(200).end(`Number of modified rows : ${JSON.stringify(response)[1]}`);
    })
        .catch((insertError) => {
            console.log(insertError);
            res.status(404).end(JSON.stringify(insertError));
        });
})
app.delete('/deleteUser', function (req, res) {
    let urlRequest = url.parse(req.url, true);
    Student.destroy({ where: urlRequest.query })
        .then((response) => {
            res.status(200).end(`Number of deleted rows : ${JSON.stringify(response)}`);
        })
        .catch((insertError) => {
            console.log(insertError);
            res.status(404).end(JSON.stringify(insertError));
        });
})

app.listen(config.applicationPort);