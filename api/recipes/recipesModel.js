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

    updateRecipe: function (id, changes) {
        return db('recipes')
            .where({ id })
            .update(changes)
            .then(count => (count > 0 ? this.getRecipeByID(id) : null));
    },

    deleteRecipe: function (id) {
        return db('recipes').where({ id }).del();
    },
};

