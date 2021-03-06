const router = require('express').Router();
const recipesModel = require('./recipesModel');

const recipeOwnersRouter = require('./recipeOwners/recipeOwnersRouter');

// api/recipes

router.get('/', async (req, res) => {
    try {
        const recipes = await recipesModel.getAllRecipes();
        res.status(200).json(recipes);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', checkRecipe, async (req, res) => {
    let recipe = req.body;
    try {
        const newRecipe = await recipesModel.addRecipe(recipe);
        res.status(201).json(newRecipe);

    } catch (err) {
        res.status(500).json(err);
    }
});

function checkRecipe(req, res, next) {
    const {name} = req.body
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

// api/recipes/:id/<subroutes>

router.use('/:id/recipeOwners', function (req, res, next) {
    req.recipeId = req.params.id;
    next()
}, recipeOwnersRouter);

module.exports = router;