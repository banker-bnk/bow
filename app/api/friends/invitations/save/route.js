import { saveFriendInvitation } from "@/app/dao";
import { withApiAuthRequired, getSession, getAccessToken } from '@auth0/nextjs-auth0';

export const GET = withApiAuthRequired(async function handle(request) {
    const { accessToken } = await getAccessToken();
    const session = await getSession();

    const { searchParams } = new URL(request.url);
    const receiver_id = searchParams.get('receiver_id');
    const sender_id = session.user.sub;

    const respone = await saveFriendInvitation(sender_id, receiver_id, accessToken);
    return new Response(JSON.stringify(respone));
});