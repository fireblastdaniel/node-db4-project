const express = require('express');
const Cookbook = require('./cookbookModel.js');
const router = express.Router();

//add a new recipe
router.post('/recipes', (req, res) => {});

//add a new ingredient
router.post('/ingredients', (req, res) => {});

//add a new step to a recipe
router.post('/steps/:recipeId', (req, res) => {});

//add a new ingredient to a recipe
router.post('/ingredients/:recipeId', (req, res) => {});

//get list of recipes
router.get('/recipes', (req, res) => {});

//get recipe by id
router.get('/recipes/:id', (req, res) => {});

//get list of ingredients
router.get('/ingredients', (req, res) => {});

//get list of shopping list for a recipe
router.get('/ingredients/:recipeId', (req, res) => {});

//get list of all steps for all recipes
router.get('/steps', (req, res) => {});

//get list of steps for a recipe
router.get('/steps/:recipeId', (req, res) => {});
