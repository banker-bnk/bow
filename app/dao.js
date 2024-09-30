//----  FRIEND_INVITATIONS

export async function saveFriendInvitation(sender_id, receiver_id, access_token) {
	const query = `
		mutation {
			insert_friend_invitations(objects: {sender_id: "${sender_id}", receiver_id: "${receiver_id}"}) { 
				returning {
					id
				}
			}
		}
    `;

	console.log('query :>> ', query);
	const response = await fetchHasura(query, access_token);
	return await response;
}

export async function approveFriendInvitation(sender_id, receiver_id, access_token) {
	const query = `
		mutation {
  			update_friend_invitations(where: {sender_id: {_eq: "${sender_id}"}, receiver_id: {_eq: "${receiver_id}"}}, _set: {status: "APPROVED"}) { 
				returning {
					id
				}
			}
		}
    `;

	console.log('query :>> ', query);
	const response = await fetchHasura(query, access_token);
	return await response;
}

//----  USERS

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

//----  GIFTS

export async function getGifts(access_token) {
	const query = `
		query {
  			gifts {
				id
    			title
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
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
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
