const path = require('path');
const fs = require('fs');
const Sequelize = require('sequelize');
const ENV = process.env.NODE_ENV || 'development';
let sequelize = {};
const db = {};

if (ENV === 'production') {
    sequelize = new Sequelize('mysql://USERNAME:PASSWORD@HOST:PORT/DB_NAME', { operatorsAliases: Sequelize.Op });
} else {
    sequelize = new Sequelize('mysql://root:root@localhost:3306/qaengine', { operatorsAliases: Sequelize.Op });
}

// Rotina para carregar automaticamente os models, exceto o arquivo "index.js"
fs
    .readdirSync(__dirname)
    .filter(file => (file.indexOf('.') !== 0 && (file !== 'index.js')))
    .forEach(file => {
        const model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

// Rotina que verifica e monta as associações entre os models
Object
    .values(db)
    .filter(model => typeof model.associate === "function")
    .forEach(model => model.associate(db));

// Função que cria as tabelas no banco de dados automaticamente, de acordo com as configurações em cada model
sequelize.sync({logging: console.log});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;