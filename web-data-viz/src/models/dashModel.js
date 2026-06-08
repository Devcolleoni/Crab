var database = require("../database/config")


function entrada(idFilial, idMatriz) {

    const sql = `
    SELECT * FROM vw_tx_abastecimento where id_filial = ${idFilial} AND id_matriz = ${idMatriz};
    `    
    console.log("Executando a instrução SQL: \n" + sql);
    return database.executar(sql);


}
function entrada2() {

    const sql = `
    SELECT * FROM vw_ociosidade;
    `    
    console.log("Executando a instrução SQL: \n" + sql);
    return database.executar(sql);


}
function entrada3(idFilial, idMatriz) {
    const sql = `
        SELECT 
            m.id_matriz,
            f.id_filial,
            GROUP_CONCAT(DISTINCT s.nome ORDER BY s.nome SEPARATOR ', ') AS setores
        FROM matriz m
        JOIN filial f 
            ON f.id_matriz = m.id_matriz
        JOIN vao v 
            ON v.id_filial = f.id_filial 
            AND v.id_matriz = f.id_matriz
        JOIN setor s 
            ON s.id_setor = v.id_setor
        WHERE 
            m.id_matriz = ${idMatriz}      
            AND f.id_filial = ${idFilial}  
        GROUP BY 
            m.id_matriz, f.id_filial;
    `    
    console.log("Executando a instrução SQL: \n" + sql);
    return database.executar(sql);
}

function entrada2PorSetor(idFilial, idMatriz, idSetor) {
    let sql;
    
    if (idSetor === 'Geral') {
        sql = `
            SELECT vo.* FROM vw_ociosidade vo
            JOIN sensor s ON vo.id_sensor = s.id_sensor
            JOIN vao v ON s.id_vao = v.id_vao
            WHERE v.id_filial = ${idFilial} AND v.id_matriz = ${idMatriz}
            ORDER BY vo.id_sensor ASC;
        `;
    } else {
        sql = `
            SELECT vo.* FROM vw_ociosidade vo
            JOIN sensor s ON vo.id_sensor = s.id_sensor
            JOIN vao v ON s.id_vao = v.id_vao
            WHERE v.id_filial = ${idFilial} AND v.id_matriz = ${idMatriz}
            AND vo.nome_setor = '${idSetor}'
            ORDER BY vo.id_sensor ASC;
        `;
    }

    console.log("Executando a instrução SQL: \n" + sql);
    return database.executar(sql);
}

function entradaPorSetor(idFilial, idMatriz, idSetor) {
    const filtroSetor = idSetor === 'Geral'
        ? ''
        : `AND v.id_setor = (SELECT id_setor FROM setor WHERE nome = '${idSetor}' LIMIT 1)`;

    const sql = `
        SELECT 
            f.id_matriz,
            f.id_filial,
            f.razao_social AS Filial,
            COUNT(v.id_vao) AS Qtd_vao,
            IFNULL(SUM(c.abastecido), 0) AS Qtd_vao_abastecido
        FROM filial f
        LEFT JOIN vao v ON f.id_filial = v.id_filial AND f.id_matriz = v.id_matriz ${filtroSetor}
        LEFT JOIN sensor s ON v.id_vao = s.id_vao
        LEFT JOIN coleta c ON s.id_sensor = c.id_sensor
        WHERE f.id_filial = ${idFilial} AND f.id_matriz = ${idMatriz}
        GROUP BY f.id_matriz, f.id_filial, f.razao_social;
    `;

    console.log("Executando a instrução SQL: \n" + sql);
    return database.executar(sql);
}

function ociosidadePorSetor(idFilial, idMatriz) {
    const sql = `
        SELECT 
            st.id_setor,
            st.nome AS nome_setor,
            s.id_sensor,
            c.abastecido,
            c.dt_coleta
        FROM filial f
        JOIN vao v ON f.id_filial = v.id_filial AND f.id_matriz = v.id_matriz
        JOIN setor st ON v.id_setor = st.id_setor
        JOIN sensor s ON v.id_vao = s.id_vao
        JOIN coleta c ON s.id_sensor = c.id_sensor
        WHERE f.id_filial = ${idFilial} AND f.id_matriz = ${idMatriz}
        ORDER BY st.id_setor ASC, s.id_sensor ASC, c.dt_coleta DESC;
    `;
    console.log("Executando a instrução SQL: \n" + sql);
    return database.executar(sql);
}
function abastecimentoRosca(idFilial, idMatriz, idSetor) {
    let sql;

    if (idSetor === 'Geral') {
        // Rosca geral: quanto cada setor ocupa (qtd de vãos abastecidos por setor)
        sql = `
            SELECT 
                st.nome AS nome_setor,
                COUNT(v.id_vao) AS total_vaos,
                IFNULL(SUM(c.abastecido), 0) AS vaos_abastecidos
            FROM filial f
            JOIN vao v ON f.id_filial = v.id_filial AND f.id_matriz = v.id_matriz
            JOIN setor st ON v.id_setor = st.id_setor
            LEFT JOIN sensor s ON v.id_vao = s.id_vao
            LEFT JOIN coleta c ON s.id_sensor = c.id_sensor
            WHERE f.id_filial = ${idFilial} AND f.id_matriz = ${idMatriz}
            GROUP BY st.id_setor, st.nome;
        `;
    } else {

        sql = `
            SELECT 
                st.nome AS nome_setor,
                COUNT(v.id_vao) AS total_vaos,
                IFNULL(SUM(c.abastecido), 0) AS vaos_abastecidos
            FROM filial f
            JOIN vao v ON f.id_filial = v.id_filial AND f.id_matriz = v.id_matriz
            JOIN setor st ON v.id_setor = st.id_setor
            LEFT JOIN sensor s ON v.id_vao = s.id_vao
            LEFT JOIN coleta c ON s.id_sensor = c.id_sensor
            WHERE f.id_filial = ${idFilial} AND f.id_matriz = ${idMatriz}
            AND st.nome = '${idSetor}'
            GROUP BY st.id_setor, st.nome;
        `;
    }

    console.log("Executando a instrução SQL: \n" + sql);
    return database.executar(sql);
}

function abastecimentoRosca(idFilial, idMatriz, idSetor) {
    let sql;

    if (idSetor === 'Geral') {
        // Rosca geral: quanto cada setor ocupa (qtd de vãos abastecidos por setor)
        sql = `
            SELECT 
                st.nome AS nome_setor,
                COUNT(v.id_vao) AS total_vaos,
                IFNULL(SUM(c.abastecido), 0) AS vaos_abastecidos
            FROM filial f
            JOIN vao v ON f.id_filial = v.id_filial AND f.id_matriz = v.id_matriz
            JOIN setor st ON v.id_setor = st.id_setor
            LEFT JOIN sensor s ON v.id_vao = s.id_vao
            LEFT JOIN coleta c ON s.id_sensor = c.id_sensor
            WHERE f.id_filial = ${idFilial} AND f.id_matriz = ${idMatriz}
            GROUP BY st.id_setor, st.nome;
        `;
    } else {
        // Rosca por setor: vãos preenchidos vs não preenchidos
        sql = `
            SELECT 
                st.nome AS nome_setor,
                COUNT(v.id_vao) AS total_vaos,
                IFNULL(SUM(c.abastecido), 0) AS vaos_abastecidos
            FROM filial f
            JOIN vao v ON f.id_filial = v.id_filial AND f.id_matriz = v.id_matriz
            JOIN setor st ON v.id_setor = st.id_setor
            LEFT JOIN sensor s ON v.id_vao = s.id_vao
            LEFT JOIN coleta c ON s.id_sensor = c.id_sensor
            WHERE f.id_filial = ${idFilial} AND f.id_matriz = ${idMatriz}
            AND st.nome = '${idSetor}'
            GROUP BY st.id_setor, st.nome;
        `;
    }

    console.log("Executando a instrução SQL: \n" + sql);
    return database.executar(sql);
}

module.exports = {
    entrada,
    entrada2,
    entrada3,
    entrada2PorSetor,
    entradaPorSetor,
    ociosidadePorSetor,
    abastecimentoRosca,
};
