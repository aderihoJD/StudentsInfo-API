const http = require('http');
const fs = require('fs');
const path = require('path');
const config = require('./config')
const mysql = require('mysql2/promise');
const Sequelize = require("sequelize");
const url = require ('url');
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const sequelize = new Sequelize("students", "root", "root", {
  dialect: "mysql",
  host: "localhost",
  define: {
    timestamps: false
  }
});

const Student = sequelize.define("students", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    surname: {
        type: Sequelize.STRING,
        allowNull: false
      },
    date_of_birth: {
        type: Sequelize.DATE,
        allowNull: false
      },
    average: {
        type: Sequelize.INTEGER,
        allowNull: false
      },  
    age: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    university: {
        type: Sequelize.STRING,
        allowNull: false
      }
  });
  sequelize.sync().then()
  .catch(err=> console.log(err));

    
    app.get('/getUser', function(req,res){
        let urlRequest = url.parse(req.url, true);
        // console.log(urlRequest.query);
        Student.findAll({where:urlRequest.query, raw: true })
        .then(users=>{
         res.end(JSON.stringify(users))
        }).catch(err=>console.log(err));
     })
     app.get('/getAllUsers', function(req,res){
        Student.findAll({raw:true}).then(users=>{
            res.end(JSON.stringify(users));
          }).catch(err=>console.log(err));
    })
    app.post('/addUser', function(req,res){
        console.log(req.body);
        Student.create(req.body).then(res=>{
            const user = {id: res.id, name: res.name, age: res.age}
            console.log(user);
          }).catch(err=>console.log(err));
    })
    app.put('/updateUser', function(req,res) {
        console.log(req.body);
        Student.update(req.body.data, {
            where: req.body.where
          }).then((res) => {
            console.log(res);
          });
    }) 
    // else if (req.url === '/deleteUser' && req.method === 'DELETE'){
    //     res.end('User was deleted');
    // }
    // else{
    //     res.end('incorrect request');
    // }
    
app.listen(config.applicationPort);