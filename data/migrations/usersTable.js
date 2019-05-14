
exports.up = function (knex, Promise) {
    // create the users tables
    return knex.schema.createTable('users', function (tbl) {
        // user id (primary key)
        tbl.increments(); // creates an id (if you don't pass anything here the default name of the column will be 'id'), makes it integer, makes it autoincrement

        //user avatar
        tbl
            .string('picture', 256)
            .defaultTo(null)

        //user display name
        tbl
            .string('nickname', 128)
            .notNullable()

        //user email
        tbl
            .string('email', 128)
            .notNullable()
            .unique()

        //createdAt
        tbl
            .timestamp('createdAt')
            .defaultTo(knex.fn.now())


    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('users');
};