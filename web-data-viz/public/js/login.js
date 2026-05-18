// function entrar() {

//         if (user == "" || senhaDigitada == "") {
//             mensagem.innerHTML = "Preencha todos os campos!";
//             mensagem.style.color = "red";
//             return;
//         } if (!user.includes("@") || !user.includes(".com")) {
//             mensagem.innerHTML = "Digite um e-mail válido!";
//             mensagem.style.color = "red";
//             return;
//         }

        // if (user == "Crab@institucional.com.br" && senhaDigitada == "Crab777") {

        //     if (lembrar.checked) {
        //         localStorage.setItem("email", user);
        //         localStorage.setItem("senha", senhaDigitada);
        //     } else {
        //         localStorage.removeItem("email");
        //         localStorage.removeItem("senha");
        //     }

        //     mensagem.innerHTML = "Login realizado com sucesso!";
        //     mensagem.style.color = "green";
        //     alert("Bem vindo " + user);

        //     window.location.href = `../public/Dashboard - HTML/dashboard.html`;

        // } else if (user == 'Admin@gmail.com' && senhaDigitada == 'admin777') {

        //     mensagem.innerHTML = "Login realizado com sucesso!";
        //     mensagem.style.color = "green";
        //     alert("Bem vindo Administrador ");

        //     window.location.href = `/dashboard/admin.html`;



        // } else {
        //     mensagem.innerHTML = "Usuário ou senha inválidos!";
        //     mensagem.style.color = "red";
        // }

    // }

    /*Executa qnd a pagina termina de carregar */

    // window.onload = function () {
    //     if (localStorage.getItem("email")) {
    //         usuario.value = localStorage.getItem("email");
    //         senha.value = localStorage.getItem("senha");
    //         lembrar.checked = true;
    //     }

    function entrar() {

        var emailVar = ipt_usuario.value;
        var senhaVar = ipt_senha.value;

        // if (emailVar == "" || senhaVar == "") {
        //     mensagem.innerHTML = "Preencha todos os campos!";
        //     mensagem.style.color = "red";
        //     return;
        // } if (!emailVar.includes("@") || !emailVar.includes(".com")) {
        //     mensagem.innerHTML = "Digite um e-mail válido!";
        //     mensagem.style.color = "red";
        //     return;
        // }

        // if (emailVar == "" || senhaVar == "") {
        //     cardErro.style.display = "block"
        //     mensagem_erro.innerHTML = "(Mensagem de erro para todos os campos em branco)";
        //     finalizarAguardar();
        //     return false;
        // }
        // else {
        //     setInterval(sumirMensagem, 5000)
        // }

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
                    sessionStorage.EMAIL_USUARIO = json.email;
                    sessionStorage.NOME_USUARIO = json.nome;
                    sessionStorage.ID_USUARIO = json.id;

                    setTimeout(function () {
                        window.location = "./dashboard/dashboard.html";
                    }, 1000); // apenas para exibir o loading

                });

            } else {

                console.log("Houve um erro ao tentar realizar o login!");

                // resposta.text().then(texto => {
                //     console.error(texto);
                //     finalizarAguardar(texto);
                // });
            }

        }).catch(function (erro) {
            console.log(erro);
        })

        return false;
    }
 