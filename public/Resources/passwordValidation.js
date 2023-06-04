const form = document.querySelector('form');
form.addEventListener('submit', validarSenha);

function validarSenha(event) {
  /* event.preventDefault();  */
  const senha = document.querySelector('#senha').value;
  const confirmarSenha = document.querySelector('#confirmarSenha').value;

  if (senha !== confirmarSenha) {
    alert('Senha e confirmação de senha não correspondem!');
    return false; 
  } else {
    console.log('Senha válida');
  }
}
