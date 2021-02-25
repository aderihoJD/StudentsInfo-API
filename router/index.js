import { Router } from 'express';
import url from 'url';

import { initializeDB } from '../dbUtils';
import initConfig from '../config';

const config = initConfig();
const dbInstance = initializeDB(config.get('databaseConfig'));

export default () =>
    Router()
        .get('/getUser', (req, res) => {
            let urlRequest = url.parse(req.url, true);
            dbInstance.findAll({ where: urlRequest.query, raw: true })
                .then(users => {
                    res.end(JSON.stringify(users))
                }).catch(err => console.log(err));
        });