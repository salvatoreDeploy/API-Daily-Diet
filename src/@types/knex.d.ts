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
    meals: {
      id: string
      userId?: string
      name: string
      description: string
      date: string
      time: string
      isInDiet: boolean
      created_at: string
      updated_at: string
    }
  }
}
