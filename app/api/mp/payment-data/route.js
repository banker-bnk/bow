import { MercadoPagoConfig, Payment } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

const getPaymentInfo = (payment) => {
  const { payer, additional_info, currency_id, metadata, date_created } =
    payment;
  const { id: gift_id, unit_price } = additional_info.items[0];
  return {
    id: payer.id,
    gift_id,
    user_id: metadata.user_id,
    amount: unit_price,
    currency: currency_id,
    created_at: date_created,
  };
};

export const POST = async (request) => {
  try {
    const body = await request.json().then((data) => data);
    const payment = await new Payment(client).get({ id: body.data.id });

    const paymentInfo = getPaymentInfo(payment);

    // TODO: create call to database

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });
  } catch (error) {
    console.log(`Error: ${error}`);
    return new Response(JSON.stringify({ success: false }), {
      status: 500,
    });
  }
};
