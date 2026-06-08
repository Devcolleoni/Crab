var database = require("../database/config");

function cadastrar(nomeSetor, vaoInicial, vaoFinal, idFilial, idMatriz) {

    let instrucaoSqlSetor = `
            INSERT INTO setor(nome) VALUES ('${nomeSetor}');
        `;

    console.log("Executando inserção do Setor");


    return database.executar(instrucaoSqlSetor).then(function (resultadoSetor) {
        let idSetorGerado = resultadoSetor.insertId;


        let instrucaoSqlVao = `INSERT INTO vao (numero, id_filial, id_matriz, id_setor) VALUES `;

        for (let i = vaoInicial; i <= vaoFinal; i++) {
            instrucaoSqlVao += `(${i}, ${idFilial}, ${idMatriz}, ${idSetorGerado})`;


            if (i == vaoFinal) {
                instrucaoSqlVao += `;`;
            } else {
                instrucaoSqlVao += `, `;
            }
        }

        console.log("Executando inserção dos vãos em lote:\n" + instrucaoSqlVao);


        return database.executar(instrucaoSqlVao).then(function () {
            return resultadoSetor;
        });
    });
}

function listar(idFilial) {
    let instrucaoSql = `
        SELECT 
            s.id_setor, 
            s.nome, 
            MIN(v.numero) AS vao_inicial,
            MAX(v.numero) AS vao_final
        FROM setor s
        LEFT JOIN vao v ON s.id_setor = v.id_setor
        GROUP BY s.id_setor, s.nome
    `
    return database.executar(instrucaoSql)
}

function remover(idSetor) {


    let instrucaoColetas = `
        DELETE FROM coleta WHERE id_sensor IN (
            SELECT id_sensor FROM sensor WHERE id_vao IN (
                SELECT id_vao FROM vao WHERE id_setor = ${idSetor}
            )
        )
    `

    return database.executar(instrucaoColetas).then(function () {

        let instrucaoSensores = `
            DELETE FROM sensor WHERE id_vao IN (
                SELECT id_vao FROM vao WHERE id_setor = ${idSetor}
            )
        `

        return database.executar(instrucaoSensores).then(function () {


            let instrucaoVaos = `
                DELETE FROM vao WHERE id_setor = ${idSetor}
            `

            return database.executar(instrucaoVaos).then(function () {


                let instrucaoSetor = `
                    DELETE FROM setor WHERE id_setor = ${idSetor}
                `

                return database.executar(instrucaoSetor)
            })
        })
    })
}

function editar(idSetor, nome) {
    let instrucaoSql = `
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