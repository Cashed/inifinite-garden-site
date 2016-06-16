exports.up = function(knex, Promise) {
  return knex.schema.createTable('posts', function(table){
    table.increments('id').primary();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.integer('author_id');
    table.string('title');
    table.text('description');
    table.integer('picture_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('posts');
};
