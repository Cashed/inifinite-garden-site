exports.up = function(knex, Promise) {
  return knex.schema.createTable('pictures', function(table){
    table.increments();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.integer('author_id');
    table.string('title').defaultTo('untitled');
    table.text('description');
    table.string('link');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('pictures');
};
