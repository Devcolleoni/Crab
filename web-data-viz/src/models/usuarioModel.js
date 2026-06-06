var database = require("../database/config")

function autenticar(email, senha) {
    var instrucaoSql = `
        SELECT
        u.id_usuario,
        u.nome,
        u.email,
        f.id_cargo,
        f.id_filial,
        f.id_matriz
        FROM usuario u
        JOIN funcionario f
        ON f.id_usuario = u.id_usuario
        WHERE u.email = '${email}'
        AND u.senha = '${senha}'
        LIMIT 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nomeVar, cpfVar, emailVar, razaoSocialVar, cnpjVar) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nomeVar, cpfVar, emailVar, cnpjVar, razaoSocialVar);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
    INSERT INTO cadastro (nome, cpf, email, cnpj, razao_social) VALUES ('${nomeVar}', '${cpfVar}', '${emailVar}', '${cnpjVar}', '${razaoSocialVar}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function Atualizar(SenhaVar, idVar, Antigavar, Emailvar) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function Atualizar(): ", idVar, SenhaVar)
    var instrucaoSql = `
           UPDATE usuario SET senha = ('${SenhaVar}') WHERE id_usuario = ('${idVar}') AND senha = ('${Antigavar}') AND email = ('${Emailvar}')
        `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar,
    Atualizar
};