<template>
  <div class="messages" :class="showCard === 'CARD_PAID' ? 'success-bg' : ''" v-if="showCard === 'CARD_PAYMENT' || showCard === 'CARD_PAID' || showCard === 'CARD_NOTFOUND' || showCard === 'CARD_LOADING'">
    <div class="row h-100 justify-content-center d-flex" v-if="showCard === 'CARD_PAID'">
      <sucess-message></sucess-message>
    </div>

    <div class="row h-100 justify-content-center d-flex" v-if="showCard === 'CARD_NOTFOUND'">
      <error-message></error-message>
    </div>

    <div class="h-100 justify-content-center d-flex" v-if="showCard === 'CARD_LOADING'">
      <loading-message></loading-message>
    </div>

    <div class="h-100 justify-content-center d-flex" v-if="showCard === 'CARD_PAYMENT'">
      <minimized-payment :order-info="orderInfo" @orderPaid="onOrderPayd($event)"></minimized-payment>
    </div>
  </div>
</template>

<script lang="ts">
import SucessMessage from "@/components/SucessMessage.vue";
import ErrorMessage from "@/components/ErrorMessage.vue";
import LoadingMessage from "@/components/LoadingMessage.vue";
import MinimizedPayment from "@/components/MinimizedPayment.vue";
import PaymentService from "@/services/PaymentService";
import { defineComponent } from "vue";

export default defineComponent({
  name: "PaymentPage",
  data() {
    return {
      orderInfo: null as any,
      isLoading: false,
      orderId: NaN,
    };
  },
  components: {
    MinimizedPayment,
    LoadingMessage,
    ErrorMessage,
    SucessMessage,
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.orderId = this.get_order_id() as number;

      if (this.orderId) {
        this.isLoading = true;
        PaymentService.getOrderInfo(this.orderId)

          .then((orderResponse) => {
            this.isLoading = false;
            this.orderInfo = orderResponse;
            console.log({ result: this.orderInfo.id });
          })

          .catch((error) => {
            console.log(error);
            this.isLoading = false;
          });
      } else {
        this.isLoading = false;
        console.log("Order ID not found");
      }
    },
    get_order_id() {
      const url = new URL(window.location.href);
      return Number(url.searchParams.get("order_id")) || null;
    },
    onOrderPayd(paid: any) {
      console.log({ paid });
      this.orderInfo.financial_status = true;
      console.log(this.orderInfo);
    },
  },
  computed: {
    showCard() {
      if (this.isLoading) {
        return "CARD_LOADING";
      }
      if (this.orderInfo && this.orderInfo.financial_status === true) {
        return "CARD_PAID";
      }
      if (this.orderInfo) {
        return "CARD_PAYMENT";
      }
      if (!this.orderId) {
        return "CARD_NOTFOUND";
      }
      return "CARD_NOTFOUND";
    },
  },
});
</script>
