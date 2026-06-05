var database = require("../database/config");

function cadastrar (
    nomeSetor,
    vaoInicial,
    vaoFinal,
) {

    var instrucaoSql = `
        INSERT INTO setor(nome)
        VALUES ('${nomeSetor}');
    `;

    return database.executar(instrucaoSql);
}

function listar() {

    var instrucaoSql = `
    SELECT * FROM setor;
    `;

    return database.executar(instrucaoSql);
}

function remover(idSetor) {

    var instrucaoSql = `
        DELETE FROM setor
        WHERE id_setor = ${idSetor};
    `;

    return database.executar(instrucaoSql);
}

function editar(idSetor, nome) {

    var instrucaoSql = `
        UPDATE setor
        SET nome = '${nome}'
        WHERE id_setor = ${idSetor};
    `;

    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrar,
    listar,
    remover,
    editar
};