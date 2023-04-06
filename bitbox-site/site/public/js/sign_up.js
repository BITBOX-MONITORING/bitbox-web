// Verificar se email possui caracteres "@" e "."
function validateEmail() {
  let email = in_email.value
  let inputEmail = document.getElementById('in_email')

  for (let i = 0; i < 2; i++) {
    let validEmail = email.indexOf("@") < 0 || email.indexOf(".") < 0 || email.length < 10

    if (validEmail) {
      inputEmail.style = "outline: 1px solid #df2222"
    }

    if (email.length == 0 || !validEmail) {
      inputEmail.style = "outline: 1px solid #a0a0a07a"
    }

    console.log(email.length);
  }
}

// Validação de senha
function validatePass() {

  // Ignorando teclas de controle
  const ignoreKeys = ["CapsLock", "Tab"]

  if (ignoreKeys.includes(event.key)) {
    return
  }

  const pass = in_password.value
  const inputPass = document.getElementById('in_password')
  const divSenha = document.querySelector('.pass-parameter')

  // Regex (Expressão regular) - identifica padrões dentro da string
  const hasLower = /[a-z]/.test(pass)
  const hasUpper = /[A-Z]/.test(pass)
  const hasNumber = /[0-9]/.test(pass);
  const hasSpecialChar = /[^a-zA-Z0-9]/g.test(pass)
  const noSpace = pass.replace(/\s/g, "")

  updateBarProgress(hasUpper, 0)
  updateBarProgress(hasLower, 1)
  updateBarProgress(hasNumber, 2)
  updateBarProgress(hasSpecialChar, 3)

  const validPass = hasLower && hasUpper && hasNumber && hasSpecialChar && pass.length >= 8;

  if (!validPass) {
    inputPass.style = "outline: 1px solid #df2222"
    divSenha.style = "opacity: 1; width: 335px; z-index: 1"
  }

  if (pass.length == 0 || validPass) {
    inputPass.style = "outline: 1px solid #a0a0a07a"
    divSenha.style = "opacity: 0; width: 0; background-color: #5bf575; z-index: -1"
  }
}

// Função para confirmar caracteres exigidos na senha
function updateBarProgress(isValid, index) {
  const barProgress = document.querySelectorAll(".bar-progress")
  const validStyle = "width: 30px; background-color: #5bf575"
  const invalidStyle = "width: 5px; background-color: #df2222"

  const bar = barProgress[index]
  const style = isValid ? validStyle : invalidStyle
  bar.style = style
}

// Função de cadastro
let loginEmail
let loginPass

function signUp() {

  //JSON para guardar dados do usuário
  const User = {
    nameServer: in_name.value,
    officeServer: in_office.value,
    emailServer: in_email.value,
    passServer: in_password.value
  }

  // Ao negar o atributo do JSON, conferimos se ele está vazio ou não
  let isInvalid = !User.nameServer ||
    !User.officeServer ||
    !User.emailServer ||
    !User.passServer

  if (isInvalid) {
    alert("⚠ Campos não preenchidos corretamente!")

  } else {
    fetch("/usuarios/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },

      // Aqui passamos somente o JSON criado lá em cima
      body: JSON.stringify(User)
    }).then(function (resposta) {

      console.log("resposta: ", resposta);

      if (resposta.ok) {
        alert("Cadastro realizado com sucesso!")

        sessionStorage.setItem('EMAIL', User.emailServer)
        sessionStorage.setItem('SENHA',User.passServer)

        console.log(sessionStorage.getItem("EMAIL"));

        setTimeout(() => {
          window.location = "sign-page.html";
        }, "2000")

      } else {
        throw ("Houve um erro ao tentar realizar o cadastro!");
      }
    }).catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });

    return false;
  }
}

// Função para alternar visibilidade entre formulários de login e cadastro
let formState = false;
function toggleFormVisibility() {
  const formLogin = document.querySelector(".login")
  const formCadastro = document.querySelector(".cadastro")

  // Setando estilizações de visibilidade
  const styleVisibleForm = "z-index: 1; opacity: 1; animation: fadeIn 1s ease"
  const styleInvisibleForm = "z-index: -1; opacity: 0; animation: none"

  if (!formState) {
    formLogin.style = styleInvisibleForm
    formCadastro.style = styleVisibleForm

    formState = true;
  }

  else {
    // Retorna dados do cadastro automaticamente
    // in_email_login.value = localStorage.getItem("email")
    // in_password_login.value = localStorage.getItem("senha")

    formCadastro.style = styleInvisibleForm
    formLogin.style = styleVisibleForm

    formState = false;
  }

}

// Função para alternar visisbilidade da senha
let passState = false
function togglePassVisibility() {

  const passSignUp = document.getElementById("in_password")
  const passSignIn = document.getElementById("in_password_login")

  // Aqui capturamos os ícones de olhinho
  const eyeIcon = document.querySelectorAll(".ph-eye")
  // Trocando a classe de ambos
  for (let i = 0; i < eyeIcon.length; i++) {
    eyeIcon[i].classList.toggle('ph-eye-slash')
  }

  // Quando o estado for verdadeiro, a senha continua oculta
  // Logo o estado se torna falso.
  if (passState) {
    passSignUp.setAttribute('type', 'password')
    passSignIn.setAttribute('type', 'password')
    passState = false

    // Quando o estado for falso, a senha se torna visível
    // Logo o estado se torna verdadeiro.
  } else {
    passSignUp.setAttribute('type', 'text')
    passSignIn.setAttribute('type', 'text')
    passState = true
  }

}





