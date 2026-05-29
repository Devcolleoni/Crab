<<<<<<< HEAD
var database = require("../database/config")

function cadastrarFilial(razaoSocialserver, cnpjVar, cepVar) {
     console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", razaoSocialserver, cnpjVar, cepVar);

     var instrucaoSql = `
         INSERT INTO  filial (razao_social, cnpj, cep, id_matriz) VALUES ('${razaoSocialserver}','${cnpjVar}','${cepVar}', 1);
         `;
         console.log("Executando a instrução SQL: \n" + instrucaoSql);
         return database.executar(instrucaoSql);
}

module.exports = {
    cadastrarFilial
}
=======
>>>>>>> dc9960a185e71518cc337f06391d3e52ee389c8e
