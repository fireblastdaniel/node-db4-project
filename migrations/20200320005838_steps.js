exports.up = function(knex) {
  return knex.schema.createTable('steps', tbl => {
    tbl.primary(['stepNumber', 'recipeId']);
    tbl
      .integer('stepNumber')
      .unsigned()
      .notNullable();
    tbl
      .integer('recipeId')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('recipes')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    tbl.string('stepDetails').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('steps');
};
