var database = require("../database/config");

var database = require("../database/config");

function cadastrar(
    nomeSetor,
    vaoInicial,
    vaoFinal,
    idFilial,
    idMatriz
) {
    var sqlFilial = idFilial ? idFilial : 'NULL';
    var sqlMatriz = idMatriz ? idMatriz : 'NULL';

    
    var sqlValidar = `
        SELECT COUNT(*) AS total 
        FROM vao 
        WHERE id_matriz = ${sqlMatriz} 
          AND id_filial = ${sqlFilial} 
          AND numero BETWEEN ${vaoInicial} AND ${vaoFinal};
    `;

    return database.executar(sqlValidar)
        .then(function (resultadoValidacao) {
            var vaosOcupados = resultadoValidacao[0].total;

            
            if (vaosOcupados > 0) {
            
                throw new Error("Conflito: Um ou mais vãos neste intervalo já estão ocupados por outro setor!");
            }

            
            var sqlSetor = `
                INSERT INTO setor (nome, vao_inicial, vao_final)
                VALUES ('${nomeSetor}', ${vaoInicial}, ${vaoFinal});
            `;

            return database.executar(sqlSetor);
        })
        .then(function (resultadoSetor) {
            var idSetor = resultadoSetor.insertId || (resultadoSetor && resultadoSetor.insertId);

            if (!idSetor) {
                throw new Error("Não foi possível recuperar o ID do setor inserido.");
            }

            
            let valores = [];
            for (let i = vaoInicial; i <= vaoFinal; i++) {
                valores.push(
                    `(${i}, ${sqlFilial}, ${sqlMatriz}, ${idSetor})`
                );
            }

            var sqlVaos = `
                INSERT INTO vao (numero, id_filial, id_matriz, id_setor)
                VALUES ${valores.join(",")};
            `;

            return database.executar(sqlVaos);
        });
}



function listar() {

    var instrucaoSql = `
    SELECT * FROM setor;
    `;

    return database.executar(instrucaoSql);
}

    function remover(idSetor) {
    if (idSetor == undefined || idSetor == null || idSetor == "undefined") {
        return Promise.reject("Erro no Model: O idSetor enviado é inválido ou undefined!");
    }

    var sqlDeletarVaos = `
        DELETE FROM vao
        WHERE id_setor = ${idSetor};
    `;

    return database.executar(sqlDeletarVaos)
        .then(function () {
            var sqlDeletarSetor = `
                DELETE FROM setor
                WHERE id_setor = ${idSetor};
            `;
            return database.executar(sqlDeletarSetor);
        });
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