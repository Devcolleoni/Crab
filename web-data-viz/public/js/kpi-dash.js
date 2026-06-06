window.onload = () => {
    buscarInfos()
}; 

function buscarInfos() {

    fetch("/dashboard/entrada")
        .then(res => res.json())
        .then(dados => {
            console.log("Dados puros recebidos da API:", dados);

            let nomeFilial = [];
            let qtdVao = [];
            let qtdVaoAbastecido = [];
            
            for (let i = 0; i < dados.length; i++) {
                nomeFilial.push(dados[i].Filial);
                qtdVao.push(Number(dados[i].Qtd_vao));
                qtdVaoAbastecido.push(Number(dados[i].Qtd_vao_abastecido));
            }

            console.log("Nomes capturados:", nomeFilial);
            console.log("Vãos totais:", qtdVao);
            console.log("Vãos abastecidos:", qtdVaoAbastecido);

            let txAbastecimento = `${(100 * qtdVaoAbastecido[0] / qtdVao[0]).toFixed(1)}%`;
            p_tx_abastecimento.innerHTML = txAbastecimento;

        })
        .catch(err => {
            console.error("Erro no fetch:", err);
        });

         fetch("/dashboard/entrada2")
        .then(res => res.json())
        .then(dados => {
            console.log("Dados puros recebidos da API:", dados);

            let id_sensor = [];
            let dia_coleta = [];
            let hora = [];

            for (let i = 0; i < dados.length; i++) {
              id_sensor.push(Number(dados[i].id_sensor))
              dia_coleta.push(Number(dados[i].dia_coleta));
              hora.push(Number(dados[i].hora));
            }
            console.log("id_sensor:", id_sensor);
            console.log("dia_coleta:", dia_coleta);
            console.log("hora:", hora);

        })
        .catch(err => {
            console.error("Erro no fetch:", err);
        });

        let vaosComOciosidade = 0;
        let tempoArmazenado = 0;

        for(let i = 0; i < dados.length; i++){
          if(dados[i].id_sensor == dados[i+1].id_sensor && dados[i].dia_coleta == dados[i+1].dia_coleta && (dados[i].horas - dados[i+1].horas) == 1 || dados[i].horas - dados[i+1].horas == 23){
            tempoArmazenado ++;
          }
        }

        if (tempoArmazenado > 5){
          vaosComOciosidade 
        }

}






                    
// const ctx = document.getElementById('statusSetorChart');

// let setor1 = ``;
// let setor2 = ``;
// let setor3 = ``;
// let setor4 = ``;
// let setor5 = ``;
// let setor6 = ``;

//  new Chart(ctx, {
//     type: 'bar',
//     data: {
//         labels: [`${setor1}`, `${setor2}`, `${setor3}`, `${setor4}`, `${setor5}`, `${setor6}`],
//       datasets: [{
//         label: 'Crítico',
//         data: [12, 19, 3, 5, 2, 3],
//         borderWidth: 1
//       },
//       {
//           label: 'Alerta',
//         data: [12, 19, 3, 5, 2, 3],
//         borderWidth: 1
//       },
//       {
//         label: 'Estável',
//         data: [12, 19, 3, 5, 2, 3],
//         borderWidth: 1
//       }
//     ]
//     },
//     options: {
//       scales: {
//         y: {
//           beginAtZero: true,
//           stacked: true,
//         },
//         x: {
//             stacked: true,
//         }
//       }
//     }
//   });
 