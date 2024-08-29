
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
