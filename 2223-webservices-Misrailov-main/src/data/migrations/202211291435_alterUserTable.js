const {
    tables,
  } = require('../index');
  
  module.exports = {
    up: async (knex) => {
      await knex.schema.alterTable(tables.persons, (table) => {
        table.string('auth0id', 255)
          .notNullable();
      });
    },
    down: (knex) => {
        return  knex.schema.alterTable(tables.persons, (table) => {
            table.dropColumng('auth0id');
          });
    },
  };

