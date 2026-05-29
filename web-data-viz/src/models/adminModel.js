
var database = require("../database/config")

function buscar() {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");

    var instrucaoSql = `SELECT nome, cpf, email, cnpj, razao_social FROM cadastro ;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

async function aceitar(nomeVar, cpfVar, emailVar, razao_socialVar, cnpjVar) {
    console.log("ACESSEI O AVISO MODEL");

    var instrucaoSql = `
        INSERT INTO usuario (nome, cpf, email) 
        VALUES ('${nomeVar}', '${cpfVar}', '${emailVar}');
    `;

    var instrucaoSql2 = `
        INSERT INTO matriz (razao_social, cnpj) 
        VALUES ('${razao_socialVar}', '${cnpjVar}');
    `;

    try {
        console.log("Executando a 1ª instrução SQL (Usuario): \n" + instrucaoSql);
        var resultadoUsuario = await database.executar(instrucaoSql);

        console.log("Executando a 2ª instrução SQL (Matriz): \n" + instrucaoSql2);
        var resultadoMatriz = await database.executar(instrucaoSql2);

        return resultadoMatriz;

    } catch (erro) {
        console.log("\n[ERRO] Houve um problema ao executar as instruções no banco:");
        console.log(erro);
        throw erro; 
    }
}



module.exports = {
    buscar, aceitar
};