// app/profile/page.js
import { withPageAuthRequired, getAccessToken } from '@auth0/nextjs-auth0';
import { getGifts } from '../dao';

export default withPageAuthRequired(async function Lines() {
	const { accessToken } = await getAccessToken();
	const gifts = await getGifts(accessToken);

  return (
    <div>
      {gifts.map(gift => (
        <div key={gift.id}>
          <h3>{gift.id}</h3>
          <p>Name: {gift.title}</p>
          <p>Price: {gift.price}</p>
        </div>
      ))}
    </div>
  );
}, { returnTo: '/gifts' })
// You need to provide a `returnTo` since Server Components aren't aware of the page's URL