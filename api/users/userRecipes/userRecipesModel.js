const db = require('../../../data/dbConfig.js');

module.exports = {

    getRecipes: function (userId) {

        return db('usersRecipes')
            .select(
                'usersRecipes.recipeId',
                'recipes.name as RecipeName',
        )
            .where({ userId })
            .join('recipes', 'usersRecipes.recipeId', 'recipes.id')
    }

};