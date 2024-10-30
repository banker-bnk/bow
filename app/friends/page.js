// app/profile/page.js
import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { getFriends } from "../dao";

export default withPageAuthRequired(
  async function Friends() {
    const { user } = await getSession();
    const friends = await getFriends(user.sub);

    return (
      <div>
        {friends.map((friend) => (
          <div key={friend.userId}>
            <a href={"/friends/" + friend.userId}>Id: Id: {friend.userId}</a>
            <p>Name: {friend.userName}</p>
            <hr />
          </div>
        ))}
      </div>
    );
  },
  { returnTo: "/users" }
);
// You need to provide a `returnTo` since Server Components aren't aware of the page's URL
