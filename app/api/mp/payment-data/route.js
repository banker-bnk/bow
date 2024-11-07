import { MercadoPagoConfig, Payment } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

const getPaymentInfo = (payment) => {
  const { id, unit_price, currency_id, metadata, date_created } = payment;
  return {
    id: "",
    gift_id: id,
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

    return new Response(JSON.stringify(paymentInfo, 2, null), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(`Error: ${error}`);
    throw error;
  }
};
