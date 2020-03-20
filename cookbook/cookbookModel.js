const db = require('../data/connection.js');

module.exports = {
  getRecipes,
  getRecipeById,
  getIngredients,
  getIngredientsByRecipe,
  getIngredientId,
  getSteps,
  getStepsByRecipe,
  getShoppingList,
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

function getIngredientId(ingredientName) {
  return db('ingredients')
    .where('ingredientName', ingredientName)
    .first();
}

function getSteps() {
  return db('steps');
}

function getStepsByRecipe(id) {
  return db('steps').where('recipeId', id);
}

function getStepById(stepNumber, recipeId) {
  return db('steps')
    .where('stepNumber', stepNumber)
    .andWhere('recipeId', recipeId);
}

function getShoppingList(recipeId) {
  return db('recipe_ingredients')
    .join(
      'ingredients',
      'recipe_ingredients.ingredientId',
      '=',
      'ingredients.id'
    )
    .select('ingredients.ingredientName', 'recipe_ingredients.quantity')
    .where('recipe_ingredients.recipeId', recipeId);
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
  return db('steps')
    .insert(step)
    .then(() => {
      return getStepById(step.stepNumber, step.recipeId);
    });
}

function insertRecipeIngredient(recipeIngredient) {
  return db('recipe_ingredients').insert(recipeIngredient);
}
