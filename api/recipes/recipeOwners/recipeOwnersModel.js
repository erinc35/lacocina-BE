const db = require('../../../data/dbConfig.js');

module.exports = {

    getRecipeOwners: function (recipeId) {

        return db('usersRecipes')
            .select(
                'usersRecipes.recipeId',
                'usersRecipes.recipeImage',
                'usersRecipes.recipeUrl',
                'usersRecipes.recipeCalories',
                'usersRecipes.userId',
                'users.displayName',
        )
            .where({ recipeId })
            .join('users', 'usersRecipes.userId', 'usersRecipes.recipeImage', 'usersRecipes.recipeUrl', 'usersRecipes.recipeCalories','users.id')

    },

    getRecipeByName: function (name) {
        return db('recipes').where({ name }).first()
    },

    addRecipeOwner: async function (owner) {
        await db('usersRecipes').insert(owner);
        return this.getRecipeOwners(owner.recipeId)
    },

    deleteRecipeOwner: async function (userId, recipeId) {
        await db('usersRecipes').where({ userId, recipeId }).del();
        return this.getRecipeOwners(recipeId)
        // return {"bok": "bok"}
    },

};