// Verificar se email possui caracteres "@" e "."
function validateEmail() {
  let email = in_email.value;
  let inputEmail = document.getElementById('in_email');

  for (let i = 0; i < 2; i++) {
    let validEmail = email.indexOf('@') < 0 || email.indexOf('.') < 0 || email.length < 10;

    if (validEmail) {
      inputEmail.style = 'outline: 1px solid #df2222';
    }

    if (email.length == 0 || !validEmail) {
      inputEmail.style = 'outline: 1px solid #a0a0a07a';
    }
  }
}

// Validação de senha
function validatePass() {
  // Ignorando teclas de controle
  const ignoreKeys = ['CapsLock', 'Tab'];

  if (ignoreKeys.includes(event.key)) {
    return;
  }

  const pass = in_password.value;
  const inputPass = document.getElementById('in_password');
  const divSenha = document.querySelector('.pass-parameter');

  // Regex (Expressão regular) - identifica padrões dentro da string
  const hasLower = /[a-z]/.test(pass);
  const hasUpper = /[A-Z]/.test(pass);
  const hasNumber = /[0-9]/.test(pass);
  const hasSpecialChar = /[^a-zA-Z0-9]/g.test(pass);
  const noSpace = pass.replace(/\s/g, '');

  updateBarProgress(hasUpper, 0);
  updateBarProgress(hasLower, 1);
  updateBarProgress(hasNumber, 2);
  updateBarProgress(hasSpecialChar, 3);

  const validPass = hasLower && hasUpper && hasNumber && hasSpecialChar && pass.length >= 8;

  if (!validPass) {
    inputPass.style = 'outline: 1px solid #df2222';
    divSenha.style = 'opacity: 1; width: 335px; z-index: 1';
  }

  if (pass.length == 0 || validPass) {
    inputPass.style = 'outline: 1px solid #a0a0a07a';
    divSenha.style = 'opacity: 0; width: 0; background-color: #5bf575; z-index: -1';
  }
}

// Função para confirmar caracteres exigidos na senha
function updateBarProgress(isValid, index) {
  const barProgress = document.querySelectorAll('.bar-progress');
  const validStyle = 'width: 30px; background-color: #5bf575';
  const invalidStyle = 'width: 5px; background-color: #df2222';

  const bar = barProgress[index];
  const style = isValid ? validStyle : invalidStyle;
  bar.style = style;
}

// Função de cadastro
function signUp() {
  const codigoPatrimonio = document.getElementById('in_codigo_patrimonio');
  const fkEmpresa = document.getElementById('sl_enterprise');

  //JSON para guardar dados do usuário
  const User = {
    nameServer: in_name.value,
    officeServer: sl_office.value,
    emailServer: in_email.value,
    passServer: in_password.value,
    codigoPatrimonioServer: codigoPatrimonio ? codigoPatrimonio.value : null,
    fkEmpresaServer: fkEmpresa.value != '' ? fkEmpresa.value : null,
  };

  console.log(User);

  // Ao negar o atributo do JSON, conferimos se ele está vazio ou não
  let isInvalid =
    !User.nameServer |
    !User.officeServer |
    !User.emailServer |
    !User.passServer |
    !User.fkEmpresaServer;

  if (isInvalid) {
    alert('⚠ Campos não preenchidos corretamente!');
  } else {
    fetch('/usuarios/cadastrar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      // Aqui passamos somente o JSON criado lá em cima
      body: JSON.stringify(User),
    })
      .then(function (resposta) {
        console.log('resposta: ', resposta);

        if (resposta.ok) {
          alert('Cadastro realizado com sucesso!');

          if (User.officeServer !== 'Suporte') {
            sessionStorage.setItem('EMAIL', User.emailServer);
            sessionStorage.setItem('FK_EMPRESA', User.fkEmpresaServer);

            setTimeout(() => {
              window.location = 'sign-page.html';
            }, '2000');
          } else {
            setTimeout(() => {
              window.location = 'download.html';
            }, '2000');
          }
        } else {
          throw 'Houve um erro ao tentar realizar o cadastro!';
        }
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
      });

    return false;
  }
}

// Função para alternar visibilidade entre formulários de login e cadastro
let formState = false;
function toggleFormVisibility() {
  const formLogin = document.querySelector('.login');
  const formCadastro = document.querySelector('.cadastro');

  // Setando estilizações de visibilidade
  const styleVisibleForm = 'z-index: 1; opacity: 1; animation: fadeIn 1s ease';
  const styleInvisibleForm = 'z-index: -1; opacity: 0; animation: none';

  if (!formState) {
    formLogin.style = styleInvisibleForm;
    formCadastro.style = styleVisibleForm;

    formState = true;
  } else {
    formCadastro.style = styleInvisibleForm;
    formLogin.style = styleVisibleForm;

    formState = false;
  }
}

// Função para alternar visisbilidade da senha
let passState = false;
function togglePassVisibility() {
  const passSignUp = document.getElementById('in_password');
  const passSignIn = document.getElementById('in_password_login');

  // Aqui capturamos os ícones de olhinho
  const eyeIcon = document.querySelectorAll('.ph-eye');
  // Trocando a classe de ambos
  for (let i = 0; i < eyeIcon.length; i++) {
    eyeIcon[i].classList.toggle('ph-eye-slash');
  }

  // Quando o estado for verdadeiro, a senha continua oculta
  // Logo o estado se torna falso.
  if (passState) {
    passSignUp.setAttribute('type', 'password');
    passSignIn.setAttribute('type', 'password');
    passState = false;

    // Quando o estado for falso, a senha se torna visível
    // Logo o estado se torna verdadeiro.
  } else {
    passSignUp.setAttribute('type', 'text');
    passSignIn.setAttribute('type', 'text');
    passState = true;
  }
}

function showCodeInput(select) {
  const grid = document.querySelector('.grid-office');
  const codeInput = document.querySelector('.code');
  const office = select.value;
  const supportStyle = 'grid-template-columns: 57% 40%';
  const defaultStyle = 'grid-template-columns: 1fr';

  grid.style = office == 'Suporte' ? supportStyle : defaultStyle;

  if (office === 'Suporte') {
    codeInput.innerHTML += `
      <div class="input-field">
        <input required type="text" id="in_codigo_patrimonio" maxlength="6">
        <label for="in_codigo_patrimonio">código</label>
        <div class="icon">
          <i class="ph ph-laptop"></i>
        </div>
      </div>`;
  } else {
    codeInput.innerHTML = '';
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('/empresa/selectEmpresas', {
      headers: {
        'Content-type': 'application/json',
      },
    });

    if (!response.ok) {
      console.log('Erro na requisição');
    }

    const empresasResponse = await response.json();
    console.log(empresasResponse);

    localStorage.setItem('optionsEmpresas', JSON.stringify(empresasResponse));
  } catch (error) {
    console.log(error);
  }

  const empresas = JSON.parse(localStorage.getItem('optionsEmpresas'));

  empresas.forEach((empresa) => {
    sl_enterprise.innerHTML += `<option value="${empresa.id_empresa}">${empresa.nome}</option>`;
  });
});
