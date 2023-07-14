import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.table('users', (table) => {
    table.string('sessionId').defaultTo(null)
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('users', (table) => {
    table.dropColumn('sessionId')
  })
}
