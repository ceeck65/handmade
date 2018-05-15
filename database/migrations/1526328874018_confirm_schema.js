'use strict';

const Schema = use('Schema');

class ConfirmSchema extends Schema {
  up () {
    this.create('confirms', (table) => {
        table.increments();
        table.timestamps();
        table.integer('user_id').unsigned().references('id').inTable('users');
        table.string('token').notNullable();
        table.integer('valid');
        table.integer('type');
    })
  }

  down () {
    this.drop('confirms')
  }
}

module.exports = ConfirmSchema;
