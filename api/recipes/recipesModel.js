const db = require('../../data/dbConfig.js');

module.exports = {

    getAllRecipes: function () {
        return db('recipes');
    },

    addRecipe: async function (recipe) {
        const [id] = await db('recipes').insert(recipe, 'id');
        return db('recipes').where({ id }).first();
    },

    getRecipeByID: function (id) {
        return db('recipes').where({ id }).first();
    },

    getRecipeByName: function (name) {
        return db('recipes').where({ name }).first()
    },

   
    deleteRecipe: function (id) {
        return db('recipes').where({ id }).del();
    },
};

