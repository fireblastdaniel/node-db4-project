const express = require('express');
const Cookbook = require('./cookbookModel.js');
const router = express.Router();

//add a new recipe
router.post('/recipes', (req, res) => {
  const recipe = req.body;
  Cookbook.insertRecipe(recipe)
    .then(newRecipe => res.status(201).json(newRecipe))
    .catch(err =>
      res.status(500).json({ message: 'There was an error adding the recipe' })
    );
});

//add a new ingredient
router.post('/ingredients', (req, res) => {
  const ingredient = req.body;
  Cookbook.insertIngredient(ingredient)
    .then(newIngredient => res.status(201).json(newIngredient))
    .catch(err =>
      res
        .status(500)
        .json({ message: 'There was an error adding the ingredient' })
    );
});

//add a new step to a recipe
router.post('/steps/:recipeId', (req, res) => {
  const step = req.body;
  const { recipeId } = req.params;
  step.recipeId = recipeId;
  // console.log(Cookbook.getStepsByRecipe(recipeId).then());
  Cookbook.getStepsByRecipe(recipeId).then(steps => {
    step.stepNumber = steps.length + 1;
    Cookbook.insertStep(step)
      .then(newStep => res.status(201).json(newStep))
      .catch(err =>
        res.status(500).json({ message: 'There was an error adding the step' })
      );
  });
  // step.stepNumber = Cookbook.getStepsByRecipe(recipeId).length + 1 || 2;
  // console.log(step);
});

//add a new ingredient to a recipe
router.post('/ingredients/:recipeId', (req, res) => {
  const inputIngredient = req.body;
  const recipeIngredient = {};
  const { recipeId } = req.params;
  recipeIngredient.quantity = inputIngredient.quantity;
  recipeIngredient.recipeId = recipeId;

  Cookbook.getIngredientId(inputIngredient.ingredientName).then(ingredient => {
    if (ingredient) {
      recipeIngredient.ingredientId = ingredient.id;
      Cookbook.insertRecipeIngredient(recipeIngredient)
        .then(newRecipeIngredient => res.status(201).json(newRecipeIngredient))
        .catch(err =>
          res.status(500).json({
            message: 'There was an error adding the ingredient to the recipe'
          })
        );
    } else {
      Cookbook.insertIngredient({
        ingredientName: inputIngredient.ingredientName
      }).then(newIngredient => {
        recipeIngredient.ingredientId = newIngredient.id;
        Cookbook.insertRecipeIngredient(recipeIngredient)
          .then(newRecipeIngredient =>
            res.status(201).json(newRecipeIngredient)
          )
          .catch(err =>
            res.status(500).json({
              message: 'There was an error adding the ingredient to the recipe'
            })
          );
      });
    }
  });
});

//get list of recipes
router.get('/recipes', (req, res) => {
  Cookbook.getRecipes()
    .then(recipes => res.status(200).json(recipes))
    .catch(err =>
      res
        .status(500)
        .json({ message: 'There was an error getting the recipe list' })
    );
});

//get recipe by id
router.get('/recipes/:id', (req, res) => {
  const { id } = req.params;
  Cookbook.getRecipeById(id)
    .then(recipe => {
      res.status(200).json(recipe);
    })
    .catch(err =>
      res.status(500).json({ message: 'There was an error getting the recipe' })
    );
});

//get list of ingredients
router.get('/ingredients', (req, res) => {
  Cookbook.getIngredients()
    .then(ingredients => res.status(200).json(ingredients))
    .catch(err =>
      res
        .status(500)
        .json({ message: 'There was an error retrieving the ingredient list' })
    );
});

//get list of shopping list for a recipe
router.get('/ingredients/:recipeId', (req, res) => {
  const { recipeId } = req.params;
  Cookbook.getShoppingList(recipeId)
    .then(ingredients => res.status(200).json(ingredients))
    .catch(err =>
      res.status(500).json({
        message: 'There was an error retrieving the ingredients for this recipe'
      })
    );
});

//get list of all steps for all recipes
router.get('/steps', (req, res) => {
  Cookbook.getSteps()
    .then(steps => res.status(200).json(steps))
    .catch(err =>
      res
        .status(500)
        .json({ message: 'There was an error retrieving the steps list' })
    );
});

//get list of steps for a recipe
router.get('/steps/:recipeId', (req, res) => {
  const { recipeId } = req.params;
  Cookbook.getStepsByRecipe(recipeId)
    .then(steps => res.status(200).json(steps))
    .catch(err =>
      res.status(500).json({
        message: 'There was an error retrieving the steps for this recipe'
      })
    );
});

module.exports = router;
