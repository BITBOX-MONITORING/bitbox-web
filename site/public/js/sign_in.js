// Preencher automaticamente campo de email do usuário
document.addEventListener('DOMContentLoaded', () => {
  const sessionEmail = sessionStorage.getItem('EMAIL');
  in_email_login.value = sessionEmail ? sessionEmail : '';
});

function signIn() {
  const email = in_email_login.value;
  const senha = in_password_login.value;

  if (!email || !senha) {
    alert('⚠️ Usuário ou senha incorretos!');
  } else {
    fetch('/usuarios/entrar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        emailServer: email,
        senhaServer: senha,
      }),
    })
      .then(function (resposta) {
        console.log('ESTOU NO THEN DO entrar()!');

        if (resposta.ok) {
          console.log(resposta);

          resposta.json().then((json) => {
            console.log(json);
            console.log(JSON.stringify(json));

            sessionStorage.EMAIL_USUARIO = json.email;
            sessionStorage.NOME_USUARIO = json.nome;
            sessionStorage.ID_USUARIO = json.id;

            setTimeout(function () {
              window.location = 'dashboard.html';
            }, 1000); // apenas para exibir o loading
          });
        } else {
          console.log('Houve um erro ao tentar realizar o login!');

          resposta.text().then((texto) => {
            console.error(texto);
          });
        }
      })
      .catch(function (erro) {
        console.log(erro);
      });

    return false;
  }
}
