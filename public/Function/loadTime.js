function medirTempoCarregamento() {
  var inicioCarregamento = new Date().getTime();

  window.addEventListener('load', function() {
    var tempoCarregamento = new Date().getTime() - inicioCarregamento;
    console.log('A página foi completamente carregada em ' + tempoCarregamento + ' milissegundos.');
    var tempoCarregamentoSegundos = Math.round(tempoCarregamento / 1000);
    console.log('A página foi completamente carregada em ' + tempoCarregamentoSegundos + ' segundos.');
  });
}

medirTempoCarregamento();