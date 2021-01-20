const http = require('http');
const fs = require('fs');
const path = require('path');
const config = require('./config')

http.createServer((req, res) => {
    if (req.url === '/getUser' && req.method === 'GET'){
        res.end('One user')
    }
    else if (req.url === '/getAllUsers' && req.method === 'GET'){
        res.end('All users')
    }
    else if (req.url === '/addUser' && req.method === 'POST'){
        res.end('Added new user')
    }
    else if (req.url === '/updateUser' && req.method === 'PUT'){
        res.end('User was updated')
    }
    else if (req.url === '/deleteUser' && req.method === 'DELETE'){
        res.end('User was deleted');
    }
    else{
        res.end('incorrect request');
    }
}).listen(config.applicationPort, () =>{
    console.log('Server')
});