function formatarTelefone(telefone) {
  const telefoneFormatado = telefone.replace(
    /^(\d{2})(\d{5})(\d{4})$/,
    "($1) $2-$3"
  );
  return telefoneFormatado;
}

module.exports = {
  formatarTelefone
};
