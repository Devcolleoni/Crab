  function cadastrar() {

    //Recupere o valor da nova input pelo nome do id
    // Agora vá para o método fetch logo abaixo
    var nomeVar = ipt_nome.value;
    var cpfVar = ipt_cpf.value;
    var emailVar = ipt_email.value;
    var razaoSocialVar = ipt_razaoSocial.value;
    var cnpjVar = ipt_cnpj.value;

    // Enviando o valor da nova input
    fetch("/admin/buscar", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {

          resposta.json().then(function (listaDeCadastrados){

            console.log(listaDeCadastrados);
          })
        } else {
          throw "Houve um erro!";
        }
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
      });

    return false;
  }
  
  function criarElemento(tag, classe){

    const elemento = document.createElement(tag);
    elemento.className = classe;
    return elemento;  
  }

function criarCampoCadastro(){

    var nomeVar = ipt_nome.value;
    var cpfVar = ipt_cpf.value;
    var emailVar = ipt_email.value;
    var razaoSocialVar = ipt_razaoSocial.value;
    var cnpjVar = ipt_cnpj.value;

    const deteils = criarElemento("details");
    const summary = criarElemento("summary");
    const divAvatar = criarElemento("div", "avatar");
    const divInfo = criarElemento("div", "info");
    const strongDivInfo = criarElemento("strong");
    const spanDivInfo = criarElemento("span");
    const spanHorario = criarElemento("span", "horario");
    const spanSeta = criarElemento("span", "seta");
    const divCorpo = criarElemento("div", "corpo");
    const divDados = criarElemento("div", "dados");
    const divCampo1 = criarElemento("div", "campo");
    const label1 = criarElemento("label");
    const spanLabel1 = criarElemento("span");
    const divCampo2 = criarElemento("div", "campo");
    const label2 = criarElemento("label");
    const spanLabel2 = criarElemento("span");
    const divCampo3 = criarElemento("div", "campo");
    const label3 = criarElemento("label");
    const spanLabel3 = criarElemento("span");
    const divCampo4 = criarElemento("div", "campo");
    const label4 = criarElemento("label");
    const spanLabel4 = criarElemento("span");
    const divCampo5 = criarElemento("div", "campo");
    const label5 = criarElemento("label");
    const spanLabel5 = criarElemento("span");
    const divCampo6 = criarElemento("div", "campo");
    const label6 = criarElemento("label");
    const spanLabel6 = criarElemento("span");
    const divButtons = criarElemento("div", "buttons");
    const divButton1 = criarElemento("div", "button");
    const buttonAccept = criarElemento("button", "accept");
    const i1 = criarElemento("i", "bi bi-check-lg");
    const divButton2 = criarElemento("div", "button");
    const buttonReject = criarElemento("button", "reject");
    const i2 = criarElemento("i", "bi bi-ban");
    

    deteils.append(summary, divCorpo);

    summary.append(divAvatar,divInfo,spanHorario,spanSeta);

    divInfo.append(strongDivInfo,spanDivInfo);

    strongDivInfo.append(`${nomeVar} preencheu o formulário de cadastro`);
    spanDivInfo.append(emailVar);

    spanHorario.append(`Há 15 min`);
    spanSeta.append(`▼`);

    divCorpo.append(divDados);

    divDados.append(divCampo1, divCampo2, divCampo3, divCampo4, divCampo5, divCampo6, divButtons);

    divCampo1.append(label1,spanLabel1);
    label1.append(`Nome`);
    spanLabel1.append(`${nomeVar}`)

    divCampo2.append(label2,spanLabel2);
    label2.append(`CPF`);
    spanLabel2.append(`${cpfVar}`)

    divCampo3.append(label3,spanLabel3);
    label3.append(`Email`);
    spanLabel3.append(`${emailVar}`)

    divCampo4.append(label4,spanLabel4);
    label4.append(`Razão Social`);
    spanLabel4.append(`${razaoSocialVar}`)

    divCampo5.append(label5,spanLabel5);
    label5.append(`CNPJ`);
    spanLabel5.append(`${cnpjVar}`)

    divCampo6.append(label6,spanLabel6);
    label6.append(`Data de cadastro`);
    spanLabel6.append(`21/04/2026 — 14h10`)

    divButtons.append(divButton1, divButton2);

    divButton1.append(buttonAccept, i1);
    buttonAccept.append(`Aceitar`)
    buttonAccept.onclick = aceitar;

    divButton2.append(buttonReject, i2);
    buttonReject.append(`Recusar`)
    buttonReject.onclick = recusar;

  }

function aceitar(){

    alert(`Aceitei`)
}

function recusar(){

    alert(`Receusei`)
}
