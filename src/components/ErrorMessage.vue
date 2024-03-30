<template>
  <div class="card-error-message default-section">
    <div class="content">
      <svg
        width="2.5em"
        height="2.5em"
        viewBox="0 0 16 16"
        class="bi bi-exclamation-circle"
        fill="black"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
        />
        <path
          d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"
        />
      </svg>
      <h3>Pagamento Indisponível</h3>
      <p class="text-center">Tente mais tarde</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ErrorMessage'
})
</script>

<style scoped lang="scss">
@import './../assets/global.scss';

.card-error-message {
  background-color: rgba(220, 220, 220, 0.35);

  .content {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;

    h3 {
      margin-top: 0.7em;
      color: black;
      font-size: 12pt;
      text-align: center;
    }
  }
}
</style>
