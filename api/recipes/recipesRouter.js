const router = require('express').Router();
const recipesModel = require('./recipesModel');


// api/recipes

router.get('/', async (req, res) => {
    try {
        const recipes = await recipesModel.getAllRecipes();
        res.status(200).json(recipes);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    let recipe = req.body;
    try {
        const newRecipe = await recipesModel.addRecipe(recipe);
        res.status(201).json(newRecipe);

    } catch (err) {
        res.status(500).json(err);
    }
});

// api/recipes/:id

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const recipe = await recipesModel.getRecipeByID(id);
        res.status(200).json(recipe);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await recipesModel.updateRecipe(id, { ...req.body });
        const updatedRecipe = await recipesModel.getRecipeByID(id);
        res.status(200).json(updatedRecipe);
    } catch (err) {
        res.status(500).json(err);
    }
});


router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const count = await recipesModel.deleteRecipe(id);
        res.status(200).json({ count: `${count} recipe deleted` });
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;