import { approveFriendInvitation } from "@/app/dao";
import { withApiAuthRequired, getSession, getAccessToken } from '@auth0/nextjs-auth0';

export const GET = withApiAuthRequired(async function handle(request) {
    const { accessToken } = await getAccessToken();
    const session = await getSession();

    const { searchParams } = new URL(request.url);
    const sender_id = searchParams.get('sender_id');
    const receiver_id = session.user.sub;

    const respone = await approveFriendInvitation(sender_id, receiver_id, accessToken);
    return new Response(JSON.stringify(respone));
});