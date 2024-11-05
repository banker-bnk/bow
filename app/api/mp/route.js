import { MercadoPagoConfig, Payment } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

export const POST = async (request) => {
  try {
    const body = await request.json().then((data) => data);
    const payment = await new Payment(client).get({ id: body.data.id });

    // console.log("payment", payment);
    // TODO: create call to database

    return new Response(JSON.stringify(payment), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    // console.log("error =>", error);
    return new Response("Failed", { status: 500 });
  }
};
