"use server";

import { redirect } from "next/navigation";
import { MercadoPagoConfig, Preference } from "mercadopago";

export const preferenceBuilder = (formData, giftId, productName) => {
  return {
    body: {
      items: [
        {
          id: giftId,
          unit_price: Number(formData.get("amount")),
          quantity: 1,
          title: productName,
        },
      ],
      metadata: {
        message: String(formData.get("message")),
      },
      operation_type: "regular_payment",
      notificationUrl: `${process.env.APP_HOST_URL}/api/mp`,
    },
  };
};

export const createPayment = async (formData, giftId, productName) => {
  const mercadoPago = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN,
  });

  const preferenceData = await preferenceBuilder(formData, giftId, productName);

  const preference = await new Preference(mercadoPago).create(preferenceData);
  console.log("preference", preference);

  redirect(preference.init_point);
};
