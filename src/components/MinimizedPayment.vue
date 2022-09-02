<template>
  <div id="payment-section" class="default-section">
    <input
      :disabled="loading"
      v-on:keyup="onInputKeyUp"
      v-on:blur="onFocusInput"
      autocomplete="off"
      v-on:focus="onFocusInput"
      class="numero form-control"
      :class="validacaoInput ? 'input-error' : inputTouched ? 'input-success' : ''"
      placeholder="Teu Número de M-Pesa"
      alt="Numero Mpesa"
      type="tel"
      name="telefone"
      v-model="phone"
    />
    <p class="error-message text-danger" v-if="errorMessage">
      {{ errorMessage }}
    </p>
    <div class="btn" :class="errorMessage ? 'mt-2' : 'mt-1'">
      <button class="btn-payment" @click="makePayment()" v-if="!loading" :disabled="!validacao" :class="!validacao ? 'disabled' : ''">PAGAR</button>
      <semipolar-spinner v-if="loading" :animation-duration="2000" :size="65" color="#08C988" />
    </div>
  </div>
</template>

<script lang="ts">
import { SemipolarSpinner } from "epic-spinners";
import PaymentService from "@/services/PaymentService";
import { defineComponent } from "vue";

export default defineComponent({
  name: "MinimizedPayment",
  components: {
    SemipolarSpinner,
  },
  data() {
    return {
      loading: false,
      inputTouched: false,
      focusInput: false,
      phone: "",
      errorMessage: "",
    };
  },
  props: {
    orderInfo: {
      type: Object,
      default: () => {
        return null;
      },
    },
  },
  methods: {
    makePayment() {
      this.loading = true;
      this.errorMessage = "";

      PaymentService.requestPayment(this.phone, this.orderInfo.price, this.orderInfo.id)
        .then((response) => {
          this.$emit("orderPaid", true);
          console.log(response);
          this.loading = false;
        })
        .catch((error) => {
          this.errorMessage = error.message;
          console.log(error);
          this.loading = false;
        });
    },
    onInputKeyUp() {
      this.inputTouched = true;
    },
    onFocusInput(event: FocusEvent) {
      if (event.type === "blur") {
        console.log("Focus Out");
        this.focusInput = false;
      } else if (event.type === "focus") {
        console.log("Foco");
        this.focusInput = true;
      }
    },
  },
  computed: {
    validacaoInput() {
      return !this.validacao && this.inputTouched;
    },
    validacao() {
      return this.phone.match(/^(85|84)[0-9]{7}$/);
    },
  },
  created() {
    console.log("Created Component Payment");
  },
});
</script>

<style scoped lang="scss">
#payment-section {
  padding: 2em 3em;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  background-color: rgba(220, 220, 220, 0.35);

  input.numero {
    padding: 1.1em;
    font-size: 1.2em;
    text-align: center;
    font-weight: bold;
    max-width: 350px;
  }

  input {
    &.input-error {
      border: 2px solid red !important;
    }
    &.input-success {
      border: 2px solid #08c988 !important;
    }
  }

  .btn-payment {
    padding: 0.5em 1.7em;
    background-color: #08c988;
    color: white;
    border: none;
    font-size: 1.1em;
  }

  .disabled {
    cursor: not-allowed;
    color: white;
    background-color: #c7c7c7;
  }

  .error-message {
    font-size: 0.8em;
    text-align: left;
    align-self: center;
    font-weight: bold;
    margin: 0 !important;
  }
}

@media only screen and (max-width: 640px) {
  #payment-section {
    padding: 2em 1em;

    input.numero {
      padding: 1.5em 1.3em !important;
      font-size: 1em !important;
    }

    .btn-payment {
      font-size: 0.9em;
    }
  }
}
</style>
