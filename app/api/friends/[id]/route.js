import { getUserById } from "@/app/dao";
import { getToken } from "@/app/jwt";

export const GET =  async function handler(request, { params }) {
  try {
    const accessToken = getToken(request);
    const { id } = params
    const friend = await getUserById(decodeURIComponent(id), accessToken);

    return new Response(JSON.stringify(friend));
  } catch (error) {
    return new Response(JSON.stringify(error));
  }
}

