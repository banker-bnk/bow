import { getCalendar } from "@/app/dao";
import { verifyAuth0Token } from "@/app/jwt";

export const GET =  async function handler(request, res) {
  try {
    const decoded = await verifyAuth0Token(request);
    const user = decoded.sub;

    const calendar = await getCalendar(user);
    console.log('calendar :>> ', calendar);

    return new Response(JSON.stringify(calendar));
  } catch (error) {
    return new Response(JSON.stringify(error));
  }
}