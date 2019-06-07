const router = require('express').Router();

const usersModel = require('./userRecipesModel');

// api/users/:id/recipes

router.get('/', async (req, res) => {
    // console.log(req)
    let id = req.userId;
    try {
        const recipes = await usersModel.getRecipes(id);
        // console.log(recipes)
        res.status(200).json(recipes);
    } catch (err) {
        res.status(500).json(err);
    }
});

function checkRecipe(req, res, next) {
    const name = req.body.name
    usersModel.getRecipeByName(name)
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

module.exports = router;