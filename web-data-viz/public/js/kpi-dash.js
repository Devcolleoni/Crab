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

            // console.log("Nomes capturados:", nomeFilial);
            // console.log("Vãos totais:", qtdVao);
            // console.log("Vãos abastecidos:", qtdVaoAbastecido);

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
            let abastecido = [];

            for (let i = 0; i < dados.length; i++) {
              id_sensor.push(Number(dados[i].id_sensor));
              dia_coleta.push(Number(dados[i].dia_coleta));
              hora.push(Number(dados[i].hora));
              abastecido.push(Number(dados[i].abastecido));
            }
            // const limiteHoras = Number(ipt_meta_ociosidade.value); 
            let limiteHoras = 10; 
            let vaosOciosos = []; 
            let sensorAtual = null;
            let horasSeguidas = 0;

            for (let i = 0; i < dados.length; i++) {
                let registro = dados[i];

                if (sensorAtual !== registro.id_sensor) {
                    sensorAtual = registro.id_sensor;
                    horasSeguidas = 0; 
                }
                if (registro.abastecido == 1) {
                    horasSeguidas++;

                    if (horasSeguidas === limiteHoras) {
                        if (!vaosOciosos.includes(sensorAtual)) {
                            vaosOciosos.push(sensorAtual);
                        }
                    }
                } 
                else {
                    horasSeguidas = 0;
                }

                p_qtd_vaos_ociosos.innerHTML = `${vaosOciosos.length}`
}
                console.log(`Sensores ociosos (parados por ${limiteHoras}h ou mais):`, vaosOciosos);
                console.log(`Quantidade total de vãos ociosos:`, vaosOciosos.length);

        })
        .catch(err => {
            console.error("Erro no fetch:", err);
        });

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
 