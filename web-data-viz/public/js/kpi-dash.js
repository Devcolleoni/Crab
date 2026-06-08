window.onload = () => {
    carregarOpcoesFiliais();
    buscarInfos();
}; 

const nome = sessionStorage.getItem("NOME_USUARIO");
const email = sessionStorage.getItem("EMAIL_USUARIO");
const idUsuario = sessionStorage.getItem("ID_USUARIO");
const idCargo = sessionStorage.getItem("ID_CARGO");
const idMatriz = sessionStorage.getItem("ID_MATRIZ");
const filiaisString = sessionStorage.getItem("ID_FILIAIS"); 
const filiaisArray = filiaisString.split(','); 
let filialAtual = filiaisArray[0]; 
let setorAtual = "Geral";

console.log("O usuário tem acesso às filiais:", filiaisArray);
console.log("Carregando o painel para a filial:", filialAtual);

function carregarOpcoesFiliais() {
    const selectFilial = document.getElementById("select_filial");
    selectFilial.innerHTML = "";

    const filiaisStorage = sessionStorage.getItem("ID_FILIAIS"); 

    if (filiaisStorage != null) {
        const filiaisArray = filiaisStorage.split(',');

        let opcaoPadrao = document.createElement("option");
        opcaoPadrao.value = "";
        opcaoPadrao.disabled = true;
        opcaoPadrao.selected = true;
        opcaoPadrao.innerHTML = "Selecione uma filial...";
        selectFilial.appendChild(opcaoPadrao);

        for (let i = 0; i < filiaisArray.length; i++) {
            let idDaFilial = filiaisArray[i];
            let novaOpcao = document.createElement("option");
            novaOpcao.value = idDaFilial;
            novaOpcao.innerHTML = "Filial " + idDaFilial;
            selectFilial.appendChild(novaOpcao);
        }
    } else {
        console.warn("Nenhuma filial encontrada na sessão.");
    }
}

function buscarInfos(idSetor = 'Geral') {

    fetch("/dashboard/entrada3/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idFilial: filialAtual, idMatriz: idMatriz })
    })
    .then(res => res.json())
    .then(json => {
        if (Array.isArray(json)) json = json[0];

        const container = document.getElementById("container_botoes_setor");
        container.innerHTML = "";
        container.style.display = "none";

        if (!json || !json.setores) {
            console.warn("Nenhum setor encontrado para essa filial.");
            return;
        }

        let setoresArray = json.setores.split(", ");
        console.log("setores array:", setoresArray);

        container.style.display = "flex";

        let btnGeral = document.createElement("button");
        btnGeral.className = "btn-setor" + (idSetor === 'Geral' ? ' ativo' : '');
        btnGeral.innerHTML = "Geral";
        btnGeral.onclick = () => filtrarSetor('Geral', btnGeral);
        container.appendChild(btnGeral);

        for (let i = 0; i < setoresArray.length; i++) {
            let btn = document.createElement("button");
            btn.className = "btn-setor" + (idSetor === setoresArray[i] ? ' ativo' : '');
            btn.innerHTML = setoresArray[i];
            btn.onclick = () => filtrarSetor(setoresArray[i], btn);
            container.appendChild(btn);
        }
    })
    .catch(erro => console.log("Erro ao buscar setores:", erro));

    buscarKPIs(idSetor);
}

function buscarKPIs(idSetor = 'Geral') {

    fetch("/dashboard/entradaporsetor/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idFilial: filialAtual, idMatriz: idMatriz, idSetor: idSetor })
    })
    .then(res => res.json())
    .then(json => {
        let qtdVao = Number(json[0]?.Qtd_vao || 0);
        let qtdVaoAbastecido = Number(json[0]?.Qtd_vao_abastecido || 0);

        p_tx_abastecimento.innerHTML = qtdVao > 0
            ? `${(100 * qtdVaoAbastecido / qtdVao).toFixed(1)}%`
            : "0%";
    })
    .catch(erro => console.log("Erro ao buscar abastecimento:", erro));


    fetch(`/dashboard/entrada2porsetor/?idSetor=${idSetor}&idFilial=${filialAtual}&idMatriz=${idMatriz}`)
    .then(res => res.json())
    .then(dados => {

        const metaOciosidade = Number(document.getElementById("ipt_meta_ociosidade").value) || 10;
        const limiteAlertas = metaOciosidade * 0.7;

        let vaosCriticos = [];
        let vaosAlerta = [];
        let vaosEstaveis = [];
        let sensorAtual = null;
        let horasSeguidas = 0;

        for (let i = 0; i < dados.length; i++) {
            let registro = dados[i];

            if (sensorAtual !== registro.id_sensor) {
                if (sensorAtual !== null) {
                    classificarVao(sensorAtual, horasSeguidas, metaOciosidade, limiteAlertas, vaosCriticos, vaosAlerta, vaosEstaveis);
                }
                sensorAtual = registro.id_sensor;
                horasSeguidas = 0;
            }

            if (registro.abastecido == 1) horasSeguidas++;
            else horasSeguidas = 0;
        }

        if (sensorAtual !== null) {
            classificarVao(sensorAtual, horasSeguidas, metaOciosidade, limiteAlertas, vaosCriticos, vaosAlerta, vaosEstaveis);
        }

        console.log("Críticos:", vaosCriticos);
        console.log("Alerta:", vaosAlerta);
        console.log("Estáveis:", vaosEstaveis);

        p_qtd_vaos_ociosos.innerHTML = vaosCriticos.length;
        let historicoDeOcupacoes = [];
        let sensorAtual2 = null;
        let horasSeguidas2 = 0;

        for (let i = 0; i < dados.length; i++) {
            let registro = dados[i];
            if (sensorAtual2 !== registro.id_sensor) {
                if (horasSeguidas2 > 0) historicoDeOcupacoes.push(horasSeguidas2);
                horasSeguidas2 = 0;
                sensorAtual2 = registro.id_sensor;
            }
            if (registro.abastecido == 1) {
                horasSeguidas2++;
            } else if (registro.abastecido == 0 && horasSeguidas2 > 0) {
                historicoDeOcupacoes.push(horasSeguidas2);
                horasSeguidas2 = 0;
            }
        }
        if (horasSeguidas2 > 0) historicoDeOcupacoes.push(horasSeguidas2);

        let tempoMedio = 0;
        if (historicoDeOcupacoes.length > 0) {
            tempoMedio = historicoDeOcupacoes.reduce((a, b) => a + b, 0) / historicoDeOcupacoes.length;
        }
        p_kpi_tempo_medio.innerHTML = tempoMedio.toFixed(1);
    })
    .catch(err => console.error("Erro no fetch ociosidade:", err));

    buscarGrafico(idSetor);
    buscarRosca(idSetor);
}

function buscarGrafico(idSetor = 'Geral') {
    fetch("/dashboard/ociosidadeporsetor/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idFilial: filialAtual, idMatriz: idMatriz })
    })
    .then(res => res.json())
    .then(dados => {
        const metaOciosidade = Number(document.getElementById("ipt_meta_ociosidade").value) || 10;
        const limiteAlerta = metaOciosidade * 0.7;

        const setoresMap = {};

        for (let i = 0; i < dados.length; i++) {
            let registro = dados[i];
            let nomeSetor = registro.nome_setor;
            let idSensor = registro.id_sensor;

            if (!setoresMap[nomeSetor]) setoresMap[nomeSetor] = {};
            if (!setoresMap[nomeSetor][idSensor]) setoresMap[nomeSetor][idSensor] = 0;

            if (registro.abastecido == 1) {
                setoresMap[nomeSetor][idSensor]++;
            }
        }

        const labels = [];
        const dataEstaveis = [];
        const dataAlerta = [];
        const dataCriticos = [];

        const setoresNomes = Object.keys(setoresMap);
        const setoresFiltrados = idSetor === 'Geral'
            ? setoresNomes
            : setoresNomes.filter(s => s === idSetor);

        for (let i = 0; i < setoresFiltrados.length; i++) {
            let nomeSetor = setoresFiltrados[i];
            let sensores = setoresMap[nomeSetor];

            let estaveis = 0, alerta = 0, criticos = 0;

            let idsSensores = Object.keys(sensores);
            for (let j = 0; j < idsSensores.length; j++) {
                let horas = sensores[idsSensores[j]];
                if (horas >= metaOciosidade) criticos++;
                else if (horas >= limiteAlerta) alerta++;
                else estaveis++;
            }

            labels.push(nomeSetor);
            dataEstaveis.push(estaveis);
            dataAlerta.push(alerta);
            dataCriticos.push(criticos);
        }

        atualizarGrafico(labels, dataEstaveis, dataAlerta, dataCriticos);
    })
    .catch(err => console.error("Erro ao buscar gráfico barras:", err));
}

function buscarRosca(idSetor = 'Geral') {
    fetch("/dashboard/abastecimentorosca/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idFilial: filialAtual, idMatriz: idMatriz, idSetor: idSetor })
    })
    .then(res => res.json())
    .then(dados => {
        if (idSetor === 'Geral') {
            const labels = dados.map(d => d.nome_setor);
            const valores = dados.map(d => Number(d.vaos_abastecidos));
            atualizarRosca(labels, valores, null);
        } else {
            const total = Number(dados[0]?.total_vaos || 0);
            const abastecidos = Number(dados[0]?.vaos_abastecidos || 0);
            const naoAbastecidos = total - abastecidos;
            atualizarRosca(
                ['Preenchidos', 'Não Preenchidos'],
                [abastecidos, naoAbastecidos],
                idSetor
            );
        }
    })
    .catch(err => console.error("Erro ao buscar rosca:", err));
}

function classificarVao(idSensor, horas, meta, limiteAlerta, criticos, alerta, estaveis) {
    if (horas >= meta) {
        if (!criticos.includes(idSensor)) criticos.push(idSensor);
    } else if (horas >= limiteAlerta) {
        if (!alerta.includes(idSensor)) alerta.push(idSensor);
    } else {
        if (!estaveis.includes(idSensor)) estaveis.push(idSensor);
    }
}

function filtrarFilial(filialSelecionada) {
    console.log("Filial selecionada:", filialSelecionada);
    filialAtual = filialSelecionada;
    setorAtual = "Geral";
    buscarInfos("Geral");
}

function filtrarSetor(setor, btnClicado) {
    setorAtual = setor;
    console.log("Setor selecionado:", setorAtual);

    document.querySelectorAll(".btn-setor").forEach(btn => btn.classList.remove("ativo"));
    if (btnClicado) btnClicado.classList.add("ativo");

    buscarKPIs(setor);
}

function toggleMetas() {
    const painel = document.getElementById("painel-metas");
    painel.style.display = painel.style.display === "none" ? "flex" : "none";
}

function salvarMetaAbastecimento() {
    const valor = document.getElementById("ipt_meta_abastecimento").value;
    if (!valor) return;
    console.log("Meta de abastecimento salva:", valor + "%");
    buscarKPIs(setorAtual);
}

function salvarMetaOciosidade() {
    const valor = document.getElementById("ipt_meta_ociosidade").value;
    if (!valor) return;
    console.log("Meta de ociosidade salva:", valor + "h");
    buscarKPIs(setorAtual);
}

const ctx = document.getElementById('statusSetorChart');
let graficoSetor = null;

function atualizarGrafico(labels, dataEstaveis, dataAlerta, dataCriticos) {
    if (graficoSetor) graficoSetor.destroy();

    graficoSetor = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Estável',
                    data: dataEstaveis,
                    backgroundColor: '#0a5b0f',
                    borderWidth: 1
                },
                {
                    label: 'Alerta',
                    data: dataAlerta,
                    backgroundColor: '#fbff00',
                    borderWidth: 1
                },
                {
                    label: 'Crítico',
                    data: dataCriticos,
                    backgroundColor: '#ff0015',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true, stacked: true },
                x: { stacked: true }
            }
        }
    });
}

const ctxRosca = document.getElementById('roscaChart');
let graficoRosca = null;

function atualizarRosca(labels, valores, idSetor) {
    if (graficoRosca) graficoRosca.destroy();

    const coresGeral = [
        '#1e3249', '#F17524', '#712222', '#821679',
        '#00fff7', '#0400ff', '#c9acf7', '#FFDAC1',
        '#3c471b', '#4b927e', '#79777b', '#a75858',
    ];

    const cores = idSetor
        ? ['#0a5b0f', '#ff0015']
        : coresGeral;

    graficoRosca = new Chart(ctxRosca, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: valores,
                backgroundColor: cores.slice(0, labels.length),
                borderWidth: 2,
                borderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        font: { size: 13 }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const valor = context.parsed;
                            const pct = total > 0 ? ((valor / total) * 100).toFixed(1) : 0;
                            return ` ${context.label}: ${valor} (${pct}%)`;
                        }
                    }
                }
            }
        }
    });
}