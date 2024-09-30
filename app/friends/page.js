// app/profile/page.js
import { withPageAuthRequired, getAccessToken } from '@auth0/nextjs-auth0';
import { getUsers } from '../dao';

export default withPageAuthRequired(async function Friends() {
	const { accessToken } = await getAccessToken();
	const users = await getUsers(accessToken);

  return (
    <div>
      {users.map(user => (
        <div key={user.userId}>
          <p>Id: {user.userId}</p>
          <p>Name: {user.userName}</p>
          <a href={"/api/friends/invitations/save?receiver_id=" + user.userId}>Invite</a>
          <br/>
          <a href={"/api/friends/invitations/approve?receiver_id=" + user.userId}>Approve</a>
          <hr/>
        </div>
      ))}
    </div>
  );
}, { returnTo: '/users' })
// You need to provide a `returnTo` since Server Components aren't aware of the page's URL