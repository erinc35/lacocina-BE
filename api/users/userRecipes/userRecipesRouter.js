const router = require('express').Router();

const usersModel = require('./userRecipesModel');

// api/users/:id/recipes

router.get('/', async (req, res) => {
    let id = req.userId;
    try {
        const recipes = await usersModel.getRecipes(id);
        res.status(200).json(recipes);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;