import { getUsersNotFriends } from "@/app/dao";
import { verifyAuth0Token } from "@/app/jwt";

export const GET =  async function handler(request, res) {
  try {
    const decoded = await verifyAuth0Token(request);
    const user = decoded.sub;

    const users = await getUsersNotFriends(user.sub);
    console.log('users :>> ', users);

    return new Response(JSON.stringify(users));
  } catch (error) {
    return new Response(JSON.stringify(error));
  }
}

