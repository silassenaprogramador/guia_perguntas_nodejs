const express = require('express');
const app = express();
// este modulo serve para pegar dados em um requisicao 'post'
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta   = require("./database/Pergunta");
const Resposta   = require("./database/Resposta");

connection
    .authenticate()
    .then(()=>{
        console.log("Conectado ao mysql");
    }).catch((err)=>{
        console.log(err);
    });

app.set('view engine','ejs'); // configurando o express para trabalhar com ejs para montar htmls
app.use(express.static('public'));// estamos dizendo que vamos utilizar arquivos estaticos 'css,js,imagens...' e que eles estarão na pasta public
app.use(bodyParser.urlencoded({extended:false}));// estamos dizendo que esse projeto vai receber e decodificar dados via http post
app.use(bodyParser.json());//recebe dados enviado por formulario em formato json 'muito util para apis'

app.get("/",(request, response)=>{

    //raw serve para buscar somente os campos da tabela, se não passar ele
    //a lista de perguntas vem outros dados orm que nao são da tabela
    let options = {
        raw:true, 
        order:[["id","DESC"]]
    }

    Pergunta.findAll(options).then( lista_perguntas =>{
        response.render("index",{perguntas:lista_perguntas})
    });
});

app.get("/perguntas",(request, response)=>{

    response.render('perguntas')
});

app.post("/salvarpergunta",(request, response)=>{   

    Pergunta.create({
        titulo:request.body.titulo,
        descricao:request.body.descricao
    }).then(()=>{
        response.redirect("/");
    });
});

app.get("/pergunta/:id",(request,response)=>{

    let id = request.params.id;

    Pergunta.findOne({
        where:{ id : id }
    }).then(pergunta=>{

        if(pergunta != undefined){

            Resposta.findAll({

                    where:{pergunta_id: pergunta.id},
                    order:[
                        ['id','DESC']
                    ]                
                }).then( respostas =>{

                response.render("pergunta",{
                    pergunta:pergunta,
                    respostas:respostas
                });
            });

            return true; 
        }

        response.redirect("/");                       
    });

});

app.post("/resposta",async(request, response)=>{   

    await Resposta.create({
        corpo:request.body.corpo,
        pergunta_id:request.body.pergunta_id
    }).then(()=>{
        response.redirect("/pergunta/"+request.body.pergunta_id);
    });
});

app.listen(3000,()=>{ console.log('servidor rodando'); });