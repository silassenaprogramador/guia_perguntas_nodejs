const Sequelize = require("sequelize");
const connection = require("./database");

const Pergunta = connection.define("pergunta",{
    titulo:{
        type:Sequelize.STRING,
        allowNull:false
    },
    descricao:{
        type:Sequelize.STRING,
        allowNull:false
    }
});

//este linha vai verificar se ja existe no banco de dados
//uma tabela que se chama 'pergunta' se não existir ele vai criar.
//'false':significa que ele nao vai forçar a criação da tabela caso ela já exista
Pergunta.sync({force:false}).then(()=>{});

module.exports = Pergunta;