'use strict'

const Schema = use('Schema')

class StoreSchema extends Schema {
  up () {
    this.create('stores', (table) => {
        table.increments();
        table.string('title');
        table.text('body');
        table.string('address');
        table.text('details');
        table.string('photo');
        table.integer('user_id').unsigned();
        table.integer('category_id').unsigned();
        table.timestamps();
    })
  }

  down () {
    this.drop('stores')
  }
}

module.exports = StoreSchema
