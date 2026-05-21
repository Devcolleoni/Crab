var database = require("../database/config")

function cadastrarFilial(razaoSocialVar, cnpjVar, cepVar) {
     console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", razaoSocialServerVar, cnpjVar, cepVar);

     var instrucaoSql = `
         INSERT INTO cadastro (razao_social, cnpj, cep, id_matriz) VALUES ('${razaoSocialVar}','${cnpjVar}','${cepVar}');
         `;
         console.log("Executando a instrução SQL: \n" + instrucaoSql);
         return database.executar(instrucaoSql);
}