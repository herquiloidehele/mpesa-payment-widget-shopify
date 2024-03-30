<template>
  <div
    class="messages"
    :class="showCard === 'CARD_PAID' ? 'success-bg' : ''"
    v-if="
      showCard === 'CARD_PAYMENT' ||
      showCard === 'CARD_PAID' ||
      showCard === 'CARD_NOTFOUND' ||
      showCard === 'CARD_LOADING'
    "
  >
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
      <minimized-payment
        :order-info="orderInfo"
        @orderPaid="onOrderPaid($event)"
      ></minimized-payment>
    </div>
  </div>
</template>

<script lang="ts">
import SucessMessage from '@/components/SucessMessage.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
import LoadingMessage from '@/components/LoadingMessage.vue'
import MinimizedPayment from '@/components/MinimizedPayment.vue'
import PaymentService from '@/services/PaymentService'
import { defineComponent } from 'vue'
import type { IOrderInfo } from '@/models'

export default defineComponent({
  name: 'PaymentPage',
  data() {
    return {
      orderInfo: {} as IOrderInfo,
      isLoading: false,
      orderId: NaN,
      shopHost: ''
    }
  },
  components: {
    MinimizedPayment,
    LoadingMessage,
    ErrorMessage,
    SucessMessage
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.orderId = this.get_order_id() as number
      this.shopHost = this.get_shop_host() as string

      if (this.orderId) {
        this.isLoading = true
        PaymentService.getOrderInfo(this.orderId, this.shopHost)

          .then((orderResponse) => {
            this.isLoading = false
            this.orderInfo = orderResponse
            console.log({ result: this.orderInfo.id })
          })

          .catch((error) => {
            console.log(error)
            this.isLoading = false
          })
      } else {
        this.isLoading = false
        console.log('Order ID not found')
      }
    },
    get_order_id() {
      const url = new URL(window.location.href)
      return Number(url.searchParams.get('order')) || null
    },
    get_shop_host() {
      const url = new URL(window.location.href)
      return url.searchParams.get('shop') || null
    },
    onOrderPaid(paid: any) {
      console.log({ paid })
      this.orderInfo.isPaid = true
      console.log(this.orderInfo)
    }
  },
  computed: {
    showCard() {
      if (this.isLoading) {
        return 'CARD_LOADING'
      }
      if (this.orderInfo && this.orderInfo.isPaid) {
        return 'CARD_PAID'
      }
      if (this.orderInfo) {
        return 'CARD_PAYMENT'
      }
      if (!this.orderId) {
        return 'CARD_NOTFOUND'
      }
      return 'CARD_NOTFOUND'
    }
  }
})
</script>
