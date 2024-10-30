"use client";
import { createPayment } from "../mp";

export const PaymentForm = async () => {
  return (
    <form action={createPayment}>
      <input id="amount" type="number" name="amount" placeholder="Amount" required/>
      <input id="message" type="text" name="message" placeholder="Message" required/>

      <button className="submit" type="submit">
        Donate
      </button>
    </form>
  )
}