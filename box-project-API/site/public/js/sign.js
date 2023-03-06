// Enviando dados para o banco
function signUp (){

    //JSON para guardar dados do usuário
    let userBox = {
        nameServer: in_name.value,
        officeServer: in_office.value,
        emailServer: in_email.value,
        passServer: in_password.value
    }

    // Ao negar o atributo do JSON, conferimos se ele está vazio ou não
    let isInvalid = !userBox.nameServer     || 
                    !userBox.officeServer   || 
                    !userBox.emailServer    || 
                    !userBox.passServer

    if (isInvalid){
        alert("⚠ Campos não preenchidos corretamente!")
    }
    
    fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },

        // Aqui passamos somente o JSON criado lá em cima
        body: JSON.stringify(userBox)
      }).then(function (resposta) {
    
        console.log("resposta: ", resposta);
    
        if (resposta.ok) {
    
          setTimeout(() => {
            window.location = "login.html";
          }, "2000")
    
        } else {
          throw ("Houve um erro ao tentar realizar o cadastro!");
        }
      }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
      });
    
      return false;    
}

// Função para alternar visisbilidade da senha
let state = false
function togglePassVisibility() {

  const pass = document.getElementById("in_password")
  
  // Aqui capturamos o ícone do olhinho  -----------  Aqui trocamos sua classe para o olhinho fechado
  const eyeIcon = document.getElementById("ph-eye").classList.toggle('ph-eye-slash')

  // Quando o estado for verdadeiro, a senha continua oculta
  // Logo o estado se torna falso.
  if (state) {
    pass.setAttribute('type', 'password')
    state = false

  // Quando o estado for falso, a senha se torna visível
  // Logo o estado se torna verdadeiro.
  } else {
    pass.setAttribute('type', 'text')
    state = true
  }

}

// 🏗 Implementação fututra
function emManutençãokkkk(){
    const ball = document.querySelectorAll(".ball")
    console.log(ball);

    var i = 0
    function toggleBall(){

        for (j = 0; j < ball.length; j++){
            ball[j].style = ""
        }
        
        if(i > 2){
            i = 0;
        }

        ball[i].style = "width: 30px; background: var(--smooth-gradient)"
        i++

        console.log(i);
    }
}




