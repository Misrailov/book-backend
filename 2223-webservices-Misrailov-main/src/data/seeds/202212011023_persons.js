module.exports = {
	seed: async (knex) => {
		// first delete all entries
		await knex('persons').delete();

		// then add the fresh places
		await knex('persons').insert([
		{ id: 1, name: 'Loon',auth0id:'auth0|613b1b1b1b1b1b1231b1b1b1b' },
		{ id: 2, name: 'Dranken Geers',auth0id:'auth0|613b1b3b1b1b1b1b1b1b1b1b'},
		{ id: 3, name: 'Irish Pub',auth0id:'auth0|613b1b1b21b1b1b1b1b1b1b1b'},
	]);
	},
};