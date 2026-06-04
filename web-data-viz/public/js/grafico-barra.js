window.onload = () => {
    txAbastecimentoKpi()
    vaosOciosidade()
}; 

function txAbastecimentoKpi() {

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

}
function vaosOciosidade() {

    fetch("/dashboard/entrada2")
        .then(res => res.json())
        .then(dados => {
            console.log("Dados puros recebidos da API:", dados);

            let dt_coleta = [];
            let horas = [];
            let minutos = [];
            
            for (let i = 0; i < dados.length; i++) {
                
                dt_coleta.push(dados[i].dt_coleta);
                horas.push(Number(dados[i].horas));
                minutos.push(Number(dados[i].minutos));
            }

            console.log("Data coleta:", dt_coleta);
            console.log("Horas coleta:", horas);
            console.log("Minutos coleta:", minutos);

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
        label: 'Crítico',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1
      },
      {
          label: 'Alerta',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1
      },
      {
        label: 'Estável',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1
      }
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
 