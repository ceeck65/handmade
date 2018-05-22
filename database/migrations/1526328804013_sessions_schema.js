'use strict'

const Schema = use('Schema')

class SessionsSchema extends Schema {
  up () {
    this.create('sessions', (table) => {
       table.text('token').notNullable().unique();
       table.text('ip_addres');
       table.text('user_agent');
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
