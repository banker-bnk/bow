import { withPageAuthRequired, getSession, getAccessToken } from '@auth0/nextjs-auth0';
import { getFriends } from '../dao';

export default withPageAuthRequired(async function Profile() {
  const { user } = await getSession();
  const { accessToken } = await getAccessToken();
  console.log('accessToken :>> ', accessToken);

  const friends = await getFriends(user.sub);

  console.log('friends :>> ', friends);

  return <div>Hello {JSON.stringify(user)}</div>;
}, { returnTo: '/' })
// You need to provide a `returnTo` since Server Components aren't aware of the page's URL