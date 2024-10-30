import { sql } from "@vercel/postgres";

//----  FRIEND_INVITATIONS

export async function getFriendInvitations(access_token) {
  const query = `
		query {
			friend_invitations {
				id
			    receiver_id
    			sender_id
			}
		}
    `;

  const response = await fetchHasura(query, access_token);

  console.log("response :>> ", response);
  return await response.data.friend_invitations;
}

export async function saveFriendInvitation(
  sender_id,
  receiver_id,
  access_token
) {
  const query = `
		mutation {
			insert_friend_invitations(objects: {sender_id: "${sender_id}", receiver_id: "${receiver_id}"}) { 
				returning {
					id
				}
			}
		}
    `;

  console.log("query :>> ", query);
  const response = await fetchHasura(query, access_token);
  return await response;
}

export async function approveFriendInvitation(
  sender_id,
  receiver_id,
  access_token
) {
  const query = `
		mutation {
  			update_friend_invitations(where: {sender_id: {_eq: "${sender_id}"}, receiver_id: {_eq: "${receiver_id}"}}, _set: {status: "APPROVED"}) { 
				returning {
					id
				}
			}
		}
    `;

  console.log("query :>> ", query);
  const response = await fetchHasura(query, access_token);
  return await response;
}

//----  FRIENDS
export async function getUsersNotFriends(user) {
  const { rows } = await sql`
		select * 
		from users u
		where not exists 
		(select *
		from friends f
		where (u."userId" = f.user_id or u."userId" = f.friend_id)
		and (f.user_id = ${user} or f.friend_id = ${user}))
		and u."userId" != ${user}
	`;

  return rows;
}

export async function getFriends(user) {
  const { rows } = await sql`
		select * 
		from users u
		where exists 
		(select *
		from friends f
		where (u."userId" = f.user_id or u."userId" = f.friend_id)
		and (f.user_id = ${user} or f.friend_id = ${user})
		and u."userId" != ${user})
	`;

  return rows;
}


//----  USERS

export async function getCalendar(user) {
  const { rows } = await sql`
	SELECT 
		TO_CHAR(u.birthday, 'Month') AS birthday_month_name,
		u.*
	FROM 
		public.users u
	JOIN 
		public.friends f 
		ON u."userId" = f."friend_id" OR u."userId" = f."user_id"
	WHERE 
		(f."user_id" = ${user} OR f."friend_id" = ${user})
		AND u."userId" != ${user}
		AND u.birthday IS NOT NULL
	GROUP BY 
		u.birthday, u."userId"
	ORDER BY 
		EXTRACT(MONTH FROM u.birthday);
	`;

  const groupedData = rows.reduce((acc, user) => {
    const monthName = user.birthday_month_name.trim();
    user.birthday_month_name = monthName;
    if (!acc[monthName]) {
      acc[monthName] = [];
    }
    acc[monthName].push(user);
    return acc;
  }, {});

  return groupedData;
}

export async function getUsers(access_token) {
  const query = `
		query {
  			users {
				userId
    			userName
  			}
		}
	`;

  const response = await fetchHasura(query, access_token);
  return await response.data.users;
}

export async function getUserById(userId, access_token) {
	
	const query = `
		query {
			users_by_pk(userId: "${userId}") {
				userName
				birthday
				gifts(order_by: { created_at: desc }, limit: 1) {
					id
					title
					price
					image
				}
			}
		}
	`;

	const response = await fetchHasura(query, access_token);
	return await response.data.users_by_pk;
}

//----  GIFTS

export async function getGifts(access_token) {
  const query = `
		query {
  			gifts {
				id
    			title
				price
  			}
		}
	`;

  const response = await fetchHasura(query, access_token);
  return await response.data.gifts;
}

export async function removeGift(id, access_token) {
  const query = `
		mutation {
			delete_gifts_by_pk(id: ${id})
		}
	`;

  const response = await fetchHasura(query, access_token);
  return await response.data;
}

export async function saveGift(title, access_token) {
  const query = `
		mutation {
			insert_gifts(objects: {title: "${title}"}) {
				returning {
					id
				}
			}
		}
    `;

  const response = await fetchHasura(query, access_token);
  return await response;
}

//---- HASURA

async function fetchHasura(query, access_token) {
  try {
    const response = await fetch(process.env.HASURA_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify({
        query,
      }),
    });

    const data = await response.json();

    if (data.errors) {
      console.log(data.errors);
    }
    return data;
  } catch (error) {
    console.log(error);
  }
}
