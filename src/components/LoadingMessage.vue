<template>
  <div class="card-loading default-section">
    <hollow-dots-spinner :animation-duration="1000" :dot-size="15" :dots-num="3" color="black" />
    <h4 class="mt-2">Carregando</h4>
  </div>
</template>

<script lang="ts">
import { HollowDotsSpinner } from "epic-spinners";
import { defineComponent } from "vue";

export default defineComponent({
  name: "LoadingMessage",
  components: {
    HollowDotsSpinner,
  },
});
</script>

<style scoped lang="scss">
.card-loading {
  padding: 4em;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: rgba(220, 220, 220, 0.35);

  h4 {
    font-size: 1.2em;
    margin-top: 1em;
  }
}
</style>
