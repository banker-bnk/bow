import { withPageAuthRequired, getAccessToken } from '@auth0/nextjs-auth0';
import { getFriendInvitations } from '../dao';

export default withPageAuthRequired(async function Friends() {
	const { accessToken } = await getAccessToken();
  const invitations = await getFriendInvitations(accessToken);
  
  return (
    <div>
      {invitations.map(invitation => (
        <div key={invitation.userId}>
          <p>Id: {invitation.id}</p>
          <p>receiver_id: {invitation.receiver_id}</p>
          <p>sender_id: {invitation.sender_id}</p>
          <a href={"/api/friends/invitations/approve?sender_id=" + invitation.sender_id}>Approve</a>
          <hr/>
        </div>
      ))}
    </div>
  );
}, { returnTo: '/invitations' })
// You need to provide a `returnTo` since Server Components aren't aware of the page's URL