const nomeUsuarioInput = document.getElementById('nome_usuario');

nomeUsuarioInput.addEventListener('input', () => {
  const nomeUsuario = nomeUsuarioInput.value;
  const regex = /^[a-zA-Z_-]*$/;

  if (!regex.test(nomeUsuario)) {
    nomeUsuarioInput.setCustomValidity('Nome de usuário inválido! Somente letras, hifens e sublinhados são permitidos.');
  } else {
    nomeUsuarioInput.setCustomValidity('');
  }
});
