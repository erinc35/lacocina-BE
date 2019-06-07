const router = require('express').Router();
// const usersModel = require('../../users/userRecipes/userRecipesModel');
const recipesModel = require('./recipeOwnersModel');

// api/recipes/:id/recipeOwners

router.get('/', async (req, res) => {
    let id = req.recipeId;
    try {
        const owners = await recipesModel.getRecipeOwners(id);
        // console.log(owners)
        res.status(200).json(owners);
    } catch (err) {
        res.status(500).json(err);
    }
});

function checkRecipe(req, res, next) {
    const name = req.body.name
    // console.log(req.body)
    recipesModel.getRecipeByName(name)
        .then(foundRecipe => {
            if (foundRecipe === undefined) {
                next();
            } else {
                res.status(200).json(foundRecipe);
                return
            }
        })
        .catch(err => {
            res.status(500).json(err);
        })
}


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
        const deletedRecipe = await recipesModel.deleteRecipeOwner(userId, recipeId);
        res.status(200).json(deletedRecipe);
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});

module.exports = router;