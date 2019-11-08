exports.up = function (knex, Promise) {
    // create the users tables
    return knex.schema.createTable('recipes', function (tbl) {
        // id (primary key)
        tbl.increments(); // creates an id (if you don't pass anything here the default name of the column will be 'id'), makes it integer, makes it autoincrement

        //recipe name
        tbl
            .string('name', 128)
            .notNullable()
            .unique();        
        //recipe img url
        tbl
            .string('image', 128)
            .notNullable();
        //recipe source url
        tbl
            .string('url', 128)
            .notNullable();
        //recipe calories
        tbl
            .float('calories', 128)
            .notNullable();

        //createdAt
        tbl
            .timestamp('createdAt')
            .defaultTo(knex.fn.now());
        
        // tbl.specificType('healtLabels');
        

    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('recipes');
};