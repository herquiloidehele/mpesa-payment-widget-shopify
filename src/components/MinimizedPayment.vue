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
    <p class="warning-message">
      Nota: O pagamento irá incluir a taxa de transferência do Mpesa (3%):
      <span class="total-price"> {{ getValueWithTax(orderInfo?.price) }} </span>
    </p>
    <p class="error-message text-danger" v-if="errorMessage">
      {{ errorMessage }}
    </p>
    <div :class="errorMessage ? 'mt-2' : 'mt-1'">
      <button
        class="btn btn-payment"
        @click="makePayment()"
        v-if="!loading"
        :disabled="!validacao"
        :class="!validacao ? 'disabled' : ''"
      >
        PAGAR
      </button>
      <semipolar-spinner v-if="loading" :animation-duration="2000" :size="65" color="#08C988" />
    </div>
  </div>
</template>

<script lang="ts">
import { SemipolarSpinner } from 'epic-spinners'
import PaymentService from '@/services/PaymentService'
import { defineComponent } from 'vue'
import { getValueWithTax } from '../utils/Functions'

export default defineComponent({
  name: 'MinimizedPayment',
  components: {
    SemipolarSpinner
  },
  data() {
    return {
      loading: false,
      inputTouched: false,
      focusInput: false,
      phone: '',
      errorMessage: ''
    }
  },
  props: {
    orderInfo: {
      type: Object,
      default: () => {
        return null
      }
    }
  },
  methods: {
    getValueWithTax,
    makePayment() {
      this.loading = true
      this.errorMessage = ''

      PaymentService.requestPayment(
        this.phone,
        this.orderInfo.price,
        this.orderInfo.id,
        this.orderInfo.shop
      )
        .then((response) => {
          this.$emit('orderPaid', true)
          console.log(response)
          this.loading = false
        })
        .catch((error) => {
          this.errorMessage = error.message
          console.log(error)
          this.loading = false
        })
    },
    onInputKeyUp() {
      this.inputTouched = true
    },
    onFocusInput(event: FocusEvent) {
      if (event.type === 'blur') {
        console.log('Focus Out')
        this.focusInput = false
      } else if (event.type === 'focus') {
        console.log('Foco')
        this.focusInput = true
      }
    }
  },
  computed: {
    validacaoInput() {
      return !this.validacao && this.inputTouched
    },
    validacao() {
      return this.phone.match(/^(85|84)[0-9]{7}$/)
    }
  },
  created() {
    console.log('Created Component Payment')
  }
})
</script>

<style scoped lang="scss">
@import './../assets/global.scss';

#payment-section {
  padding: 2em 1em;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  background-color: rgba(220, 220, 220, 0.35);

  input.numero {
    padding: 0.6em;
    font-size: 1em;
    text-align: center;
    font-weight: bold;
    max-width: 350px;
    margin-bottom: 0.4em;
  }

  input {
    &:focus {
      outline: none;
      border-color: #c2c0c0;
      -webkit-box-shadow: none;
      box-shadow: none;
    }

    &::placeholder {
      font-weight: bold;
      color: #838383;
    }

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

  .warning-message {
    font-size: 0.6em;
    text-align: left;
    align-self: flex-start;
    font-weight: bold;
    color: #969696;
    margin: 0.1em;
  }

  .total-price {
    color: #08c988;
  }
}
</style>
