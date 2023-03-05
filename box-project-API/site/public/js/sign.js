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




