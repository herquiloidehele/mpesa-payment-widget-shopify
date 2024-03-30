import HttpClient from '@/services/HttpClient'
import { Constants } from '@/utils/Constants'
import type { IOrderInfo } from '@/models'

export interface IPaymentResponse {
  status: boolean
  message: string
}

export default abstract class PaymentService {
  public static requestPayment(
    phone: string,
    price: number,
    orderId: number,
    shop: string
  ): Promise<IPaymentResponse> {
    return new Promise(async (resolve, reject) => {
      if (phone && price && orderId) {
        try {
          const response = await HttpClient.post(Constants.APIRoutes.requestPayment, {
            phone: '258' + phone,
            price: price,
            orderId,

            shop
          })

          if (response.status === 200) {
            console.log({ response })
            resolve({
              status: true,
              message: 'Pagamento Efectuado com Sucesso'
            })
            return
          }

          reject({
            status: false,
            message: 'Ocorreu um erro Inesperado, Tente Novamente'
          })
        } catch (error: any) {
          if (error.response) {
            reject(new Error(this.extractErrorMessage(error.response.data)))
          } else {
            reject(new Error('Ocorreu um erro inesperado, Tente Novamente!'))
          }
        }
      } else {
        console.log({ phone: '258' + phone, price: price })
        reject(new Error('Dados Inválidos, Tente novamente'))
      }
    })
  }

  public static getOrderInfo(orderId: number, shop: string): Promise<IOrderInfo> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await HttpClient.get(
          `${Constants.APIRoutes.getOrderInfo}${orderId}/shop/${shop}`
        )

        if (response.status === 200 && response.data) {
          resolve(this.convertOrderInfo(response.data))
          return
        }

        throw new Error('Order Not Found')
      } catch (error) {
        reject(error)
      }
    })
  }

  private static extractErrorMessage(response: any) {
    switch (response.output_ResponseCode) {
      case 'INS-5':
        return 'Transação Cancelada pelo Cliente'
      case 'INS-9':
        return 'A transação levou muito tempo, Tente Novamente'
      case 'INS-10':
        return 'A transação já está em andameto, Aguarde um momento'
      case 'INS-2001':
        return 'PIN Errado, Tente Novamente'
      case 'INS-2006':
        return 'Não possui saldo suficiente para efectual a compra'
      case 'INS-996':
        return 'Conta Mpesa do cliente não está activa'
      case 'INS-6':
        return 'A transação falhou, tente novamente'
      default:
        return 'Ocorreu um erro Inesperado, Tente Novamente'
    }
  }

  private static convertOrderInfo(data: any): IOrderInfo {
    return {
      id: data.legacyResourceId,
      price: data.totalPrice,
      phone: data.phone,
      isPaid: data.fullyPaid,
      shop: data.shop
    }
  }
}
