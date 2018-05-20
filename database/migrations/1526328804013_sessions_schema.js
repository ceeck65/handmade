'use strict'

const Schema = use('Schema')

class SessionsSchema extends Schema {
  up () {
    this.create('sessions', (table) => {
       table.string('token', 40).notNullable().unique();
       table.string('ip_addres');
       table.string('user_agent');
       table.text('playload');
       table.text('active');
       table.integer('user_id').unsigned().references('id').inTable('users');
       table.integer('store').unsigned();
    })
  }

  down () {
    this.drop('sessions')
  }
}

module.exports = SessionsSchema
