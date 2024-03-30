<template>
  <div class="col-10 col-lg-8 card-success-message default-section">
    <div class="content w-100">
      <svg
        width="2.5em"
        height="2.5em"
        viewBox="0 0 16 16"
        class="bi bi-check2-circle"
        fill="white"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M15.354 2.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L8 9.293l6.646-6.647a.5.5 0 0 1 .708 0z"
        />
        <path
          fill-rule="evenodd"
          d="M8 2.5A5.5 5.5 0 1 0 13.5 8a.5.5 0 0 1 1 0 6.5 6.5 0 1 1-3.25-5.63.5.5 0 1 1-.5.865A5.472 5.472 0 0 0 8 2.5z"
        />
      </svg>

      <h4>Encomenda Paga</h4>
      <p v-if="false">A tua encomenda está sendo processada, receberás em breve.</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SucessMessage'
})
</script>

<style scoped lang="scss">
@import './../assets/global.scss';

.card-success-message {
  padding: 0;
  border-radius: 5px;
  background-color: #08c988;

  .content {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;

    h4 {
      margin-top: 0.7em;
      color: white;
      text-align: center;
    }
    p {
      text-align: center;
      color: rgba(255, 255, 255, 0.8);
      font-size: 1.2em;
      max-width: 90%;
    }
  }
}
</style>
