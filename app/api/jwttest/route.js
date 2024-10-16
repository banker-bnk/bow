import { verifyAuth0Token } from "@/app/jwt";

export const GET =  async function handler(request, res) {
  try {
    const decoded = await verifyAuth0Token(request);
    const user = decoded.sub;
    return new Response(JSON.stringify(user));
  } catch (error) {
    return new Response(JSON.stringify(error));
  }
}