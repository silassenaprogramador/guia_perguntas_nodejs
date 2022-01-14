const Sequelize = require("sequelize");
const connection = require("./database");

const Resposta = connection.define("resposta",{
    corpo:{
        type:Sequelize.TEXT,
        allowNull:false
    },
    pergunta_id:{
        type:Sequelize.INTEGER,
        allowNull:false
    }
});

//este linha vai verificar se ja existe no banco de dados
//uma tabela que se chama 'pergunta' se não existir ele vai criar.
//'false':significa que ele nao vai forçar a criação da tabela caso ela já exista
Resposta.sync({force:false});

module.exports = Resposta;