"use server";

import { MercadoPagoConfig, Preference } from "mercadopago";

export const preferenceBuilder = (formData) => {
  return {
    body: {
      items: [
        {
          id: "payment",
          unit_price: Number(formData.amount),
          quantity: 1,
        },
      ],
      metadata: {
        message: formData.message,
      },
      operation_type: "regular_payment",
      back_urls: {
        success: process.env.APP_HOST_URL,
        failure: process.env.APP_HOST_URL,
        pending: process.env.APP_HOST_URL,
      },
      auto_return: "approved",
    },
  };
};

export const createPayment = async (formData) => {
  const mercadoPago = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN,
  });

  const preferenceData = preferenceBuilder(formData);
  const preference = await new Preference(mercadoPago).create(preferenceData);

  console.log("preference", preference);
};
