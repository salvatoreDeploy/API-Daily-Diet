import { randomUUID } from 'crypto'
import { FastifyInstance } from 'fastify'

import { z } from 'zod'
import { knex } from '../../db'

interface Metrics {
  inDietPercentage: number
  bestSequency: number
  total: number
  totalInDiet: number
  totalOutDiet: number
}

const mealBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  date: z.string(),
  time: z.string(),
  isInDiet: z.boolean(),
})

const userQuerySchema = z.object({
  userId: z.string(),
})

const mealParamsSchema = z.object({
  id: z
    .string({
      required_error: 'id is required.',
      invalid_type_error: 'id must be a string.',
    })
    .uuid('id must be an valid uuid.'),
})

export async function mealsRoutes(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    const { name, description, date, time, isInDiet } = mealBodySchema.parse(
      request.body,
    )

    const { userId } = userQuerySchema.parse(request.query)

    await knex('meals').insert({
      id: randomUUID(),
      name,
      description,
      date,
      time,
      isInDiet,
      user_id: userId,
    })

    return reply.status(201).send({ message: 'Successfully created meal!' })
  })

  app.put('/:id', async (request, reply) => {
    const { name, description, date, time, isInDiet } = mealBodySchema.parse(
      request.body,
    )

    const { id } = mealParamsSchema.parse(request.params)
    const { userId } = userQuerySchema.parse(request.query)

    await knex('meals').where({ id, user_id: userId }).update({
      name,
      description,
      date,
      time,
      isInDiet,
      updated_at: new Date().toISOString(),
    })

    return reply.status(202).send({ message: 'Successfully edited meal!' })
  })

  app.get('/', async (request, reply) => {
    const { userId } = userQuerySchema.parse(request.query)

    const meals = await knex('meals')
      .where({ user_id: userId })
      .orderBy('date', 'desc')
      .select('*')

    return reply.status(200).send({ meals })
  })

  app.get('/:id', async (request, reply) => {
    const { id } = mealParamsSchema.parse(request.params)
    const { userId } = userQuerySchema.parse(request.query)

    const meals = await knex('meals').where({ id, user_id: userId }).first()

    return reply.status(200).send({ meals })
  })
}
