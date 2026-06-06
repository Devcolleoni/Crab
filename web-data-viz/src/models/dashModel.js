var database = require("../database/config")


function entrada(filial, qtdVao, qtdVaoAbastecido) {

    const sql = `
    SELECT * FROM vw_tx_abastecimento;
    `    
    console.log("Executando a instrução SQL: \n" + sql);
    return database.executar(sql);


}
function entrada2(total_sensores, id_sensor, abastecido, hora, dia_coleta, numero_vao, id_setor, nome_setor) {

    const sql = `
    SELECT * FROM vw_ociosidade;
    `    
    console.log("Executando a instrução SQL: \n" + sql);
    return database.executar(sql);


}

module.exports = {
    entrada,
    entrada2

};
