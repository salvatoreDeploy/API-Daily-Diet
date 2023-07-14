// eslint-disable-next-line
import { Knex } from 'knex'

// Criando a estrutura de tipagem das tabelas para o query builder

declare module 'knex/types/tables' {
  export interface Tables {
    users: {
      id: string
      name: string
      email: string
      password: string
      created_at: string
      sessionId?: string
    }
  }
}
