function entrar() {
    var emailVar = ipt_usuario.value;
    var senhaVar = ipt_senha.value;

    console.log("FORM LOGIN: ", emailVar);
    console.log("FORM SENHA: ", senhaVar);

    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: emailVar,
            senhaServer: senhaVar
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));
                console.log("JSON COMPLETO:", json)
                sessionStorage.EMAIL_USUARIO = json.email;
                sessionStorage.NOME_USUARIO = json.nome;
                sessionStorage.setItem("ID_USUARIO", json.id_usuario);
                sessionStorage.setItem("ID_CARGO", json.id_cargo);
                sessionStorage.setItem("ID_MATRIZ", json.id_matriz);
                
                var filiais = json.id_filiais ? json.id_filiais.split(','): [];
                sessionStorage.setItem("ID_FILIAL", filiais[0]);
                
                console.log("ID_MATRIZ RECEBIDO:", json.id_matriz)
                console.log("SESSION ID_MATRIZ:", sessionStorage.getItem("ID_MATRIZ"));
                alert("Autenticado!");

                if (json.id_cargo == 1) {window.location = "./dashboard/admin.html";} 
                else if (json.id_cargo == 2) {window.location = "./dashboard2/matriz.html";} 
                else if (json.id_cargo == 3) {window.location = "./dashboard3/dashboard.html";} 
                else if (json.id_cargo == 4) {window.location = "./dashboard4/dashboard.html";} 
                else {
                    console.log("Cargo não reconhecido");
                    alert("Cargo ou Login não reconhecido");
                }
            });

        } else {
            console.log("Houve um erro ao tentar realizar o login!");
        }

    }).catch(function (erro) {
        console.log(erro);
    });

    return false;
}