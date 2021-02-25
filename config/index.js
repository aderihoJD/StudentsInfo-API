const nconf = require('nconf');
const path = require('path');

export default function() {
    nconf.argv()
        .env()
        .file({ file: path.join(__dirname, 'config.json') });

    return nconf;
}