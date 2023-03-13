var anuncioModel = require("../models/anuncioModel");

var sessoes = [];

function cadastrarAnuncio(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var ano = req.body.anoServer;
    var preco = req.body.precoServer;
    var descricao = req.body.descricaoServer;
    var img = req.body.imgServer;
    var contato = req.body.contatoServer;

    // Faça as validações dos valores
   
        
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        anuncioModel.cadastrarAnuncio(nome, ano, preco, descricao, img, contato)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

    function listarAnuncio(req, res) {
        anuncioModel.listarAnuncio()
            .then(function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!")
                }
            }).catch(
                function (erro) {
                    console.log(erro);
                    console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }


module.exports = {
    cadastrarAnuncio,
    listarAnuncio,
}