exports.up = function(knex) {
  return knex.schema.createTable('recipe_ingredients', tbl => {
    tbl.primary(['recipeId', 'ingredientId']);
    tbl
      .integer('recipeId')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('recipes')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    tbl
      .integer('ingredientId')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('ingredients')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    tbl.string('quantity').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('recipe_ingredients');
};
