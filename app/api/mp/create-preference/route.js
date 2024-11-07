import { MercadoPagoConfig, Preference } from "mercadopago";

const mercadoPago = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

export const preferenceBuilder = (preferenceDraft) => {
  return {
    body: {
      items: [
        {
          id: preferenceDraft.giftId,
          unit_price: preferenceDraft.amount,
          quantity: 1,
          title: preferenceDraft.productName,
        },
      ],
      metadata: {
        message: preferenceDraft?.message,
        user_id: preferenceDraft.userId,
      },
      operation_type: "regular_payment",
      back_urls: {
        success: process.env.APP_HOST_URL,
        failure: process.env.APP_HOST_URL,
        pending: process.env.APP_HOST_URL,
      },
      notificationUrl: `${process.env.APP_HOST_URL}/api/mp/payment-data`,
    },
  };
};

export const POST = async (request) => {
  const preferenceDraft = await request.json();

  try {
    const preferenceData = preferenceBuilder(preferenceDraft);

    const preference = await new Preference(mercadoPago).create(preferenceData);

    return new Response(JSON.stringify(preference, null, 2), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(`Error: ${error}`);
    throw error;
  }
};
