import { withPageAuthRequired, getSession, getAccessToken } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(async function Profile() {
  const { user } = await getSession();
  const { accessToken } = await getAccessToken();
  console.log('accessToken :>> ', accessToken);

  return <div>Hello {JSON.stringify(user)}</div>;
}, { returnTo: '/' })
// You need to provide a `returnTo` since Server Components aren't aware of the page's URL