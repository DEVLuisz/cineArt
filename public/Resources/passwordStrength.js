var senha = document.querySelector('#senha').value;

function verificarForcaSenha(senha) {
  let forca = 0;
  const regexSenhaFraca = /[a-z]+/;
  const regexSenhaMedia = /\d+/;
  const regexSenhaForte = /[\W_]+/;

  if (regexSenhaFraca.test(senha)) {
    forca++;
  }
  if (regexSenhaMedia.test(senha)) {
    forca++;
  }
  if (regexSenhaForte.test(senha)) {
    forca++;
  }

  return forca;
}

function atualizarIndicadorForcaSenha() {
  const senhaInput = document.getElementById('senha');
  const forcaSenhaElement = document.getElementById('forcaSenha');
  const forcaSenhaProgresso = document.getElementById('passwordStrength');

  const forcaSenha = verificarForcaSenha(senhaInput.value);

  let corForcaSenha;
  let mensagemForcaSenha;
  switch (forcaSenha) {
    case 0:
      corForcaSenha = 'red';
      mensagemForcaSenha = 'Fraca';
      break;
    case 1:
      corForcaSenha = 'orange';
      mensagemForcaSenha = 'Média';
      break;
    case 2:
      corForcaSenha = 'green';
      mensagemForcaSenha = 'Forte';
      break;
    default:
      corForcaSenha = 'black';
      mensagemForcaSenha = '';
  }

  forcaSenhaElement.innerHTML = mensagemForcaSenha;

  // Atualiz a cor e o comprimento do indicador de força de senha
  forcaSenhaProgresso.style.backgroundColor = corForcaSenha;
  forcaSenhaProgresso.style.width = `${(forcaSenha / 3) * 100}%`;
}

const senhaInput = document.getElementById('senha');
senhaInput.addEventListener('input', atualizarIndicadorForcaSenha);
