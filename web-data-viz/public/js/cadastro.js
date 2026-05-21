    function calcular() {

    let pallets = Number(ipt_pallets.value);
    let controle = select_controle.value;

    if (controle == "") {

        alert(`Selecione o controle`)
        exibir.innerHTML = ''
        
    }
        

    if (pallets <= 0) {
        alert("Digite um valor válido");
        div_mensagem.innerHTML = "";
        return;
    }

    let valorMedioPallet = 1000;
    let valorEstoque = pallets * valorMedioPallet;

    let taxaPerda = 0;

    if (controle == 'manual') {
        taxaPerda = 0.4;
    } else if (controle == 'planilha') {
        taxaPerda = 0.3;
    } else {
        taxaPerda = 0.15;
    }

    let perdaMensal = valorEstoque * taxaPerda;

    let taxaReducao = 0.5; // Quanto nosso produto vai diminuir de perda

    let economiaMensal = perdaMensal * taxaReducao;
    let economiaAnual = economiaMensal * 12;

    div_mensagem.innerHTML = `
        <h2 style="color:red;"> 
        Você pode estar perdendo R$ ${perdaMensal.toLocaleString()} todos os meses
        </h2><br>
        
        Com nosso sistema, você pode reduzir suas perdas em ate:
        <b>R$ ${economiaMensal.toLocaleString()} por mês</b><br><br>

        Isso representa uma economia de: <b>R$ ${economiaAnual.toLocaleString()} por ano</b>

        <br> <br>
        <p style="font-size: 12px; color: gray;">
        *Fontes* <br>*ABRASEL - Sobre desperdícios alimentares, aplicados ao contexto logístico.<br>
         * ABRALOG - Relata sobre a perda de cerca de 40% dos produtos em estoques com controle manual, 30% com planilhas e 15% com sistemas simples de gestão. <br>
    </p>
    `;
}

let validacaoNome = false;
let validacaoCPF = false;
let validacaoEmail = false;
let validacaoEmpresa = false;
let validacaoCNPJ = false;
let validacaoCEP = false

function validarNome() {
    let nome = ipt_nome.value;
    
    if (nome.length >= 3) {
        validacaoNome = true;
        div_nome.innerHTML = "";
    } else {
        validacaoNome = false;
        div_nome.innerHTML = 'Digite um nome válido (mínimo 3 caracteres)';
    }
}
function validarCPF() {
    let cpf = ipt_cpf.value;

    if(cpf.length == 14 && cpf.includes(".") && cpf.includes("-")) {
        validacaoCPF = true;
        div_cpf.innerHTML = "";
    } else {
        validacaoCPF = false;
        div_cpf.innerHTML = 'Digite um CPF válido (Ex: 123.456.789-10)';
    }
}
function validarEmail() {
    let email = ipt_email.value;

    if (email.includes("@") && email.includes(".")) {
        validacaoEmail = true;
        div_email.innerHTML = "";
    } else {
        validacaoEmail = false;
        div_email.innerHTML = 'Digite um email válido';
    }
}

function validarRazaoSocial() {
    let empresa = ipt_razaoSocial.value;

    if (empresa.length >= 3) {
        validacaoEmpresa = true;
        div_empresa.innerHTML = "";
    } else {
        validacaoEmpresa = false;
        div_empresa.innerHTML = 'Digite uma razão social válida (mínimo 3 caracteres)';
    }
}

function validarCNPJ() {
    let cnpj = ipt_cnpj.value;

    if(cnpj.length == 18 && cnpj.includes(".") && cnpj.includes("/") && cnpj.includes("-")) {
        validacaoCNPJ = true;
        div_cnpj.innerHTML = "";
    } else {
        validacaoCNPJ = false;
        div_cnpj.innerHTML = 'Digite um CNPJ válido (Ex: 12.345.678/0001-90)';
    }
}

function validarCEP() {
    let cep = ipt_cep.value;
    
    if (cep.length == 9 && cep.includes('-')) {
        validacaoCEP = true;
        div_nome.innerHTML = "";
    } else {
        validacaoCEP = false;
        div_nome.innerHTML = 'O cep deve ter 9 digitos incluindo (-)';
    }
}


// Seleciona todos os links que começam com "#"
document.querySelectorAll('a[href^="#"]').forEach(link => {

  // Adiciona um evento de clique em cada link
  link.addEventListener('click', function(e) {

    // Impede o comportamento padrão do navegador (pular direto)
    e.preventDefault();

    // Pega o valor do href do link (ex: "#contato")
    const id = this.getAttribute('href').trim();

    // Seleciona a seção correspondente no HTML
    const target = document.querySelector(id);

    // Verifica se a seção existe
    if (target) {

      // Define um espaço extra (altura do header fixo)
      const offset = 100;

      // Calcula a posição da seção na página, descontando o header
      const top = target.offsetTop - offset;

      // Faz o scroll suave até a posição calculada
      window.scrollTo({
        top: top,
        behavior: 'smooth'
      });
    }
  });
});


const spawn = require("nodemon/lib/spawn");
const { createElement } = require("react");

  let listaEmpresasCadastradas = [];

  function cadastrar() {

    var nomeVar = ipt_nome.value;
    var cpfVar = ipt_cpf.value;
    var emailVar = ipt_email.value;
    var razaoSocialVar = ipt_razaoSocial.value;
    var cnpjVar = ipt_cnpj.value;

    if (validacaoNome && validacaoCPF && validacaoEmail && validacaoEmpresa && validacaoCNPJ){
 
      fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nomeServer: nomeVar,
          cpfServer: cpfVar,
          emailServer: emailVar,
          razaoSocialServer: razaoSocialVar,
          cnpjServer: cnpjVar,
        }),
      })
        .then(function (resposta) {
          console.log("resposta: ", resposta);

          if (resposta.ok) {

            alert("Sua mensagem foi enviada com sucesso, iremos analisar e entreremos em contato!")
            enviarParaTelaAdm();
            limparFormulario();

          } else {
            throw "Houve um erro ao tentar realizar o cadastro!";
          }
        })
        .catch(function (resposta) {
          console.log(`#ERRO: ${resposta}`);
        });
    } else {
      alert("Erro: dados inválidos!")
    }

    return false;
  }

  function cadastrarFilial() {

    var razaoSocialVar = ipt_razaoSocial.value;
    var cnpjVar = ipt_cnpj.value;
    var cepVar = ipt_cep.value;

    if (validacaoEmpresa && validacaoCNPJ && validacaoCEP){
 
      fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          razaoSocialServer: razaoSocialVar,
          cnpjServer: cnpjVar,
          cepServer: cepVar,
        }),
      })
        .then(function (resposta) {
          console.log("resposta: ", resposta);

          if (resposta.ok) {

            alert("Sua mensagem foi enviada com sucesso, iremos analisar e entreremos em contato!")
            enviarParaTelaAdm();
            limparFormulario();

          } else {
            throw "Houve um erro ao tentar realizar o cadastro!";
          }
        })
        .catch(function (resposta) {
          console.log(`#ERRO: ${resposta}`);
        });
    } else {
      alert("Erro: dados inválidos!")
    }

    return false;
  }