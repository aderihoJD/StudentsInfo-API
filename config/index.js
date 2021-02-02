const config = {
    database: "students",
    login: "root",
    pass: "root",
    options: {
        dialect: "mysql",
        host: "localhost",
        define: {
            timestamps: false
                }
    },
    applicationPort : 3001
}

module.exports = config;