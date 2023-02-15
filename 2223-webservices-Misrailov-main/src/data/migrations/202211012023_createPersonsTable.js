module.exports = {
	up: async (knex) => {
		await knex.schema.createTable('persons', (table) => {
			table.increments('id');

			table.string('name', 255)
				.notNullable();

			table.unique('name', 'idx_place_name_unique');
		});
	},
	down: (knex) => {
		return knex.schema.dropTableIfExists('persons');
	},
};
//TABLE persons verwijderen!! is een test