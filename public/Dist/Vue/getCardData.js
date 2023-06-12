new Vue({
  el: "#app",
  data() {
    return {
      cardNumber: "",
      cardName: "",
      cardMonth: "",
      cardYear: "",
      cardCvv: ""
    };
  },
  mounted() {
    this.getCardData();
  },
  methods: {
    async getCardData() {
      try {
        const response = await fetch("/add-cartao");
        const data = await response.json();

        this.cardNumber = data.numero;
        this.cardName = data.nome_titular;
        this.cardMonth = data.validade_mes;
        this.cardYear = data.validade_ano;
        this.cardCvv = data.cvv;
      } catch (error) {
        /* console.error(error); */
      }
    }
  }
});