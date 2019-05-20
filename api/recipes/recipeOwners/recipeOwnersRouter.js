const router = require('express').Router();

const recipesModel = require('./recipeOwnersModel');

// api/recipes/:id/recipeOwners

router.get('/', async (req, res) => {
    let id = req.recipeId;
    try {
        const owners = await recipesModel.getrecipeOwners(id);
        res.status(200).json(owners);
    } catch (err) {
        res.status(500).json(err);
    }
});


router.post('/', async (req, res) => {
    let recipeId = req.recipeId;
    let owner = { ...req.body, recipeId };
    try {
        const updatedRecipe = await recipesModel.addRecipeOwner(owner);
        res.status(201).json(updatedRecipe);
    } catch (err) {
        res.status(500).json(err);
    }
});

// api/recipes/:id/recipeOwners/:id

router.delete('/:id', async (req, res) => {
    let recipeId = req.recipeId;
    let userId = req.params.id;
    try {
        const updatedRecipe = await recipesModel.deleteRecipeOwner(userId, recipeId);
        res.status(200).json(updatedRecipe);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;