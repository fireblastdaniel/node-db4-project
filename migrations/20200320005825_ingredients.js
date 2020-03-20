exports.up = function(knex) {
  return knex.schema.createTable('ingredients', tbl => {
    tbl.increments();
    tbl
      .string('ingredientName', 255)
      .notNullable()
      .unique();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('ingredients');
};
