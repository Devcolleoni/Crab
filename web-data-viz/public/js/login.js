function entrar() {

        let user = usuario.value;
        let senhaDigitada = senha.value;

        if (user == "" || senhaDigitada == "") {
            mensagem.innerHTML = "Preencha todos os campos!";
            mensagem.style.color = "red";
            return;
        } if (!user.includes("@") || !user.includes(".com")) {
            mensagem.innerHTML = "Digite um e-mail válido!";
            mensagem.style.color = "red";
            return;
        }

        if (user == "Crab@institucional.com.br" && senhaDigitada == "Crab777") {

            if (lembrar.checked) {
                localStorage.setItem("email", user);
                localStorage.setItem("senha", senhaDigitada);
            } else {
                localStorage.removeItem("email");
                localStorage.removeItem("senha");
            }

            mensagem.innerHTML = "Login realizado com sucesso!";
            mensagem.style.color = "green";
            alert("Bem vindo " + user);

            window.location.href = `../public/Dashboard - HTML/dashboard.html`;

        } else if (user == 'Admin@gmail.com' && senhaDigitada == 'admin777') {

            mensagem.innerHTML = "Login realizado com sucesso!";
            mensagem.style.color = "green";
            alert("Bem vindo Administrador ");

            window.location.href = `/dashboard/admin.html`;



        } else {
            mensagem.innerHTML = "Usuário ou senha inválidos!";
            mensagem.style.color = "red";
        }

    }

    /*Executa qnd a pagina termina de carregar */

    window.onload = function () {
        if (localStorage.getItem("email")) {
            usuario.value = localStorage.getItem("email");
            senha.value = localStorage.getItem("senha");
            lembrar.checked = true;
        }

    
        
    }