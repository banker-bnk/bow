import { APP_SCHEMA, BACK_URL } from "@/app/constants";
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
        success: `${APP_SCHEMA}://${BACK_URL.SUCCESS}`,
        failure: `${APP_SCHEMA}://${BACK_URL.FAILURE}`,
        pending: `${APP_SCHEMA}://${BACK_URL.PENDING}`,
      },
      redirect_urls: {
        failure: `${APP_SCHEMA}://${BACK_URL.FAILURE}`,
        pending: `${APP_SCHEMA}://${BACK_URL.PENDING}`,
        success: `${APP_SCHEMA}://${BACK_URL.SUCCESS}`,
      },
      auto_return: "approved",
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
    throw error;
  }
};
