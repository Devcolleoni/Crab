
var database = require("../database/config")

function cadastrarFilial(razaoSocialVar, cnpjVar, cepVar, idMatrizVar) {
    console.log("ACESSEI O FILIAL MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", razaoSocialVar, cnpjVar, cepVar, idMatrizVar);
    
    console.log("razaoSocialVar:", razaoSocialVar)
    console.log("cnpjVar:", cnpjVar)
    console.log("cepVar:", cepVar)
    console.log("idMatrizVar:", idMatrizVar)

    var instrucaoSql = `
         INSERT INTO  filial (razao_social, cnpj, cep, id_matriz) VALUES ('${razaoSocialVar}','${cnpjVar}','${cepVar}', ${idMatrizVar});
         `;
    console.log("SQL:", instrucaoSql)
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    console.log("ID MATRIZ:", idMatrizVar)
    return database.executar(instrucaoSql);
}

function cadastrarResponsavel(nomeVar, cpfVar, emailVar, senhaVar, idMatriz, idFilial) {
    console.log("ACESSEI O FILIAL MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nomeVar, cpfVar, emailVar, senhaVar);

    var instrucaoSql = `
    INSERT INTO usuario (nome, cpf, email, senha) VALUES ('${nomeVar}','${cpfVar}','${emailVar}','${senhaVar}');
    `

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql)
        .then((resultado) => {

            let idUsuario = resultado.insertId

            var instrucaoResponsavel = `
            INSERT INTO funcionario (id_matriz, id_filial, id_usuario, id_cargo) VALUES ('${idMatriz}', '${idFilial}', '${idUsuario}', 3);
            `
                ;

            return database.executar(instrucaoResponsavel);
        })
}

function listarFiliais(idMatriz) {

    var instrucaoSql = `
        SELECT f.id_filial, f.razao_social, f.cnpj, u.email
        FROM filial f
        LEFT JOIN funcionario func ON func.id_filial = f.id_filial
        LEFT JOIN usuario u ON u.id_usuario = func.id_usuario
        WHERE f.id_matriz = ${idMatriz};
        `

    console.log("Executando SQL:\n" + instrucaoSql);

    return database.executar(instrucaoSql);

}

module.exports = {
    cadastrarFilial,
    cadastrarResponsavel,
    listarFiliais
}

