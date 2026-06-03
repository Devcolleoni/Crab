





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
 