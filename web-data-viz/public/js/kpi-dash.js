window.onload = () => {
    buscarInfos()
}; 

function buscarInfos() {

    const nome = sessionStorage.getItem("NOME_USUARIO");
    const email = sessionStorage.getItem("EMAIL_USUARIO");
    const idUsuario = sessionStorage.getItem("ID_USUARIO");
    const idCargo = sessionStorage.getItem("ID_CARGO");
    const idMatriz = sessionStorage.getItem("ID_MATRIZ");
    
    console.log("Usuário logado:", nome);
    console.log("ID da Matriz:", idMatriz);

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
            
        const limiteHoras = 10; 
        let vaosOciosos = []; 
        let sensorAtual = null;
        let horasSeguidas = 0;

        for (let i = 0; i < dados.length; i++) {
            let registro = dados[i];

            if (sensorAtual != registro.id_sensor) {
                sensorAtual = registro.id_sensor;
                horasSeguidas = 0; 
            }
            if (registro.abastecido == 1) {
                horasSeguidas++;    
                if (horasSeguidas == limiteHoras) {
                    if (!vaosOciosos.includes(sensorAtual)) {
                        vaosOciosos.push(sensorAtual);
                    }
                }
            } 
            else {
                horasSeguidas = 0;
            }
        }
        console.log(`Sensores ociosos (parados por ${limiteHoras}h ou mais):`, vaosOciosos);
        console.log(`Quantidade total de vãos ociosos:`, vaosOciosos.length);

        p_qtd_vaos_ociosos.innerHTML = vaosOciosos.length;


            let historicoDeOcupacoes = []; 

            let sensorAtual2 = null;
            let horasSeguidas2 = 0;

            for (let i = 0; i < dados.length; i++) {
                let registro = dados[i];

                if (sensorAtual2 != registro.id_sensor) {
                    if (horasSeguidas2 > 0) {
                        historicoDeOcupacoes.push(horasSeguidas2);
                        horasSeguidas2 = 0; 
                    }
                    sensorAtual2 = registro.id_sensor;
                }
                if (registro.abastecido == 1) {
                    horasSeguidas2++;
                } 
                else if (registro.abastecido == 0 && horasSeguidas2 > 0) {
                    historicoDeOcupacoes.push(horasSeguidas2);
                    horasSeguidas2 = 0;
                }
            }

            if (horasSeguidas2 > 0) {
                historicoDeOcupacoes.push(horasSeguidas2);
            }

            let somaTotalHoras = 0;
            let tempoMedio = 0;

            if (historicoDeOcupacoes.length > 0) {
                for (let i = 0; i < historicoDeOcupacoes.length; i++) {
                    somaTotalHoras += historicoDeOcupacoes[i];
                }
                tempoMedio = somaTotalHoras / historicoDeOcupacoes.length;
            }
            console.log("Duração de todas as ocupações registradas:", historicoDeOcupacoes);
            console.log("Tempo médio de permanência:", tempoMedio.toFixed(1), "horas");

            p_kpi_tempo_medio.innerHTML = tempoMedio.toFixed(1);



        })
        .catch(err => {
            console.error("Erro no fetch:", err);
        });

}






                    
const ctx = document.getElementById('statusSetorChart');
 
let setor1 = ``;
let setor2 = ``;
let setor3 = ``;
let setor4 = ``;
let setor5 = ``;
let setor6 = ``;
 
 new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [`${setor1}`, `${setor2}`, `${setor3}`, `${setor4}`, `${setor5}`, `${setor6}`],
      datasets: [{
        label: 'Estável',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1
      },
            {
        label: 'Alerta',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1
      },
      {
          label: 'Crítico',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1
      },
    ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          stacked: true,
        },
        x: {
            stacked: true,
        }
      }
    }
  });
