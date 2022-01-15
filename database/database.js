const Sequelize = require('sequelize');

//configurando a conexao
const connection = new Sequelize('guiaperguntas','root','123456',{
    host:'db',
    dialect:'mysql'
});

module.exports = connection;