var database = require("../database/config.js")

function listarVaos(idFilial) {
    var instrucaoSql = `
        SELECT id_vao, numero
        FROM vao
        WHERE id_filial = ${idFilial}
        ORDER BY numero
    `

    return database.executar(instrucaoSql, [idFilial])
}

function cadastrar(idVao, dtInstalacao, status) {
    var instrucaoSql = `
        INSERT INTO sensor (dt_instalacao, statuss, id_vao)
        VALUES ('${dtInstalacao}', '${status}', ${idVao})
    `

    console.log("Executando SQL:\n" + instrucaoSql)

    return database.executar(instrucaoSql)
}

function listarSensores(idFilial) {
    var instrucaoSql = `
        SELECT 
            s.id_sensor,
            s.dt_instalacao,
            s.statuss,
            v.numero AS numero_vao
        FROM sensor s
        JOIN vao v ON s.id_vao = v.id_vao
        WHERE v.id_filial = ${idFilial}
        ORDER BY v.numero
    `

    return database.executar(instrucaoSql, [idFilial])
}

module.exports = {
    listarVaos,
    cadastrar,
    listarSensores
}