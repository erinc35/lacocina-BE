const db = require('../../../data/dbConfig.js');

module.exports = {

    getRecipes: function (recipeId) {

        return db('usersRecipes')
            .select(
                'usersRecipes.recipeId',
                'usersRecipes.userId',
                'users.displayName',
        )
            .where({ recipeId })
            .join('users', 'usersRecipes.userId', 'users.id')

    },

    addRecipeOwner: async function (owner) {
        await db('usersRecipes').insert(owner);
        return this.getRecipeOwners(owner.recipeId)
    },

    deleteRecipeOwner: async function (userId, recipeId) {
        await db('usersRecipes').where({ userId, recipeId }).del();
        return this.getRecipes(recipeId)
    },

};