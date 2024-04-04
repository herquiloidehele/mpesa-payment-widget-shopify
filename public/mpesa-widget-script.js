  {%- if checkout.order.gateway contains 'M-pesa' -%}
    Shopify.Checkout.OrderStatus.addContentBox(
    '<h2>Efectuar Pagamento</h2>',
    "<iframe style='width: 100%; height: 100%;' src='https://mpesa-payment-widget-shopify.vercel.app/?order={{checkout.order_id}}&shop={{shop.permanent_domain}}'></iframe>"
    );
  {%- endif -%}
