'use strict';

const Schema = use('Schema');

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
        table.increments();
        table.string('username', 80).notNullable().unique();
        table.string('email', 254).notNullable().unique();
        table.string('first_name', 254).notNullable();
        table.string('last_name', 254).notNullable();
        table.string('password', 60).notNullable();
        table.boolean('active').defaultTo(false);
        table.timestamps();
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema;
