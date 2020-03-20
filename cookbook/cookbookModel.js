const db = require('../data/connection.js');

module.exports = {
  getRecipes,
  getRecipeById,
  getIngredients,
  getIngredientsByRecipe,
  getSteps,
  getStepsByRecipe,
  insertRecipe,
  insertIngredient,
  insertStep,
  insertRecipeIngredient
};

function getRecipes() {
  return db('recipes');
}

function getRecipeById(id) {
  return db('recipes')
    .where({ id })
    .first();
}

function getIngredients() {
  return db('ingredients');
}

function getIngredientById(id) {
  return db('ingredients')
    .where({ id })
    .first();
}

function getIngredientsByRecipe(id) {
  return db('recipe_ingredients').where('recipeId', id);
}

function getSteps() {
  return db('steps');
}

function getStepsByRecipe(id) {
  return db('steps').where('recipeId', id);
}

function insertRecipe(recipe) {
  return db('recipes')
    .insert(recipe)
    .then(ids => {
      return getRecipeById(ids[0]);
    });
}

function insertIngredient(ingredient) {
  return db('ingredients')
    .insert(ingredient)
    .then(ids => {
      return getIngredientById(ids[0]);
    });
}

function insertStep(step) {
  return db('steps').insert(step);
}

function insertRecipeIngredient(recipeIngredient) {
  return db('recipe_ingredients').insert(recipeIngredient);
}
