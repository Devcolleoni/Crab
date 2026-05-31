
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

    var instrucaoSql3 = `
        DELETE FROM cadastro WHERE cpf = ('${cpfVar}');
    `;

    var instrucaoSql4 = `
        UPDATE usuario 
        SET senha = 'EDK00${cpfVar.toString().slice(-1)}' 
        WHERE cpf = ('${cpfVar}') 
        AND id_usuario > 0; 

    `

    try {
        console.log("Executando a 1ª instrução SQL (Usuario): \n" + instrucaoSql);
        var resultadoUsuario = await database.executar(instrucaoSql);

        console.log("Executando a 2ª instrução SQL (Matriz): \n" + instrucaoSql2);
        var resultadoMatriz = await database.executar(instrucaoSql2);

        console.log("Executando a 3ª instrução SQL (Delete): \n" + instrucaoSql3);
        var resultadoDelete = await database.executar(instrucaoSql3);

         console.log("Executando a 4ª instrução SQL (Delete): \n" + instrucaoSql4);
        var resultadoUpdate = await database.executar(instrucaoSql4);

        return resultadoMatriz;

    } catch (erro) {
        console.log("\n[ERRO] Houve um problema ao executar as instruções no banco:");
        console.log(erro);
        throw erro; 
    }
}

function recusar(cpfVar) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");

    var instrucaoSql = `DELETE FROM cadastro where cpf = ('${cpfVar}') AND id_cadastro > 0 ;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    buscar, aceitar, recusar
};