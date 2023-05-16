function signEnterprise() {
  const Enterprise = {
    nomeServer: in_name.value,
    cnpjServer: in_cnpj.value.replace(/\D+/g, ''),
  };

  console.log("Nome:", Enterprise.nomeServer);
  console.log("CNPJ:", Enterprise.cnpjServer);

  const validInput = Enterprise.nomeServer && Enterprise.cnpjServer;

  if (validInput) {
      fetch('/empresa/cadastrar', {
          method: 'POST',
          headers: {
              'Content-type': 'application/json'
          },
          body: JSON.stringify(Enterprise)
      }).then((res) => {
          console.log("Resposta:", res);

          if (res.ok) {
              alert('✅ Cadastro realizado com sucesso!')

              setTimeout(() => {
                  window.location = "sign-page.html"
              }, 2000)
          }
      }).catch((error) => {
          console.log("ERRO:", error);
      })
      
      return false

  } else {
    alert('⚠️ Preencha os campos corretamente!s');
  }
}

function maskCNPJ() {
  let cnpj = in_cnpj.value.replace(/\D+/g, '');

  if (cnpj.length > 14) {
    return false;
  }

  if (cnpj.length > 12) {
    cnpj = cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{0,4})/, '$1.$2.$3/$4-');
  } else if (cnpj.length > 8) {
    cnpj = cnpj.replace(/(\d{2})(\d{3})(\d{3})/, '$1.$2.$3/');
  } else if (cnpj.length > 6) {
    cnpj = cnpj.replace(/(\d{2})(\d{3})/, '$1.$2.');
  } else if (cnpj.length > 2) {
    cnpj = cnpj.replace(/(\d{2})/, '$1.');
  }

  in_cnpj.value = cnpj;
}
