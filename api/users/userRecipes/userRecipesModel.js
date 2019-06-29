const db = require('../../../data/dbConfig.js');

module.exports = {

    getRecipes: function (userId) {

        return db('usersRecipes')
            .select(
                'usersRecipes.recipeId',
                'recipes.name as recipeName',
                'recipes.image as recipeImage',
                'recipes.url as recipeUrl',
                'recipes.calories as recipeCalories',
                
                
        )
            .where({ userId })
            .join('recipes', 'usersRecipes.recipeId', 'recipes.id')
    },

    getRecipeByName: function (name) {
        return db('recipes').where({ name }).first()
    },

    
};