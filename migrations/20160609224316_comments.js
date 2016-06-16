exports.up = function(knex, Promise) {
  return knex.schema.createTable('comments', function(table){
    table.increments('id').primary();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.integer('author_id');
    table.integer('post_id').unsigned().index().references('id').inTable('posts').onDelete('CASCADE');
    table.text('description');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('comments');
};
