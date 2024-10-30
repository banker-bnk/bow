// app/profile/page.js
import { withPageAuthRequired, getAccessToken } from '@auth0/nextjs-auth0';
import { getUserById } from '../../dao';

export default withPageAuthRequired(async function Lines({ params }) {
	const { accessToken } = await getAccessToken();
  const { id } = params; 

	const friend = await getUserById(decodeURIComponent(id), accessToken);

  return (
    <div>
      <p>Friend {friend.userName}</p>
      <p>Birthday {friend.birthday}</p>
      <hr/>
      <p>GIFT</p>
      <p>{friend.gifts[0]?.title}</p>
      <p>${friend.gifts[0]?.price}</p>
      <img src={friend.gifts[0]?.image}/>

    </div>
  );
}, { returnTo: '/friends' })
// You need to provide a `returnTo` since Server Components aren't aware of the page's URL