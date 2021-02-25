import { Sequelize, DataTypes } from 'sequelize';

const initConnection = (dbConfig) => {

    let sequelize;

    try {
        sequelize = new Sequelize(dbConfig.database, dbConfig.login, dbConfig.pass, dbConfig.options);

        sequelize.sync().then()
            .catch(err => console.log(err));
        console.log(`Established DB connection`);
    } catch (connectionError) {
        console.error(`Error during establishing DB connection: ${connectionError}`);
    }
    
    return sequelize;
}

export const initializeDB = (dbConfig) => {

    const dbInstance = initConnection(dbConfig);

    const Student = dbInstance.define(dbConfig.database, {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlpha: true
            }
        },
        surname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlpha: true
            }
        },
        date_of_birth: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                isDate: true
            }
        },
        average: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isFloat: true
            }
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isNumeric: true
            }
        },
        university: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlpha: true
            }
        }
    });

    return Student;
}