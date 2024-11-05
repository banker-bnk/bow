"use client";
import { createPayment } from "../mp";

export const PaymentForm = ({giftId, productName}) => {

  const handleSubmit = async (event) => {
    event.preventDefault()

    const formData = new FormData(event.target);

    await createPayment(formData, giftId, productName)
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>{giftId}</p>
      <input id="amount" type="number" name="amount" placeholder="Amount" required/>
      <input id="message" type="text" name="message" placeholder="Message"/>

      <button className="submit" type="submit">
        Donate
      </button>
    </form>
  )
}