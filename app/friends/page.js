// app/profile/page.js
import { withPageAuthRequired, getAccessToken, getSession } from '@auth0/nextjs-auth0';
import { getFriends } from '../dao';

export default withPageAuthRequired(async function Friends() {
	const { accessToken } = await getAccessToken();
  const { user } = await getSession();
  const users = await getFriends(user.sub);
  
  return (
    <div>
      {users.map(user => (
        <div key={user.userId}>
          <p>Id: {user.userId}</p>
          <p>Name: {user.userName}</p>
          <hr/>
        </div>
      ))}
    </div>
  );
}, { returnTo: '/users' })
// You need to provide a `returnTo` since Server Components aren't aware of the page's URL